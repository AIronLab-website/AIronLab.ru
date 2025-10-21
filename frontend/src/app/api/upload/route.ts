/**
 * Upload API Route
 * 
 * POST /api/upload - Загрузка изображений в Supabase Storage
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Максимальный размер файла: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024

// Разрешенные MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

/**
 * POST /api/upload
 * Загрузить изображение в Supabase Storage
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Проверка аутентификации
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Получаем FormData
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Файл не предоставлен' }, { status: 400 })
    }

    // Проверка типа файла
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Неподдерживаемый тип файла. Разрешены: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      )
    }

    // Проверка размера файла
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Файл слишком большой. Максимальный размер: 5MB` },
        { status: 400 }
      )
    }

    // Определяем bucket и путь
    const bucket = formData.get('bucket') as string || 'blog-images'
    const folder = formData.get('folder') as string || 'posts'

    // Генерируем уникальное имя файла
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(7)
    const extension = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${extension}`
    const filePath = `${folder}/${fileName}`

    // Конвертируем File в Buffer
    const buffer = await file.arrayBuffer()

    // Загрузка в Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Error uploading file:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Получаем публичный URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return NextResponse.json({
      url: publicUrl,
      path: data.path,
      bucket,
      size: file.size,
      type: file.type,
    }, { status: 201 })
  } catch (error) {
    console.error('POST /api/upload error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

