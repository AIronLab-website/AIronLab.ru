/**
 * PostList Component
 * 
 * Список постов с таблицей, фильтрацией и поиском
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { 
  SearchIcon, 
  FilterIcon, 
  EditIcon, 
  TrashIcon, 
  MoreHorizontalIcon,
  PlusIcon,
  RefreshCwIcon,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

interface Post {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  created_at: string
  published_at?: string | null
  author?: {
    name: string
    email: string
  }
  category?: {
    name: string
    slug: string
  }
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

export function PostList() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all')
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  })

  // Загрузка постов
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        status: statusFilter,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      if (search) {
        params.append('search', search)
      }

      const response = await fetch(`/api/blog/posts?${params}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.error || 'Failed to fetch posts')
      }

      const data = await response.json()
      setPosts(data.posts || [])
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching posts:', error)
      // Показываем пустой список при ошибке
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  // Debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts()
    }, 300)
    return () => clearTimeout(timer)
  }, [search, statusFilter, pagination.page])

  // Удаление поста
  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот пост?')) return

    try {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete post')

      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Ошибка при удалении поста')
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Поиск по заголовку..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
              className={statusFilter === 'all' ? 'bg-black text-white' : ''}
            >
              Все
            </Button>
            <Button
              variant={statusFilter === 'published' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('published')}
              className={statusFilter === 'published' ? 'bg-black text-white' : ''}
            >
              Опубликованные
            </Button>
            <Button
              variant={statusFilter === 'draft' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('draft')}
              className={statusFilter === 'draft' ? 'bg-black text-white' : ''}
            >
              Черновики
            </Button>
          </div>

          {/* Refresh */}
          <Button
            variant="outline"
            onClick={fetchPosts}
            disabled={loading}
          >
            <RefreshCwIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-black rounded-full animate-spin" />
            <p className="mt-4 text-slate-500">Загрузка постов...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Нет постов
            </h3>
            <p className="text-slate-500 mb-6">
              {search || statusFilter !== 'all'
                ? 'Попробуйте изменить фильтры'
                : 'Создайте свой первый пост'}
            </p>
            {!search && statusFilter === 'all' && (
              <Button
                onClick={() => router.push('/admin/blog/posts/new')}
                className="bg-black text-white hover:bg-slate-800"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Создать статью
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Заголовок
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Категория
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Статус
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Автор
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Дата
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {posts.map((post) => (
                    <tr 
                      key={post.id} 
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/admin/blog/posts/${post.id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-black">
                          {post.title}
                        </div>
                        <div className="text-sm text-slate-500">
                          {post.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {post.category ? (
                          <span className="text-sm text-slate-600">
                            {post.category.name}
                          </span>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={post.status === 'published' ? 'default' : 'secondary'}
                          className={
                            post.status === 'published'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                          }
                        >
                          {post.status === 'published' ? 'Опубликован' : 'Черновик'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {post.author ? (
                          <span className="text-sm text-slate-600">
                            {post.author.name || post.author.email}
                          </span>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500">
                          {formatDistanceToNow(new Date(post.published_at || post.created_at), {
                            addSuffix: true,
                            locale: ru,
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontalIcon className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/admin/blog/posts/${post.id}`)
                              }}
                            >
                              <EditIcon className="w-4 h-4 mr-2" />
                              Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(post.id)
                              }}
                              className="text-red-600 focus:text-red-600"
                            >
                              <TrashIcon className="w-4 h-4 mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Показано {posts.length} из {pagination.total} постов
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                  >
                    Назад
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === pagination.page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPagination((prev) => ({ ...prev, page }))}
                        className={page === pagination.page ? 'bg-black text-white' : ''}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.pages}
                  >
                    Вперёд
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

