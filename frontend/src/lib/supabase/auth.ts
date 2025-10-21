/**
 * Auth Helper Functions для работы с Supabase Authentication
 * 
 * Эти функции используются в Server Components и Server Actions
 * для проверки аутентификации и управления сессией.
 */

import { createClient } from './server'
import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

/**
 * Проверяет аутентификацию на стороне сервера
 * Если пользователь не авторизован, редиректит на /admin/login
 * 
 * @returns Session object если пользователь авторизован
 * @throws Redirect если пользователь не авторизован
 * 
 * @example
 * ```tsx
 * // В Server Component
 * export default async function AdminPage() {
 *   const session = await requireAuth()
 *   
 *   return <div>Welcome, {session.user.email}</div>
 * }
 * ```
 */
export async function requireAuth() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  return session
}

/**
 * Получает текущего пользователя или null
 * Не редиректит, просто возвращает null если не авторизован
 * 
 * @returns User object или null
 * 
 * @example
 * ```tsx
 * export default async function ProfilePage() {
 *   const user = await getCurrentUser()
 *   
 *   if (!user) {
 *     return <div>Please login</div>
 *   }
 *   
 *   return <div>Hello, {user.email}</div>
 * }
 * ```
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

/**
 * Проверяет, авторизован ли пользователь
 * 
 * @returns true если пользователь авторизован, false если нет
 * 
 * @example
 * ```tsx
 * export default async function Header() {
 *   const isAuthenticated = await isAuth()
 *   
 *   return (
 *     <header>
 *       {isAuthenticated ? <LogoutButton /> : <LoginButton />}
 *     </header>
 *   )
 * }
 * ```
 */
export async function isAuth(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

// Server Actions moved to ./actions.ts

/**
 * Получает профиль админа из blog_authors (если существует)
 * 
 * @returns Author object или null
 * 
 * @example
 * ```tsx
 * export default async function ProfilePage() {
 *   const session = await requireAuth()
 *   const profile = await getAdminProfile()
 *   
 *   return (
 *     <div>
 *       <p>Email: {session.user.email}</p>
 *       {profile && <p>Name: {profile.name}</p>}
 *     </div>
 *   )
 * }
 * ```
 */
export async function getAdminProfile() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const supabase = createClient()

  const { data: author } = await supabase
    .from('blog_authors')
    .select('*')
    .eq('email', user.email!)
    .single()

  return author
}

