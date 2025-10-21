/**
 * Blog Post API Routes (Single Post)
 * 
 * GET /api/blog/posts/[id] - Получить пост
 * PUT /api/blog/posts/[id] - Обновить пост
 * DELETE /api/blog/posts/[id] - Удалить пост
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { updatePostSchema } from '@/lib/validations/blog'
import { generateSlug, calculateReadTime, generateExcerpt } from '@/lib/utils/blog'

/**
 * GET /api/blog/posts/[id]
 * Получить пост по ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()

    // Проверка аутентификации
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:blog_authors(id, name, email, avatar_url),
        category:blog_categories(id, name, slug),
        post_tags:blog_post_tags(tag:blog_tags(id, name, slug))
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Пост не найден' }, { status: 404 })
      }
      console.error('Error fetching post:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('GET /api/blog/posts/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PUT /api/blog/posts/[id]
 * Обновить пост
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()

    // Проверка аутентификации
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Парсинг и валидация
    const body = await request.json()
    const input = updatePostSchema.parse(body)

    // Получаем существующий пост
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchError || !existingPost) {
      return NextResponse.json({ error: 'Пост не найден' }, { status: 404 })
    }

    // Проверка уникальности slug (если изменен)
    if (input.slug && input.slug !== existingPost.slug) {
      const { data: duplicatePost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', input.slug)
        .neq('id', params.id)
        .single()

      if (duplicatePost) {
        return NextResponse.json(
          { error: 'Пост с таким slug уже существует' },
          { status: 400 }
        )
      }
    }

    // Подготовка данных для обновления
    const updateData: Record<string, any> = {}

    if (input.title !== undefined) {
      updateData.title = input.title
      // Генерируем новый slug если title изменен и slug не указан явно
      if (!input.slug) {
        updateData.slug = generateSlug(input.title)
      }
    }

    if (input.slug !== undefined) updateData.slug = input.slug
    if (input.content !== undefined) {
      updateData.content = input.content
      updateData.read_time = calculateReadTime(input.content)
      // Обновляем excerpt если не указан явно
      if (input.excerpt === undefined) {
        updateData.excerpt = generateExcerpt(input.content)
      }
    }
    if (input.excerpt !== undefined) updateData.excerpt = input.excerpt
    if (input.featured_image !== undefined) updateData.featured_image = input.featured_image
    if (input.category_id !== undefined) updateData.category_id = input.category_id
    if (input.meta_title !== undefined) updateData.meta_title = input.meta_title
    if (input.meta_description !== undefined) updateData.meta_description = input.meta_description

    // Обработка статуса и даты публикации
    if (input.status !== undefined) {
      updateData.status = input.status
      
      // Устанавливаем published_at при первой публикации
      if (input.status === 'published' && !existingPost.published_at) {
        updateData.published_at = new Date().toISOString()
      }
    }

    if (input.published_at !== undefined) {
      updateData.published_at = input.published_at
    }

    // Обновление поста
    const { data: updatedPost, error: updateError } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating post:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Обновление тегов если указаны
    if (input.tags !== undefined) {
      // Удаляем старые теги
      await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', params.id)

      // Добавляем новые теги
      if (input.tags.length > 0) {
        const postTags = input.tags.map(tagId => ({
          post_id: params.id,
          tag_id: tagId,
        }))

        const { error: tagsError } = await supabase
          .from('blog_post_tags')
          .insert(postTags)

        if (tagsError) {
          console.error('Error updating tags:', tagsError)
          // Не критично, продолжаем
        }
      }
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('PUT /api/blog/posts/[id] error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/blog/posts/[id]
 * Удалить пост
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()

    // Проверка аутентификации
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Сначала удаляем связи с тегами (CASCADE может не быть настроен)
    await supabase
      .from('blog_post_tags')
      .delete()
      .eq('post_id', params.id)

    // Удаляем пост
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting post:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('DELETE /api/blog/posts/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

