/**
 * Admin Dashboard
 * 
 * Главная страница админ-панели с реальной статистикой
 */

import { requireAuth, getAdminProfile } from '@/lib/supabase/auth'
import { getDashboardStats, getRecentPosts, getRecentProjects } from '@/lib/supabase/queries'
import { StatsCard } from '@/components/admin/dashboard/StatsCard'
import { RecentActivity } from '@/components/admin/dashboard/RecentActivity'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard',
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function AdminPage() {
  const session = await requireAuth()
  const profile = await getAdminProfile()

  // Получаем статистику и последние элементы
  const [stats, recentPosts, recentProjects] = await Promise.all([
    getDashboardStats(),
    getRecentPosts(3),
    getRecentProjects(2),
  ])

  // Объединяем посты и проекты для активности
  const recentActivity = [
    ...recentPosts.map((post) => ({
      id: post.id,
      title: post.title,
      type: 'post' as const,
      status: post.status,
      created_at: post.created_at,
      href: `/admin/blog/posts/${post.id}`,
    })),
    ...recentProjects.map((project) => ({
      id: project.id,
      title: project.title,
      type: 'project' as const,
      status: project.status,
      created_at: project.created_at,
      href: `/admin/projects/${project.id}`,
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">
          Добро пожаловать, {profile?.name || session.user.email?.split('@')[0]}! 👋
        </h1>
        <p className="text-slate-600">
          Вот краткий обзор вашей админ-панели
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Статей в блоге"
          value={stats.posts.total}
          subtitle={`${stats.posts.published} опубликовано, ${stats.posts.draft} черновиков`}
          href="/admin/blog/posts"
          icon={
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />

        <StatsCard
          title="Проектов"
          value={stats.projects}
          subtitle="Всего в портфолио"
          href="/admin/projects"
          icon={
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        />

        <StatsCard
          title="Категорий"
          value={stats.categories}
          subtitle="Разделы блога"
          href="/admin/blog/categories"
          icon={
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          }
        />

        <StatsCard
          title="Тегов"
          value={stats.tags}
          subtitle="Метки для постов"
          href="/admin/blog/tags"
          icon={
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-black mb-4">
          Быстрые действия
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/blog/posts"
            className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-5 h-5 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-black">Новая статья</p>
                <p className="text-xs text-slate-500">Создать пост в блоге</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/projects"
            className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-5 h-5 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-black">Новый проект</p>
                <p className="text-xs text-slate-500">Добавить в портфолио</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/media"
            className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-5 h-5 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-black">Загрузить медиа</p>
                <p className="text-xs text-slate-500">Добавить файлы</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity items={recentActivity} />
    </div>
  )
}

