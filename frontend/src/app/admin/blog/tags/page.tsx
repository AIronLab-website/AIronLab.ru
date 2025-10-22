/**
 * Tags Page
 * 
 * Страница управления тегами блога
 */

import { requireAuth } from '@/lib/supabase/auth'
import { TagManager } from '@/components/admin/blog/TagManager'

export const metadata = {
  title: 'Теги блога',
}

export default async function TagsPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Теги блога</h1>
        <p className="text-slate-600 mt-2">
          Управление тегами для статей
        </p>
      </div>

      {/* Tag Manager */}
      <TagManager />
    </div>
  )
}

