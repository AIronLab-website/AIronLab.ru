/**
 * Blog Tags API Routes
 * 
 * GET /api/blog/tags - Список тегов
 * POST /api/blog/tags - Создание тега
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createTagSchema } from '@/lib/validations/blog'
import { generateSlug } from '@/lib/utils/blog'

/**
 * GET /api/blog/tags
 * Получить список всех тегов
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
      .from('blog_tags')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching tags:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/blog/tags error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/blog/tags
 * Создать новый тег
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
    const input = createTagSchema.parse(body)

    // Генерация slug если не указан
    const slug = input.slug || generateSlug(input.name)

    // Проверка уникальности slug
    const { data: existing } = await supabase
      .from('blog_tags')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Тег с таким slug уже существует' },
        { status: 400 }
      )
    }

    // Создание тега
    const { data: tag, error } = await supabase
      .from('blog_tags')
      .insert({
        name: input.name,
        slug,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating tag:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(tag, { status: 201 })
  } catch (error) {
    console.error('POST /api/blog/tags error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

