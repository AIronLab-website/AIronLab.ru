/**
 * Server Actions для Supabase Authentication
 * 
 * Все Server Actions должны быть в отдельном файле с 'use server' директивой
 */

'use server'

import { createClient } from './server'
import { redirect } from 'next/navigation'

/**
 * Выход из системы (Server Action)
 * 
 * @example
 * ```tsx
 * import { signOut } from '@/lib/supabase/actions'
 * 
 * export default function LogoutButton() {
 *   return (
 *     <form action={signOut}>
 *       <button type="submit">Logout</button>
 *     </form>
 *   )
 * }
 * ```
 */
export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

/**
 * Вход в систему через email и пароль (Server Action)
 * 
 * @param formData - FormData с email и password
 * @returns { error } - Объект с ошибкой или undefined если успех
 */
export async function signInWithPassword(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/admin')
}

