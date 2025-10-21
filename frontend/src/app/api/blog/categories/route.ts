/**
 * Blog Categories API Routes
 * 
 * GET /api/blog/categories - Список категорий
 * POST /api/blog/categories - Создание категории
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createCategorySchema } from '@/lib/validations/blog'
import { generateSlug } from '@/lib/utils/blog'

/**
 * GET /api/blog/categories
 * Получить список всех категорий
 */
export async function GET() {
  try {
    const supabase = createClient()

    // Проверка аутентификации
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/blog/categories error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/blog/categories
 * Создать новую категорию
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Проверка аутентификации
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Парсинг и валидация
    const body = await request.json()
    const input = createCategorySchema.parse(body)

    // Генерация slug если не указан
    const slug = input.slug || generateSlug(input.name)

    // Проверка уникальности slug
    const { data: existing } = await supabase
      .from('blog_categories')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Категория с таким slug уже существует' },
        { status: 400 }
      )
    }

    // Создание категории
    const { data: category, error } = await supabase
      .from('blog_categories')
      .insert({
        name: input.name,
        slug,
        description: input.description,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating category:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('POST /api/blog/categories error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

