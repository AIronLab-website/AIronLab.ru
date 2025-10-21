/**
 * useAuth Hook для Client Components
 * 
 * Предоставляет доступ к текущему пользователю и состоянию загрузки.
 * Автоматически обновляется при изменении auth состояния.
 * 
 * @example
 * ```tsx
 * 'use client'
 * 
 * import { useAuth } from '@/hooks/useAuth'
 * 
 * export function UserProfile() {
 *   const { user, loading } = useAuth()
 *   
 *   if (loading) return <div>Loading...</div>
 *   if (!user) return <div>Please login</div>
 *   
 *   return <div>Hello, {user.email}</div>
 * }
 * ```
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface UseAuthReturn {
  /** Текущий пользователь или null если не авторизован */
  user: User | null
  /** true во время загрузки auth состояния */
  loading: boolean
  /** Функция для обновления пользователя вручную */
  refresh: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const refresh = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  useEffect(() => {
    // Получаем текущего пользователя при монтировании
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
      setLoading(false)
    }

    getUser()

    // Подписываемся на изменения auth состояния
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      // Рефрешим роутер при изменении auth
      // Это нужно для обновления Server Components
      router.refresh()
    })

    // Очищаем подписку при unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return { user, loading, refresh }
}

/**
 * useRequireAuth Hook - редиректит на login если не авторизован
 * 
 * Используйте этот hook в Client Components которые требуют авторизации
 * 
 * @param redirectTo - URL для редиректа (по умолчанию /admin/login)
 * 
 * @example
 * ```tsx
 * 'use client'
 * 
 * import { useRequireAuth } from '@/hooks/useAuth'
 * 
 * export function ProtectedComponent() {
 *   const { user, loading } = useRequireAuth()
 *   
 *   if (loading) return <div>Loading...</div>
 *   
 *   return <div>Hello, {user.email}</div>
 * }
 * ```
 */
export function useRequireAuth(redirectTo: string = '/admin/login'): UseAuthReturn {
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.push(redirectTo)
    }
  }, [auth.loading, auth.user, redirectTo, router])

  return auth
}

