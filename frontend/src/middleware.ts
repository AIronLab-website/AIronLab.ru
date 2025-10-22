/**
 * Next.js Middleware для защиты роутов админ-панели
 * 
 * Этот middleware:
 * 1. Проверяет аутентификацию для всех /admin роутов
 * 2. Редиректит неавторизованных на /admin/login
 * 3. Редиректит авторизованных с /admin/login на /admin
 * 4. Обновляет сессию пользователя
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Обновляем сессию
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Если пользователь НЕ авторизован и пытается попасть НЕ на login → редирект на login
  if (!user && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const redirectUrl = new URL('/admin/login', request.url)
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Если пользователь авторизован и на странице login → редирект в админку
  if (user && request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin', request.url))
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

