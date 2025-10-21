/**
 * Blog Post Validation Schemas
 * 
 * Zod schemas для валидации данных постов блога
 */

import { z } from 'zod'

/**
 * Schema для создания поста
 */
export const createPostSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(255, 'Заголовок слишком длинный'),
  slug: z.string().min(1).max(255).optional(),
  content: z.string().min(1, 'Содержимое обязательно'),
  excerpt: z.string().max(500).optional().nullable(),
  featured_image: z.string().url().optional().nullable(),
  status: z.enum(['draft', 'published']).default('draft'),
  author_id: z.string().uuid(),
  category_id: z.string().uuid().optional().nullable(),
  published_at: z.string().datetime().optional().nullable(),
  meta_title: z.string().max(255).optional().nullable(),
  meta_description: z.string().max(500).optional().nullable(),
  tags: z.array(z.string().uuid()).optional().default([]),
})

/**
 * Schema для обновления поста
 */
export const updatePostSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().max(500).optional().nullable(),
  featured_image: z.string().url().optional().nullable(),
  status: z.enum(['draft', 'published']).optional(),
  category_id: z.string().uuid().optional().nullable(),
  published_at: z.string().datetime().optional().nullable(),
  meta_title: z.string().max(255).optional().nullable(),
  meta_description: z.string().max(500).optional().nullable(),
  tags: z.array(z.string().uuid()).optional(),
})

/**
 * Schema для фильтрации постов
 */
export const postFiltersSchema = z.object({
  status: z.enum(['draft', 'published', 'all']).optional().default('all'),
  category_id: z.string().uuid().optional(),
  author_id: z.string().uuid().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  sort: z.enum(['created_at', 'updated_at', 'published_at', 'title']).optional().default('created_at'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type PostFilters = z.infer<typeof postFiltersSchema>

/**
 * Schema для создания категории
 */
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(100),
  slug: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
})

/**
 * Schema для обновления категории
 */
export const updateCategorySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
})

/**
 * Schema для создания тега
 */
export const createTagSchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(50),
  slug: z.string().min(1).max(50).optional(),
})

/**
 * Schema для обновления тега
 */
export const updateTagSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  slug: z.string().min(1).max(50).optional(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
export type CreateTagInput = z.infer<typeof createTagSchema>
export type UpdateTagInput = z.infer<typeof updateTagSchema>

