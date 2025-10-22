/**
 * New Post Page
 * 
 * Страница создания нового поста
 */

import { requireAuth, getAdminProfile } from '@/lib/supabase/auth'
import { PostForm } from '@/components/admin/blog/PostForm'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Новая статья',
}

export default async function NewPostPage() {
  const session = await requireAuth()
  const profile = await getAdminProfile()

  if (!profile) {
    redirect('/admin/blog/posts')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Создать статью</h1>
        <p className="text-slate-600 mt-2">
          Заполните форму для создания новой статьи блога
        </p>
      </div>

      {/* Form */}
      <PostForm authorId={profile.id} />
    </div>
  )
}

