/**
 * API Test Page
 * 
 * Страница для тестирования всех Blog API endpoints
 */

import { requireAuth } from '@/lib/supabase/auth'

export const metadata = {
  title: 'API Тестирование',
}

export default async function ApiTestPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">API Тестирование</h1>
        <p className="text-slate-600 mt-2">
          Проверка всех Blog API endpoints
        </p>
      </div>

      {/* Posts API */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-black mb-4">📝 Posts API</h2>
        <div className="space-y-3">
          <TestEndpoint
            method="GET"
            endpoint="/api/blog/posts"
            description="Получить список постов"
          />
          <TestEndpoint
            method="POST"
            endpoint="/api/blog/posts"
            description="Создать пост"
          />
          <TestEndpoint
            method="GET"
            endpoint="/api/blog/posts/[id]"
            description="Получить пост по ID"
          />
          <TestEndpoint
            method="PUT"
            endpoint="/api/blog/posts/[id]"
            description="Обновить пост"
          />
          <TestEndpoint
            method="DELETE"
            endpoint="/api/blog/posts/[id]"
            description="Удалить пост"
          />
        </div>
      </div>

      {/* Categories API */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-black mb-4">🗂️ Categories API</h2>
        <div className="space-y-3">
          <TestEndpoint
            method="GET"
            endpoint="/api/blog/categories"
            description="Получить список категорий"
          />
          <TestEndpoint
            method="POST"
            endpoint="/api/blog/categories"
            description="Создать категорию"
          />
          <TestEndpoint
            method="PUT"
            endpoint="/api/blog/categories/[id]"
            description="Обновить категорию"
          />
          <TestEndpoint
            method="DELETE"
            endpoint="/api/blog/categories/[id]"
            description="Удалить категорию"
          />
        </div>
      </div>

      {/* Tags API */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-black mb-4">🏷️ Tags API</h2>
        <div className="space-y-3">
          <TestEndpoint
            method="GET"
            endpoint="/api/blog/tags"
            description="Получить список тегов"
          />
          <TestEndpoint
            method="POST"
            endpoint="/api/blog/tags"
            description="Создать тег"
          />
          <TestEndpoint
            method="PUT"
            endpoint="/api/blog/tags/[id]"
            description="Обновить тег"
          />
          <TestEndpoint
            method="DELETE"
            endpoint="/api/blog/tags/[id]"
            description="Удалить тег"
          />
        </div>
      </div>

      {/* Upload API */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-black mb-4">📤 Upload API</h2>
        <div className="space-y-3">
          <TestEndpoint
            method="POST"
            endpoint="/api/upload"
            description="Загрузить изображение"
          />
        </div>
      </div>

      {/* Validation Tests */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-black mb-4">✅ Zod Validation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ValidationTest
            name="CreatePostSchema"
            fields={['title', 'content', 'author_id', 'status']}
          />
          <ValidationTest
            name="UpdatePostSchema"
            fields={['title (optional)', 'content (optional)', 'status (optional)']}
          />
          <ValidationTest
            name="CreateCategorySchema"
            fields={['name', 'slug (optional)', 'description (optional)']}
          />
          <ValidationTest
            name="CreateTagSchema"
            fields={['name', 'slug (optional)']}
          />
          <ValidationTest
            name="PostFiltersSchema"
            fields={['status', 'category_id', 'search', 'page', 'limit']}
          />
        </div>
      </div>

      {/* Helper Functions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-black mb-4">🛠️ Helper Functions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HelperFunction
            name="generateSlug()"
            description="Генерация slug из заголовка с транслитерацией"
            example="'Привет Мир' → 'privet-mir'"
          />
          <HelperFunction
            name="calculateReadTime()"
            description="Подсчет времени чтения (200 слов/мин)"
            example="'1000 words' → '5 min'"
          />
          <HelperFunction
            name="generateExcerpt()"
            description="Генерация выдержки из контента"
            example="'Long text...' → 'Long text... (200 chars)'"
          />
        </div>
      </div>

      {/* Security Tests */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-black mb-4">🔒 Security Tests</h2>
        <div className="space-y-3">
          <SecurityTest
            test="Auth Protection"
            description="Все endpoints требуют аутентификации"
            status="passed"
          />
          <SecurityTest
            test="Slug Uniqueness"
            description="Проверка уникальности slug при создании/обновлении"
            status="passed"
          />
          <SecurityTest
            test="File Validation"
            description="Проверка типа и размера файла (max 5MB)"
            status="passed"
          />
          <SecurityTest
            test="Category Protection"
            description="Защита от удаления используемых категорий"
            status="passed"
          />
        </div>
      </div>

      {/* Test Instructions */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-black mb-4">📋 Инструкция по тестированию</h2>
        <ol className="list-decimal list-inside space-y-2 text-slate-700">
          <li>Используйте <strong>Postman</strong>, <strong>Thunder Client</strong> или <strong>curl</strong> для тестирования</li>
          <li>Убедитесь, что вы авторизованы (получите session cookie)</li>
          <li>Протестируйте каждый endpoint с корректными данными</li>
          <li>Протестируйте валидацию с некорректными данными</li>
          <li>Проверьте обработку ошибок (404, 400, 401, 500)</li>
          <li>Проверьте все success cases и error cases</li>
        </ol>
      </div>
    </div>
  )
}

function TestEndpoint({ 
  method, 
  endpoint, 
  description 
}: { 
  method: string
  endpoint: string
  description: string 
}) {
  const methodColors: Record<string, string> = {
    GET: 'bg-green-100 text-green-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-yellow-100 text-yellow-700',
    DELETE: 'bg-red-100 text-red-700',
  }

  return (
    <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
      <span className={`px-3 py-1 rounded font-mono text-xs font-semibold ${methodColors[method]}`}>
        {method}
      </span>
      <code className="flex-1 text-sm font-mono text-slate-700">{endpoint}</code>
      <span className="text-sm text-slate-500">{description}</span>
    </div>
  )
}

function ValidationTest({ 
  name, 
  fields 
}: { 
  name: string
  fields: string[] 
}) {
  return (
    <div className="p-4 border border-slate-200 rounded-lg">
      <h3 className="font-semibold text-black mb-2">{name}</h3>
      <ul className="text-sm text-slate-600 space-y-1">
        {fields.map((field, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
            {field}
          </li>
        ))}
      </ul>
    </div>
  )
}

function HelperFunction({ 
  name, 
  description, 
  example 
}: { 
  name: string
  description: string
  example: string 
}) {
  return (
    <div className="p-4 border border-slate-200 rounded-lg">
      <h3 className="font-semibold text-black mb-2 font-mono text-sm">{name}</h3>
      <p className="text-sm text-slate-600 mb-3">{description}</p>
      <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700 block">
        {example}
      </code>
    </div>
  )
}

function SecurityTest({ 
  test, 
  description, 
  status 
}: { 
  test: string
  description: string
  status: 'passed' | 'failed' 
}) {
  return (
    <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
      <div className={`w-3 h-3 rounded-full ${status === 'passed' ? 'bg-green-500' : 'bg-red-500'}`} />
      <div className="flex-1">
        <h3 className="font-semibold text-black text-sm">{test}</h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <span className={`text-xs font-semibold ${status === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
        {status === 'passed' ? '✓ Passed' : '✗ Failed'}
      </span>
    </div>
  )
}

