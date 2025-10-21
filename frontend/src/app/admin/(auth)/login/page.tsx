import { LoginForm } from '@/components/admin/auth/LoginForm'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase/auth'

export const metadata = {
  title: 'Вход в админ панель | AIronLab',
  description: 'Авторизация для администраторов',
}

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <LoginForm />
    </div>
  )
}

