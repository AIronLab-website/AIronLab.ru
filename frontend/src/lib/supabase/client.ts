/**
 * Supabase Client для использования в Client Components (браузер)
 * 
 * @example
 * ```tsx
 * 'use client'
 * 
 * import { createClient } from '@/lib/supabase/client'
 * 
 * export function MyComponent() {
 *   const supabase = createClient()
 *   
 *   const { data } = await supabase
 *     .from('blog_posts')
 *     .select('*')
 *   
 *   return <div>...</div>
 * }
 * ```
 */

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

