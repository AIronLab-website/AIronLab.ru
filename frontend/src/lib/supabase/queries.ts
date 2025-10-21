/**
 * Supabase Query Functions
 * 
 * Функции для получения данных из Supabase
 */

import { createClient } from './server'

/**
 * Получить статистику для Dashboard
 */
export async function getDashboardStats() {
  const supabase = createClient()

  // Параллельные запросы для лучшей производительности
  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: draftPosts },
    { count: totalProjects },
    { count: totalCategories },
    { count: totalTags },
  ] = await Promise.all([
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('blog_categories').select('*', { count: 'exact', head: true }),
    supabase.from('blog_tags').select('*', { count: 'exact', head: true }),
  ])

  return {
    posts: {
      total: totalPosts || 0,
      published: publishedPosts || 0,
      draft: draftPosts || 0,
    },
    projects: totalProjects || 0,
    categories: totalCategories || 0,
    tags: totalTags || 0,
  }
}

/**
 * Получить последние статьи
 */
export async function getRecentPosts(limit = 5) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      status,
      created_at,
      updated_at,
      author:blog_authors(name, email)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent posts:', error)
    return []
  }

  return data || []
}

/**
 * Получить последние проекты
 */
export async function getRecentProjects(limit = 5) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('id, title, slug, status, created_at, updated_at')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent projects:', error)
    return []
  }

  return data || []
}

