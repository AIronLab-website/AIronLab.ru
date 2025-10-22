/**
 * Categories Page
 * 
 * Страница управления категориями блога
 */

import { requireAuth } from '@/lib/supabase/auth'
import { CategoryManager } from '@/components/admin/blog/CategoryManager'

export const metadata = {
  title: 'Категории блога',
}

export default async function CategoriesPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Категории блога</h1>
        <p className="text-slate-600 mt-2">
          Управление категориями для статей
        </p>
      </div>

      {/* Category Manager */}
      <CategoryManager />
    </div>
  )
}

