/**
 * Blog Posts API Routes
 * 
 * GET /api/blog/posts - Список постов
 * POST /api/blog/posts - Создание поста
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createPostSchema, postFiltersSchema } from '@/lib/validations/blog'
import { generateSlug, calculateReadTime, generateExcerpt } from '@/lib/utils/blog'

/**
 * GET /api/blog/posts
 * Получить список постов с фильтрацией
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // Проверка аутентификации
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Парсинг query параметров
    const searchParams = request.nextUrl.searchParams
    const result = postFiltersSchema.safeParse({
      status: searchParams.get('status') || undefined,
      category_id: searchParams.get('category_id') || undefined,
      author_id: searchParams.get('author_id') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      sort: searchParams.get('sort') || undefined,
      order: searchParams.get('order') || undefined,
    })

    if (!result.success) {
      console.error('Validation error:', result.error.flatten())
      return NextResponse.json(
        { error: 'Invalid query parameters', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const filters = result.data

    // Строим запрос
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(id, name, slug)
      `, { count: 'exact' })

    // Фильтр по статусу
    if (filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    // Фильтр по категории
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id)
    }

    // Фильтр по автору
    if (filters.author_id) {
      query = query.eq('author_id', filters.author_id)
    }

    // Поиск
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
    }

    // Сортировка
    query = query.order(filters.sort, { ascending: filters.order === 'asc' })

    // Пагинация
    const from = (filters.page - 1) * filters.limit
    const to = from + filters.limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching posts:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      posts: data,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / filters.limit),
      },
    })
  } catch (error) {
    console.error('GET /api/blog/posts error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/blog/posts
 * Создать новый пост
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Проверка аутентификации
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Парсинг и валидация тела запроса
    const body = await request.json()
    const result = createPostSchema.safeParse(body)

    if (!result.success) {
      console.error('Validation error:', result.error.flatten())
      return NextResponse.json(
        { error: 'Неверные данные', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const input = result.data

    // Генерация slug если не указан
    const slug = input.slug || generateSlug(input.title)

    // Проверка уникальности slug
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingPost) {
      return NextResponse.json(
        { error: 'Пост с таким slug уже существует' },
        { status: 400 }
      )
    }

    // Подсчет времени чтения
    const readTime = calculateReadTime(input.content)

    // Генерация excerpt если не указан
    const excerpt = input.excerpt || generateExcerpt(input.content)

    // Создание поста
    const { data: post, error: createError } = await supabase
      .from('blog_posts')
      .insert({
        title: input.title,
        slug,
        content: input.content,
        excerpt,
        featured_image: input.featured_image,
        status: input.status,
        author_id: input.author_id,
        category_id: input.category_id,
        published_at: input.status === 'published' && !input.published_at
          ? new Date().toISOString()
          : input.published_at,
        read_time: readTime,
        meta_title: input.meta_title,
        meta_description: input.meta_description,
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating post:', createError)
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }

    // Добавление тегов если указаны
    if (input.tags && input.tags.length > 0) {
      const postTags = input.tags.map(tagId => ({
        post_id: post.id,
        tag_id: tagId,
      }))

      const { error: tagsError } = await supabase
        .from('blog_post_tags')
        .insert(postTags)

      if (tagsError) {
        console.error('Error adding tags:', tagsError)
        // Не критично, продолжаем
      }
    }

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('POST /api/blog/posts error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

