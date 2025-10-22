/**
 * TagManager Component
 * 
 * Управление тегами блога с CRUD операциями
 */

'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
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
  TagIcon,
} from 'lucide-react'
import { generateSlug } from '@/lib/utils/blog'
import { toast } from 'sonner'

interface Tag {
  id: string
  name: string
  slug: string
  post_count?: number
  created_at: string
  updated_at: string
}

export function TagManager() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [deletingTag, setDeletingTag] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  })

  // Загрузка тегов
  const fetchTags = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog/tags')
      
      if (!response.ok) {
        throw new Error('Failed to fetch tags')
      }

      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error('Error fetching tags:', error)
      toast.error('Ошибка загрузки тегов')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && !editingTag) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(formData.name) }))
    }
  }, [formData.name, editingTag])

  // Открыть модал для создания
  const handleCreate = () => {
    setEditingTag(null)
    setFormData({
      name: '',
      slug: '',
    })
    setIsModalOpen(true)
  }

  // Открыть модал для редактирования
  const handleEdit = (tag: Tag) => {
    setEditingTag(tag)
    setFormData({
      name: tag.name,
      slug: tag.slug,
    })
    setIsModalOpen(true)
  }

  // Сохранить тег
  const handleSave = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error('Введите название тега')
        return
      }

      const url = editingTag
        ? `/api/blog/tags/${editingTag.id}`
        : '/api/blog/tags'

      const response = await fetch(url, {
        method: editingTag ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save tag')
      }

      toast.success(
        editingTag ? 'Тег обновлен!' : 'Тег создан!'
      )
      setIsModalOpen(false)
      fetchTags()
    } catch (error) {
      console.error('Error saving tag:', error)
      toast.error(
        error instanceof Error ? error.message : 'Ошибка сохранения тега'
      )
    }
  }

  // Открыть диалог удаления
  const handleDeleteClick = (tagId: string) => {
    setDeletingTag(tagId)
    setIsDeleteDialogOpen(true)
  }

  // Удалить тег
  const handleDelete = async () => {
    if (!deletingTag) return

    try {
      const response = await fetch(`/api/blog/tags/${deletingTag}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete tag')
      }

      toast.success('Тег удален!')
      setIsDeleteDialogOpen(false)
      setDeletingTag(null)
      fetchTags()
    } catch (error) {
      console.error('Error deleting tag:', error)
      toast.error(
        error instanceof Error ? error.message : 'Ошибка удаления тега'
      )
    }
  }

  // Фильтрация
  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Поиск тегов..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white border-slate-200"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={fetchTags}
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
            Создать тег
          </Button>
        </div>
      </div>

      {/* Tags List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2Icon className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : filteredTags.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TagIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-black mb-2">
            {search ? 'Теги не найдены' : 'Нет тегов'}
          </h3>
          <p className="text-slate-500 mb-6">
            {search
              ? 'Попробуйте изменить запрос'
              : 'Создайте первый тег для маркировки статей'}
          </p>
          {!search && (
            <Button
              onClick={handleCreate}
              className="bg-black text-white hover:bg-slate-800"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Создать тег
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                  Название
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                  Slug
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                  Статьи
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <TagIcon className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-black">{tag.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      {tag.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    {tag.post_count !== undefined && (
                      <Badge variant="secondary" className="text-xs">
                        {tag.post_count}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(tag)}
                        className="h-8 w-8 p-0"
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(tag.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTag ? 'Редактировать тег' : 'Создать тег'}
            </DialogTitle>
            <DialogDescription>
              {editingTag
                ? 'Обновите информацию о теге'
                : 'Добавьте новый тег для маркировки статей'}
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
                placeholder="Например: JavaScript"
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
                placeholder="javascript"
                className="font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">
                URL: /blog/tag/{formData.slug || 'slug'}
              </p>
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
              {editingTag ? 'Обновить' : 'Создать'}
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
              Вы уверены, что хотите удалить этот тег? Это действие необратимо.
              Тег будет удален из всех статей.
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

