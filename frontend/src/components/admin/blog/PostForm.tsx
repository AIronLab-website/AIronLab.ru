/**
 * PostForm Component
 * 
 * Форма для создания и редактирования постов блога
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/label'
import { RichTextEditor } from '@/components/admin/shared/RichTextEditor'
import { ImageUpload } from '@/components/admin/shared/ImageUpload'
import { generateSlug } from '@/lib/utils/blog'
import { SaveIcon, EyeIcon, XIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PostFormProps {
  initialData?: {
    id?: string
    title: string
    slug: string
    content: string
    excerpt?: string
    featured_image?: string
    status: 'draft' | 'published'
    category_id?: string
    meta_title?: string
    meta_description?: string
    tags?: string[]
  }
  authorId: string
}

export function PostForm({ initialData, authorId }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])

  // Form state
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    featured_image: initialData?.featured_image || '',
    status: initialData?.status || 'draft' as 'draft' | 'published',
    category_id: initialData?.category_id || '',
    meta_title: initialData?.meta_title || '',
    meta_description: initialData?.meta_description || '',
    tags: initialData?.tags || [],
  })

  // Auto-generate slug from title
  useEffect(() => {
    if (!initialData && formData.title && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }))
    }
  }, [formData.title, initialData])

  // Load categories and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          fetch('/api/blog/categories'),
          fetch('/api/blog/tags'),
        ])
        
        if (categoriesRes.ok) {
          const data = await categoriesRes.json()
          setCategories(data)
        }
        
        if (tagsRes.ok) {
          const data = await tagsRes.json()
          setTags(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent, status?: 'draft' | 'published') => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...formData,
        author_id: authorId,
        status: status || formData.status,
      }

      const url = initialData?.id
        ? `/api/blog/posts/${initialData.id}`
        : '/api/blog/posts'

      const response = await fetch(url, {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save post')
      }

      const savedPost = await response.json()
      
      // Redirect to posts list
      router.push('/admin/blog/posts')
      router.refresh()
    } catch (error) {
      console.error('Error saving post:', error)
      alert(error instanceof Error ? error.message : 'Ошибка при сохранении поста')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="bg-white border border-slate-200">
          <TabsTrigger value="content">Контент</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6 mt-6">
          {/* Title */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-semibold text-black">
                Заголовок <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Введите заголовок поста"
                required
                className="mt-2"
              />
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="slug" className="text-sm font-semibold text-black">
                Slug
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="slug-posta"
                className="mt-2 font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">
                URL поста будет: /blog/{formData.slug || 'slug-posta'}
              </p>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <Label className="text-sm font-semibold text-black mb-2 block">
              Содержимое <span className="text-red-500">*</span>
            </Label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Начните писать статью..."
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <Label htmlFor="excerpt" className="text-sm font-semibold text-black">
              Краткое описание
            </Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Краткое описание статьи (опционально)"
              rows={3}
              className="mt-2"
            />
            <p className="text-xs text-slate-500 mt-1">
              Будет сгенерировано автоматически, если не указано
            </p>
          </div>

          {/* Category & Featured Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <Label htmlFor="category" className="text-sm font-semibold text-black">
                Категория
              </Label>
              <select
                id="category"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="mt-2 w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Без категории</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <Label className="text-sm font-semibold text-black block mb-2">
                Главное изображение
              </Label>
              <ImageUpload
                value={formData.featured_image}
                onChange={(url) => setFormData({ ...formData, featured_image: url })}
                bucket="blog-images"
                folder="posts"
              />
            </div>
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6 mt-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            {/* Meta Title */}
            <div>
              <Label htmlFor="meta_title" className="text-sm font-semibold text-black">
                SEO заголовок
              </Label>
              <Input
                id="meta_title"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="Оптимизированный заголовок для поисковиков"
                maxLength={60}
                className="mt-2"
              />
              <p className="text-xs text-slate-500 mt-1">
                {formData.meta_title.length}/60 символов
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <Label htmlFor="meta_description" className="text-sm font-semibold text-black">
                SEO описание
              </Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="Краткое описание для поисковых систем"
                maxLength={160}
                rows={3}
                className="mt-2"
              />
              <p className="text-xs text-slate-500 mt-1">
                {formData.meta_description.length}/160 символов
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={() => router.back()}
              variant="outline"
              disabled={loading}
            >
              <XIcon className="w-4 h-4 mr-2" />
              Отменить
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, 'draft')}
              variant="outline"
              disabled={loading}
            >
              <SaveIcon className="w-4 h-4 mr-2" />
              Сохранить черновик
            </Button>
          </div>
          <Button
            type="submit"
            disabled={loading || !formData.title || !formData.content}
            className="bg-black text-white hover:bg-slate-800"
          >
            {loading ? 'Сохранение...' : initialData ? 'Обновить пост' : 'Опубликовать пост'}
          </Button>
        </div>
      </div>
    </form>
  )
}

