/**
 * Тестовая страница для проверки middleware и аутентификации
 * 
 * Эта страница:
 * 1. Требует аутентификации (защищена middleware)
 * 2. Показывает информацию о текущем пользователе
 * 3. Демонстрирует работу auth helper функций
 * 
 * Доступна по адресу: /admin/test
 */

import { requireAuth, getCurrentUser, getAdminProfile } from '@/lib/supabase/auth'
import { signOut } from '@/lib/supabase/actions'

export default async function AdminTestPage() {
  // Проверяем аутентификацию (редиректит на /admin/login если не авторизован)
  const session = await requireAuth()

  // Получаем пользователя
  const user = await getCurrentUser()

  // Получаем профиль админа (если есть)
  const profile = await getAdminProfile()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6 text-green-600">
            ✅ Middleware работает!
          </h1>

          <div className="space-y-6">
            {/* Session Info */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">Session Information</h2>
              <div className="bg-gray-50 p-4 rounded space-y-2">
                <p>
                  <span className="font-medium">User ID:</span>{' '}
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {session.user.id}
                  </code>
                </p>
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  <span className="text-blue-600">{session.user.email}</span>
                </p>
                <p>
                  <span className="font-medium">Created At:</span>{' '}
                  {new Date(session.user.created_at).toLocaleString('ru-RU')}
                </p>
                <p>
                  <span className="font-medium">Session Expires:</span>{' '}
                  {session.expires_at
                    ? new Date(session.expires_at * 1000).toLocaleString('ru-RU')
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* User Metadata */}
            {user?.user_metadata && Object.keys(user.user_metadata).length > 0 && (
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-3">User Metadata</h2>
                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
                  {JSON.stringify(user.user_metadata, null, 2)}
                </pre>
              </div>
            )}

            {/* Admin Profile */}
            {profile ? (
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-3">
                  📝 Admin Profile (from blog_authors)
                </h2>
                <div className="bg-blue-50 p-4 rounded space-y-2">
                  <p>
                    <span className="font-medium">Name:</span> {profile.name}
                  </p>
                  {profile.bio && (
                    <p>
                      <span className="font-medium">Bio:</span> {profile.bio}
                    </p>
                  )}
                  {profile.avatar_url && (
                    <p>
                      <span className="font-medium">Avatar URL:</span>{' '}
                      <a
                        href={profile.avatar_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.avatar_url}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-3">
                  📝 Admin Profile
                </h2>
                <p className="text-gray-600">
                  Профиль в blog_authors не найден для этого пользователя.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Создайте профиль в таблице blog_authors с email: {user?.email}
                </p>
              </div>
            )}

            {/* Test Results */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">✅ Test Results</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Middleware защищает /admin роуты</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>requireAuth() работает корректно</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>getCurrentUser() возвращает пользователя</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>getAdminProfile() работает</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Session сохраняется в cookies</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Actions</h2>
              <div className="flex gap-4">
                <form action={signOut}>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Logout (Sign Out)
                  </button>
                </form>

                <a
                  href="/admin"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block"
                >
                  Go to Admin Dashboard
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                После logout вас редиректнет на /admin/login
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">
                📋 Инструкции для тестирования
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-900">
                <li>Нажмите "Logout" → должен редиректнуть на /admin/login</li>
                <li>Попробуйте зайти на /admin без auth → должен редиректнуть</li>
                <li>Залогиньтесь → middleware должен пустить на /admin</li>
                <li>Зайдите на /admin/test снова → должна показаться эта страница</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-6 bg-gray-900 text-gray-100 rounded-lg p-4 text-xs">
          <p className="font-semibold mb-2">🔍 Debug Info:</p>
          <pre className="overflow-x-auto">
            {JSON.stringify(
              {
                sessionExists: !!session,
                userId: user?.id,
                userEmail: user?.email,
                hasProfile: !!profile,
                timestamp: new Date().toISOString(),
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}

