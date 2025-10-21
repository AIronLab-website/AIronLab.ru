/**
 * Next.js Middleware для защиты роутов админ-панели
 * 
 * Этот middleware:
 * 1. Проверяет аутентификацию для всех /admin роутов
 * 2. Редиректит неавторизованных на /admin/login
 * 3. Редиректит авторизованных с /admin/login на /admin
 * 4. Обновляет сессию пользователя
 */

import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

export async function middleware(request: NextRequest) {
  // Обновляем сессию пользователя
  const response = await updateSession(request)

  // Проверяем защищенные роуты только для /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Создаем Supabase клиент для проверки auth
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set() {},
          remove() {},
        },
      }
    )

    // Получаем текущую сессию
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Если нет сессии и это не страница логина → редирект на /admin/login
    if (!session && !request.nextUrl.pathname.startsWith('/admin/login')) {
      const redirectUrl = new URL('/admin/login', request.url)
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Если есть сессия и пользователь на /admin/login → редирект в админку
    if (session && request.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Применять middleware к следующим путям:
     * - /admin (все админ роуты)
     * 
     * Исключения:
     * - /api (API routes)
     * - /_next/static (статические файлы)
     * - /_next/image (оптимизация изображений)
     * - /favicon.ico, /sitemap.xml, /robots.txt (мета-файлы)
     */
    '/admin/:path*',
  ],
}

