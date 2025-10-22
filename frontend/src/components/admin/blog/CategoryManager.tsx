/**
 * CategoryManager Component
 * 
 * Управление категориями блога с CRUD операциями
 */

'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  Loader2Icon,
  RefreshCwIcon,
} from 'lucide-react'
import { generateSlug } from '@/lib/utils/blog'
import { toast } from 'sonner'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  post_count?: number
  created_at: string
  updated_at: string
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6',
  })

  // Загрузка категорий
  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog/categories')
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Ошибка загрузки категорий')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && !editingCategory) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(formData.name) }))
    }
  }, [formData.name, editingCategory])

  // Открыть модал для создания
  const handleCreate = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3B82F6',
    })
    setIsModalOpen(true)
  }

  // Открыть модал для редактирования
  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      color: category.color,
    })
    setIsModalOpen(true)
  }

  // Сохранить категорию
  const handleSave = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error('Введите название категории')
        return
      }

      const url = editingCategory
        ? `/api/blog/categories/${editingCategory.id}`
        : '/api/blog/categories'

      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save category')
      }

      toast.success(
        editingCategory ? 'Категория обновлена!' : 'Категория создана!'
      )
      setIsModalOpen(false)
      fetchCategories()
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error(
        error instanceof Error ? error.message : 'Ошибка сохранения категории'
      )
    }
  }

  // Открыть диалог удаления
  const handleDeleteClick = (categoryId: string) => {
    setDeletingCategory(categoryId)
    setIsDeleteDialogOpen(true)
  }

  // Удалить категорию
  const handleDelete = async () => {
    if (!deletingCategory) return

    try {
      const response = await fetch(`/api/blog/categories/${deletingCategory}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete category')
      }

      toast.success('Категория удалена!')
      setIsDeleteDialogOpen(false)
      setDeletingCategory(null)
      fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error(
        error instanceof Error ? error.message : 'Ошибка удаления категории'
      )
    }
  }

  // Фильтрация
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Поиск категорий..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white border-slate-200"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={fetchCategories}
            disabled={loading}
          >
            {loading ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCwIcon className="w-4 h-4" />
            )}
          </Button>
          <Button
            onClick={handleCreate}
            className="bg-black text-white hover:bg-slate-800"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Создать категорию
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2Icon className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlusIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-black mb-2">
            {search ? 'Категории не найдены' : 'Нет категорий'}
          </h3>
          <p className="text-slate-500 mb-6">
            {search
              ? 'Попробуйте изменить запрос'
              : 'Создайте первую категорию для классификации статей'}
          </p>
          {!search && (
            <Button
              onClick={handleCreate}
              className="bg-black text-white hover:bg-slate-800"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Создать категорию
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="font-semibold text-black">{category.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(category)}
                    className="h-8 w-8 p-0"
                  >
                    <EditIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(category.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {category.description && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {category.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <code className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                  {category.slug}
                </code>
                {category.post_count !== undefined && (
                  <Badge variant="secondary" className="text-xs">
                    {category.post_count} {category.post_count === 1 ? 'пост' : 'постов'}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Редактировать категорию' : 'Создать категорию'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? 'Обновите информацию о категории'
                : 'Добавьте новую категорию для классификации статей'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-black block mb-2">
                Название <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Например: Разработка"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="text-sm font-medium text-black block mb-2">
                Slug (URL)
              </label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="development"
                className="font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">
                URL: /blog/category/{formData.slug || 'slug'}
              </p>
            </div>

            {/* Color */}
            <div>
              <label className="text-sm font-medium text-black block mb-2">
                Цвет
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="w-12 h-10 rounded border border-slate-200 cursor-pointer"
                />
                <Input
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  placeholder="#3B82F6"
                  className="flex-1 font-mono text-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-black block mb-2">
                Описание
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Краткое описание категории (опционально)"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              className="bg-black text-white hover:bg-slate-800"
            >
              {editingCategory ? 'Обновить' : 'Создать'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтвердите удаление</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить эту категорию? Это действие необратимо.
              Все статьи останутся без категории.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

