/**
 * Blog Tag API Routes (Single Tag)
 * 
 * PUT /api/blog/tags/[id] - Обновить тег
 * DELETE /api/blog/tags/[id] - Удалить тег
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { updateTagSchema } from '@/lib/validations/blog'
import { generateSlug } from '@/lib/utils/blog'

/**
 * PUT /api/blog/tags/[id]
 * Обновить тег
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
    const input = updateTagSchema.parse(body)

    // Проверка существования тега
    const { data: existing } = await supabase
      .from('blog_tags')
      .select('*')
      .eq('id', params.id)
      .single()

    if (!existing) {
      return NextResponse.json({ error: 'Тег не найден' }, { status: 404 })
    }

    // Подготовка данных для обновления
    const updateData: Record<string, any> = {}

    if (input.name !== undefined) {
      updateData.name = input.name
      // Генерируем новый slug если name изменен и slug не указан явно
      if (!input.slug) {
        updateData.slug = generateSlug(input.name)
      }
    }

    if (input.slug !== undefined) {
      // Проверка уникальности нового slug
      const { data: duplicate } = await supabase
        .from('blog_tags')
        .select('id')
        .eq('slug', input.slug)
        .neq('id', params.id)
        .single()

      if (duplicate) {
        return NextResponse.json(
          { error: 'Тег с таким slug уже существует' },
          { status: 400 }
        )
      }

      updateData.slug = input.slug
    }

    // Обновление
    const { data: tag, error } = await supabase
      .from('blog_tags')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating tag:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(tag)
  } catch (error) {
    console.error('PUT /api/blog/tags/[id] error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/blog/tags/[id]
 * Удалить тег
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

    // Удаляем связи с постами
    await supabase
      .from('blog_post_tags')
      .delete()
      .eq('tag_id', params.id)

    // Удаляем тег
    const { error } = await supabase
      .from('blog_tags')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting tag:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/blog/tags/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

