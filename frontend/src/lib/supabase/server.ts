/**
 * Supabase Server Client для использования в Server Components и Server Actions
 * 
 * @example
 * ```tsx
 * import { createClient } from '@/lib/supabase/server'
 * 
 * export default async function Page() {
 *   const supabase = createClient()
 *   
 *   const { data: posts } = await supabase
 *     .from('blog_posts')
 *     .select('*')
 *     .eq('status', 'published')
 *   
 *   return <div>{...}</div>
 * }
 * ```
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Cookie setting может не работать в некоторых Server Components
            // Это нормально для read-only Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Cookie removal может не работать в некоторых Server Components
          }
        },
      },
    }
  )
}

/**
 * Создает Supabase client с Service Role (полный доступ, без RLS)
 * ⚠️ ИСПОЛЬЗУЙТЕ ТОЛЬКО В SERVER-SIDE КОДЕ!
 * ⚠️ НЕ ЭКСПОРТИРУЙТЕ В CLIENT COMPONENTS!
 * 
 * @example
 * ```tsx
 * import { createAdminClient } from '@/lib/supabase/server'
 * 
 * export async function POST(request: Request) {
 *   const supabase = createAdminClient()
 *   
 *   // Полный доступ ко всем данным (минуя RLS)
 *   const { data } = await supabase.from('blog_posts').select('*')
 *   
 *   return Response.json({ data })
 * }
 * ```
 */
export function createAdminClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Cookie setting может не работать
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Cookie removal может не работать
          }
        },
      },
    }
  )
}

