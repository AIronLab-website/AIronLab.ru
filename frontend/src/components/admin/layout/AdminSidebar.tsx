/**
 * AdminSidebar Component
 * 
 * Боковое меню админ-панели с навигацией
 * - Анимированные переходы
 * - Active state для текущей страницы
 * - Collapse/expand для мобильных
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  badge?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Блог',
    href: '/admin/blog',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    children: [
      {
        name: 'Статьи',
        href: '/admin/blog/posts',
        icon: <span className="w-2 h-2 rounded-full bg-slate-400" />,
      },
      {
        name: 'Категории',
        href: '/admin/blog/categories',
        icon: <span className="w-2 h-2 rounded-full bg-slate-400" />,
      },
      {
        name: 'Теги',
        href: '/admin/blog/tags',
        icon: <span className="w-2 h-2 rounded-full bg-slate-400" />,
      },
    ],
  },
  {
    name: 'Проекты',
    href: '/admin/projects',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    badge: 'Soon',
  },
  {
    name: 'Медиа',
    href: '/admin/media',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    badge: 'Soon',
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Блог'])

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  const isChildActive = (children?: NavItem[]) => {
    return children?.some((child) => pathname.startsWith(child.href))
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h1 className="font-bold text-black text-sm">AIronLab</h1>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href)
            const childActive = isChildActive(item.children)
            const expanded = expandedItems.includes(item.name)
            const hasChildren = item.children && item.children.length > 0

            return (
              <li key={item.name}>
                {/* Parent Item */}
                {hasChildren ? (
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active || childActive
                        ? 'bg-black text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                        {item.badge}
                      </span>
                    )}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expanded ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-black text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}

                {/* Children Items */}
                {hasChildren && expanded && (
                  <ul className="mt-1 ml-8 space-y-1">
                    {item.children!.map((child) => {
                      const childIsActive = pathname === child.href

                      return (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                              childIsActive
                                ? 'text-black font-medium'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {child.icon}
                            <span>{child.name}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 text-center">
          <p>AIronLab © 2025</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>
    </aside>
  )
}

