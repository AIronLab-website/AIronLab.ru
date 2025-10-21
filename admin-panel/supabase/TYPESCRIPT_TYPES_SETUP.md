# 🔤 Генерация TypeScript Types из Supabase

> **Задача:** AIL-239 (часть 2/3) - Настроить генерацию TypeScript types

---

## 📋 Обзор

Supabase может автоматически генерировать TypeScript типы из вашей PostgreSQL схемы. Это обеспечивает type-safety во всем приложении.

**Время выполнения:** ~5 минут

---

## 🚀 Метод 1: Через Supabase CLI (Рекомендуется)

### Шаг 1: Установка Supabase CLI

```bash
# Глобальная установка
npm install -g supabase

# Или через npx (без установки)
npx supabase --version
```

### Шаг 2: Авторизация

```bash
# Войти в аккаунт Supabase
supabase login

# Откроется браузер для авторизации
# После успешной авторизации вернитесь в терминал
```

### Шаг 3: Получение Project ID

**Вариант A: Через Dashboard**
1. Откройте [Supabase Dashboard](https://supabase.com/dashboard)
2. Выберите проект **AIronLab Production**
3. **Settings** → **General**
4. Скопируйте **Project ID** (Reference ID)

**Вариант B: Из URL проекта**
```
URL: https://supabase.com/dashboard/project/xxxxxxxxxxxxx
                                        ^^^^^^^^^^^^^^
                                        это ваш Project ID
```

### Шаг 4: Генерация типов

```bash
# Перейдите в директорию frontend
cd frontend

# Сгенерировать types
npx supabase gen types typescript \
  --project-id YOUR_PROJECT_ID \
  > src/types/supabase.ts
```

**Замените** `YOUR_PROJECT_ID` на реальный ID вашего проекта!

**Пример:**
```bash
npx supabase gen types typescript \
  --project-id abcdefghijklmnop \
  > src/types/supabase.ts
```

---

## 📦 Метод 2: Через Supabase Management API

### Создать скрипт для генерации

Создайте файл `frontend/scripts/generate-types.js`:

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Загрузить переменные окружения
require('dotenv').config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL
  ?.match(/https:\/\/(.+)\.supabase\.co/)?.[1];

if (!projectId) {
  console.error('❌ Не найден NEXT_PUBLIC_SUPABASE_URL в .env.local');
  process.exit(1);
}

console.log(`🔍 Генерация types для проекта: ${projectId}`);

try {
  const output = execSync(
    `npx supabase gen types typescript --project-id ${projectId}`,
    { encoding: 'utf-8' }
  );

  const typesPath = path.join(__dirname, '../src/types/supabase.ts');
  
  // Создать директорию если не существует
  const dir = path.dirname(typesPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(typesPath, output);
  console.log('✅ Types успешно сгенерированы:', typesPath);
} catch (error) {
  console.error('❌ Ошибка генерации types:', error.message);
  process.exit(1);
}
```

### Сделать исполняемым

```bash
chmod +x frontend/scripts/generate-types.js
```

### Запустить

```bash
cd frontend
node scripts/generate-types.js
```

---

## 📝 Добавить npm script

Отредактируйте `frontend/package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "supabase:types": "supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts",
    "supabase:types:watch": "nodemon --watch ../admin-panel/supabase/migrations --exec 'npm run supabase:types'"
  }
}
```

**Замените** `YOUR_PROJECT_ID` на ваш реальный Project ID!

### Использование

```bash
# Сгенерировать types
npm run supabase:types

# Автоматическая регенерация при изменении миграций (опционально)
npm run supabase:types:watch
```

---

## ✅ Проверка сгенерированных types

После генерации откройте файл `frontend/src/types/supabase.ts`:

```typescript
// Должен содержать примерно такой код:

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_authors: {
        Row: {
          id: string
          name: string
          email: string | null
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          // ... остальные поля
        }
        Insert: { /* ... */ }
        Update: { /* ... */ }
      }
      // ... остальные таблицы
    }
    Views: {
      blog_posts_full: {
        Row: {
          // ... поля view
        }
      }
    }
    Functions: {
      generate_slug: {
        Args: { title: string }
        Returns: string
      }
    }
    Enums: {
      // если есть enums
    }
  }
}
```

### Размер файла

Типичный размер файла: **~200-400 строк** (зависит от количества таблиц)

---

## 🔧 Настройка Supabase клиентов

### Шаг 1: Установка зависимостей

```bash
cd frontend

# Установить Supabase JS
npm install @supabase/supabase-js

# Установить SSR helpers для Next.js
npm install @supabase/ssr
```

### Шаг 2: Создать утилиты Supabase

#### Client-side клиент (для браузера)

Создайте `frontend/src/lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### Server-side клиент (для Server Components)

Создайте `frontend/src/lib/supabase/server.ts`:

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Cookie setting может не работать в некоторых Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Cookie removal может не работать в некоторых Server Components
          }
        },
      },
    }
  )
}
```

#### Middleware клиент

Создайте `frontend/src/lib/supabase/middleware.ts`:

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}
```

---

## 💡 Примеры использования

### В Server Component

```typescript
// app/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = createClient()
  
  // Type-safe запрос!
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(5)
  
  return (
    <div>
      {posts?.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

### В Client Component

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { Database } from '@/types/supabase'

type Post = Database['public']['Tables']['blog_posts']['Row']

export function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const supabase = createClient()
  
  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
      
      if (data) setPosts(data)
    }
    
    fetchPosts()
  }, [])
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### В API Route

```typescript
// app/api/posts/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ posts })
}
```

---

## 🔄 Автоматическая регенерация

### При изменении схемы

Каждый раз после изменения SQL миграций:

```bash
# 1. Применить миграцию в Supabase Dashboard
# 2. Регенерировать types
npm run supabase:types
```

### Git pre-commit hook (опционально)

Создайте `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Регенерировать types если миграции изменились
if git diff --cached --name-only | grep -q "admin-panel/supabase/migrations"; then
  echo "📝 Обнаружены изменения в миграциях, регенерация types..."
  cd frontend && npm run supabase:types
  git add src/types/supabase.ts
fi
```

---

## 🎯 Helper Types

Создайте дополнительные helper types в `frontend/src/types/database.ts`:

```typescript
import type { Database } from './supabase'

// Row types (для чтения)
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogAuthor = Database['public']['Tables']['blog_authors']['Row']
export type BlogCategory = Database['public']['Tables']['blog_categories']['Row']
export type BlogTag = Database['public']['Tables']['blog_tags']['Row']
export type Project = Database['public']['Tables']['projects']['Row']

// Insert types (для создания)
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']

// Update types (для обновления)
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

// View types
export type BlogPostFull = Database['public']['Views']['blog_posts_full']['Row']

// Enums (если есть)
export type PostStatus = 'draft' | 'published' | 'archived'
export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'published'

// Utility types
export type Tables = Database['public']['Tables']
export type Views = Database['public']['Views']
export type Functions = Database['public']['Functions']
```

---

## ✅ Checklist

После настройки у вас должно быть:

- [ ] `frontend/src/types/supabase.ts` - сгенерированные types
- [ ] `frontend/src/types/database.ts` - helper types
- [ ] `frontend/src/lib/supabase/client.ts` - client-side клиент
- [ ] `frontend/src/lib/supabase/server.ts` - server-side клиент
- [ ] `frontend/src/lib/supabase/middleware.ts` - middleware клиент
- [ ] npm script `supabase:types` в `package.json`
- [ ] `.env.local` с Supabase credentials

---

## 🆘 Troubleshooting

### "Command 'supabase' not found"

```bash
# Установить Supabase CLI глобально
npm install -g supabase

# Или использовать npx
npx supabase gen types typescript --project-id YOUR_ID
```

### "Project not found"

Проверьте:
1. Project ID правильный
2. Вы авторизованы (`supabase login`)
3. У вас есть доступ к проекту

### "Types are empty"

Возможные причины:
1. Схема БД пустая (нет таблиц)
2. Неправильный Project ID
3. RLS блокирует доступ (используйте Service Role key)

### TypeScript ошибки после генерации

```bash
# Перезапустить TypeScript сервер в VSCode
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

---

## 📚 Полезные ссылки

- [Supabase TypeScript Docs](https://supabase.com/docs/guides/api/generating-types)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs)

---

**Задача:** AIL-239 (часть 2/3)  
**Создано:** 2025-10-21  
**Время выполнения:** ~5 минут

