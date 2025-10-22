/**
 * Blog Posts Page
 * 
 * Страница управления постами блога
 */

import { requireAuth } from '@/lib/supabase/auth'
import { PostList } from '@/components/admin/blog/PostList'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PlusIcon } from 'lucide-react'

export const metadata = {
  title: 'Статьи блога',
}

export default async function BlogPostsPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Статьи блога</h1>
          <p className="text-slate-600 mt-2">
            Управление постами и публикациями
          </p>
        </div>
        <Link href="/admin/blog/posts/new">
          <Button className="bg-black text-white hover:bg-slate-800">
            <PlusIcon className="w-4 h-4 mr-2" />
            Создать статью
          </Button>
        </Link>
      </div>

      {/* Post List */}
      <PostList />
    </div>
  )
}

