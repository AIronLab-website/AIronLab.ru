/**
 * Supabase Middleware для обновления сессии пользователя
 * Используется в middleware.ts для проверки аутентификации
 * 
 * @example
 * ```tsx
 * // middleware.ts
 * import { updateSession } from '@/lib/supabase/middleware'
 * 
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request)
 * }
 * ```
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

export async function updateSession(request: NextRequest) {
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

  // Проверяем и обновляем сессию пользователя
  await supabase.auth.getUser()

  return response
}

/**
 * Защищает роуты от неавторизованных пользователей
 * 
 * @example
 * ```tsx
 * // middleware.ts
 * import { protectRoute } from '@/lib/supabase/middleware'
 * 
 * export async function middleware(request: NextRequest) {
 *   // Защитить /admin роуты
 *   if (request.nextUrl.pathname.startsWith('/admin')) {
 *     return await protectRoute(request, '/login')
 *   }
 * }
 * ```
 */
export async function protectRoute(
  request: NextRequest,
  redirectTo: string = '/login'
) {
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
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Если пользователь не авторизован, редиректим на страницу логина
  if (!user) {
    const redirectUrl = new URL(redirectTo, request.url)
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Обновляем cookies в ответе
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  return response
}

