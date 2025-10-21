/**
 * Admin Layout
 * 
 * Общий layout для всех страниц админ-панели
 * - Sidebar с навигацией
 * - Header с user info
 * - Responsive дизайн
 */

import { getCurrentUser, getAdminProfile } from '@/lib/supabase/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar'
import { AdminHeader } from '@/components/admin/layout/AdminHeader'

export const metadata = {
  title: {
    template: '%s | AIronLab Admin',
    default: 'AIronLab Admin Panel',
  },
  description: 'Панель управления AIronLab',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Проверяем аутентификацию
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/admin/login')
  }

  // Получаем профиль администратора
  const profile = await getAdminProfile()

  const userData = {
    email: user.email,
    name: profile?.name || null,
    avatar: profile?.avatar_url || null,
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader user={userData} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

