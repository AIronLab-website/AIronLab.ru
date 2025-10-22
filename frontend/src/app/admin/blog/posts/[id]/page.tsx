/**
 * Edit Post Page
 * 
 * Страница редактирования поста
 */

import { requireAuth, getAdminProfile } from '@/lib/supabase/auth'
import { createServerClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/admin/blog/PostForm'
import { notFound, redirect } from 'next/navigation'

export const metadata = {
  title: 'Редактировать статью',
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const session = await requireAuth()
  const profile = await getAdminProfile()

  if (!profile) {
    redirect('/admin/blog/posts')
  }

  const supabase = createServerClient()

  // Fetch post data
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      post_tags:blog_post_tags(tag_id)
    `)
    .eq('id', params.id)
    .single()

  if (error || !post) {
    notFound()
  }

  // Extract tag IDs
  const tagIds = post.post_tags?.map((pt: any) => pt.tag_id) || []

  const initialData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    featured_image: post.featured_image,
    status: post.status,
    category_id: post.category_id,
    meta_title: post.meta_title,
    meta_description: post.meta_description,
    tags: tagIds,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Редактировать статью</h1>
        <p className="text-slate-600 mt-2">
          {post.title}
        </p>
      </div>

      {/* Form */}
      <PostForm initialData={initialData} authorId={profile.id} />
    </div>
  )
}

