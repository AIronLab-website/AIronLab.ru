/**
 * Helper типы для работы с Supabase
 * 
 * Этот файл содержит удобные type aliases для работы с БД.
 * Основан на автогенерированных типах из @/types/supabase
 */

import type { Database } from './supabase'

// ============================================
// TABLE ROW TYPES (для чтения данных)
// ============================================

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogAuthor = Database['public']['Tables']['blog_authors']['Row']
export type BlogCategory = Database['public']['Tables']['blog_categories']['Row']
export type BlogTag = Database['public']['Tables']['blog_tags']['Row']
export type BlogPostTag = Database['public']['Tables']['blog_post_tags']['Row']
export type Project = Database['public']['Tables']['projects']['Row']

// ============================================
// INSERT TYPES (для создания новых записей)
// ============================================

export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogAuthorInsert = Database['public']['Tables']['blog_authors']['Insert']
export type BlogCategoryInsert = Database['public']['Tables']['blog_categories']['Insert']
export type BlogTagInsert = Database['public']['Tables']['blog_tags']['Insert']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']

// ============================================
// UPDATE TYPES (для обновления записей)
// ============================================

export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']
export type BlogAuthorUpdate = Database['public']['Tables']['blog_authors']['Update']
export type BlogCategoryUpdate = Database['public']['Tables']['blog_categories']['Update']
export type BlogTagUpdate = Database['public']['Tables']['blog_tags']['Update']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

// ============================================
// VIEW TYPES
// ============================================

export type BlogPostFull = Database['public']['Views']['blog_posts_full']['Row']

// ============================================
// FUNCTION TYPES
// ============================================

export type GenerateSlugArgs = Database['public']['Functions']['generate_slug']['Args']

// ============================================
// ENUM TYPES (String Literals)
// ============================================

/**
 * Статус блог поста
 */
export type PostStatus = 'draft' | 'published' | 'archived'

/**
 * Статус проекта
 */
export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'published'

// ============================================
// COMPOSITE TYPES (для сложных полей)
// ============================================

/**
 * Результат проекта (сохраняется в JSONB)
 */
export interface ProjectResult {
  metric: string      // Название метрики (например, "Конверсия")
  value: string       // Значение (например, "45%")
  improvement: string // Улучшение (например, "+120%")
}

/**
 * Полный проект с parsed results
 */
export interface ProjectWithResults extends Omit<Project, 'results'> {
  results: ProjectResult[] | null
}

// ============================================
// EXTENDED TYPES (с дополнительными полями)
// ============================================

/**
 * Блог пост с полной информацией (автор, категория, теги)
 */
export interface BlogPostWithRelations extends BlogPost {
  author: BlogAuthor
  category: BlogCategory | null
  tags: BlogTag[]
}

/**
 * Категория с количеством постов
 */
export interface BlogCategoryWithCount extends BlogCategory {
  posts_count: number
}

/**
 * Тег с количеством постов
 */
export interface BlogTagWithCount extends BlogTag {
  posts_count: number
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Все таблицы БД
 */
export type Tables = Database['public']['Tables']

/**
 * Все views БД
 */
export type Views = Database['public']['Views']

/**
 * Все функции БД
 */
export type Functions = Database['public']['Functions']

/**
 * JSON type из Supabase
 */
export type Json = Database['public']['Tables']['projects']['Row']['results']

// ============================================
// FORM TYPES (для React Hook Form)
// ============================================

/**
 * Форма создания/редактирования блог поста
 */
export interface BlogPostFormData {
  title: string
  slug?: string
  content: string
  excerpt?: string
  featured_image?: string
  category_id?: string
  tags?: string[] // массив tag IDs
  status: PostStatus
  is_featured: boolean
  published_at?: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
}

/**
 * Форма создания/редактирования проекта
 */
export interface ProjectFormData {
  title: string
  slug?: string
  description: string
  full_description?: string
  cover_image?: string
  gallery_images?: string[]
  client_name?: string
  client_logo?: string
  industry?: string
  project_date?: string
  duration?: string
  team_size?: number
  technologies?: string[]
  results?: ProjectResult[]
  challenge?: string
  solution?: string
  status: ProjectStatus
  is_featured: boolean
  seo_title?: string
  seo_description?: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Стандартный ответ API
 */
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: 'success' | 'error'
}

/**
 * Пагинированный ответ
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * Фильтры для списка постов
 */
export interface BlogPostFilters {
  category?: string
  tag?: string
  status?: PostStatus
  search?: string
  author?: string
  is_featured?: boolean
}

/**
 * Фильтры для списка проектов
 */
export interface ProjectFilters {
  status?: ProjectStatus
  industry?: string
  technology?: string
  is_featured?: boolean
  search?: string
}

