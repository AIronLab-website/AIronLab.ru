/**
 * ImageUpload Component
 * 
 * Компонент для загрузки изображений с drag & drop в Supabase Storage
 */

'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { ImageIcon, UploadIcon, XIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  bucket?: string
  folder?: string
  maxSize?: number // в MB
}

export function ImageUpload({
  value,
  onChange,
  bucket = 'blog-images',
  folder = 'posts',
  maxSize = 5,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null)

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)
      setError(null)
      setProgress(0)

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Пожалуйста, загрузите изображение')
      }

      // Validate file size
      const fileSizeMB = file.size / (1024 * 1024)
      if (fileSizeMB > maxSize) {
        throw new Error(`Размер файла не должен превышать ${maxSize}MB`)
      }

      // Create FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', bucket)
      formData.append('folder', folder)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 100)

      // Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ошибка при загрузке')
      }

      const data = await response.json()
      setProgress(100)
      setPreviewUrl(data.url)
      onChange(data.url)

      setTimeout(() => {
        setProgress(0)
        setUploading(false)
      }, 500)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке')
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        uploadImage(file)
      }
    },
    [bucket, folder, maxSize]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        uploadImage(file)
      }
    },
    [bucket, folder, maxSize]
  )

  const handleRemove = () => {
    setPreviewUrl(null)
    onChange('')
    setError(null)
  }

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      {!previewUrl && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging
              ? 'border-black bg-slate-50'
              : 'border-slate-300 hover:border-slate-400'
          } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />

          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>

            {uploading ? (
              <div className="w-full max-w-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Загрузка...</span>
                  <span className="text-sm text-slate-600">{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-black h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-base font-medium text-black mb-1">
                    Перетащите изображение сюда
                  </p>
                  <p className="text-sm text-slate-500">
                    или нажмите для выбора файла
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  PNG, JPG, GIF, WEBP до {maxSize}MB
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Preview */}
      {previewUrl && !uploading && (
        <div className="relative group">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-200">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
              <Button
                onClick={handleRemove}
                variant="destructive"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XIcon className="w-4 h-4 mr-2" />
                Удалить
              </Button>
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <CheckCircleIcon className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Info */}
      {!previewUrl && !uploading && (
        <p className="text-xs text-slate-500">
          Рекомендуемый размер: 1200x630px для оптимального отображения
        </p>
      )}
    </div>
  )
}

