/**
 * New Post Page
 * 
 * Страница создания нового поста
 */

import { requireAuth, getAdminProfile, getCurrentUser } from '@/lib/supabase/auth'
import { PostForm } from '@/components/admin/blog/PostForm'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Новая статья',
}

export default async function NewPostPage() {
  await requireAuth()
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/admin/login')
  }

  let profile = await getAdminProfile()

  // Если профиля нет, создаем автоматически (используем админский клиент для обхода RLS)
  if (!profile) {
    const adminSupabase = createAdminClient()
    const { data: newProfile, error } = await adminSupabase
      .from('blog_authors')
      .insert({
        name: user.email?.split('@')[0] || 'Admin',
        email: user.email!,
        bio: 'Администратор блога',
        role: 'admin',
      })
      .select()
      .single()

    if (error || !newProfile) {
      console.error('Error creating author profile:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      // Перенаправляем на страницу со списком постов с сообщением об ошибке
      redirect('/admin/blog/posts')
    }

    console.log('✅ Author profile created:', newProfile)
    profile = newProfile
  }

  if (!profile) {
    redirect('/admin/blog/posts')
  }

  return <PostForm authorId={profile.id} />
}

