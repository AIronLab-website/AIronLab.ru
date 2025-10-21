/**
 * Blog Category API Routes (Single Category)
 * 
 * PUT /api/blog/categories/[id] - Обновить категорию
 * DELETE /api/blog/categories/[id] - Удалить категорию
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { updateCategorySchema } from '@/lib/validations/blog'
import { generateSlug } from '@/lib/utils/blog'

/**
 * PUT /api/blog/categories/[id]
 * Обновить категорию
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
    const input = updateCategorySchema.parse(body)

    // Проверка существования категории
    const { data: existing } = await supabase
      .from('blog_categories')
      .select('*')
      .eq('id', params.id)
      .single()

    if (!existing) {
      return NextResponse.json({ error: 'Категория не найдена' }, { status: 404 })
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
        .from('blog_categories')
        .select('id')
        .eq('slug', input.slug)
        .neq('id', params.id)
        .single()

      if (duplicate) {
        return NextResponse.json(
          { error: 'Категория с таким slug уже существует' },
          { status: 400 }
        )
      }

      updateData.slug = input.slug
    }

    if (input.description !== undefined) {
      updateData.description = input.description
    }

    // Обновление
    const { data: category, error } = await supabase
      .from('blog_categories')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating category:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('PUT /api/blog/categories/[id] error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/blog/categories/[id]
 * Удалить категорию
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

    // Проверка: есть ли посты с этой категорией
    const { count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', params.id)

    if (count && count > 0) {
      return NextResponse.json(
        { error: `Невозможно удалить категорию. Она используется в ${count} постах` },
        { status: 400 }
      )
    }

    // Удаление
    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting category:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/blog/categories/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

