# 🚀 Настройка Supabase для AIronLab Admin Panel

> **Задача:** AIL-237 - Создать Supabase проект и настроить PostgreSQL схему

## Шаг 1: Создание Supabase проекта

### 1.1 Регистрация и создание проекта

1. Перейдите на [https://supabase.com](https://supabase.com)
2. Войдите или зарегистрируйтесь через GitHub
3. Нажмите "New Project"
4. Заполните форму:
   - **Name:** `AIronLab Production`
   - **Database Password:** Придумайте надежный пароль (сохраните его!)
   - **Region:** Выберите ближайший к вашему VPS (`Frankfurt (eu-central-1)` для Европы)
   - **Pricing Plan:** Free tier (для начала)

5. Нажмите "Create new project"
6. Дождитесь завершения создания проекта (~2 минуты)

### 1.2 Получение credentials

После создания проекта перейдите в **Settings → API** и скопируйте:

- ✅ **Project URL** (например: `https://xxxxx.supabase.co`)
- ✅ **Anon (public) key** - для frontend
- ✅ **Service Role key** - для backend (⚠️ держите в секрете!)

## Шаг 2: Настройка .env файлов

### 2.1 Frontend (.env.local)

Создайте файл `/frontend/.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Supabase Service Role (для Server Components и API Routes)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2.2 Backend (если нужен отдельный backend)

Создайте файл `/backend/.env`:

```bash
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

> ⚠️ **ВАЖНО:** Добавьте `.env.local` и `.env` в `.gitignore`! Никогда не коммитьте credentials!

## Шаг 3: Выполнение SQL миграции

### 3.1 Через Supabase Dashboard (рекомендуется)

1. Откройте ваш Supabase проект
2. Перейдите в **SQL Editor** (левое меню)
3. Нажмите "New Query"
4. Скопируйте содержимое файла `/supabase/migrations/001_initial_schema.sql`
5. Вставьте в редактор
6. Нажмите **Run** (или `Ctrl+Enter`)

✅ Вы должны увидеть сообщение об успешном выполнении

### 3.2 Через Supabase CLI (альтернатива)

```bash
# Установить Supabase CLI
npm install -g supabase

# Войти в аккаунт
supabase login

# Связать проект
supabase link --project-ref your-project-ref

# Применить миграцию
supabase db push
```

## Шаг 4: Проверка созданной схемы

### 4.1 Проверка таблиц

В Supabase Dashboard перейдите в **Table Editor**. Вы должны увидеть:

- ✅ `blog_authors` (1 запись - AIronLab Team)
- ✅ `blog_categories` (4 записи)
- ✅ `blog_tags` (10 записей)
- ✅ `blog_posts` (пустая)
- ✅ `blog_post_tags` (пустая)
- ✅ `projects` (пустая)

### 4.2 Проверка индексов

В **SQL Editor** выполните:

```sql
SELECT tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;
```

Должны быть созданы индексы для `slug`, `status`, `published_at` и т.д.

### 4.3 Проверка триггеров

```sql
SELECT 
  trigger_name, 
  event_object_table, 
  action_statement 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';
```

Должны быть триггеры `update_*_updated_at` для всех таблиц.

## Шаг 5: Проверка начальных данных

### 5.1 Проверить автора

```sql
SELECT * FROM blog_authors;
```

Должна быть запись с email `info@aironlab.ru`.

### 5.2 Проверить категории

```sql
SELECT name, slug, color FROM blog_categories ORDER BY display_order;
```

Должно быть 4 категории: Кейсы, Гайды, ИИ-агенты, Новости.

### 5.3 Проверить теги

```sql
SELECT name, slug FROM blog_tags ORDER BY name;
```

Должно быть 10 тегов (AI, Автоматизация, GPT, и т.д.)

## Шаг 6: Настройка Authentication (подготовка)

В **Authentication → Settings** проверьте:

- ✅ **Enable Email provider** - включен
- ✅ **Confirm email** - можно отключить для локальной разработки
- ✅ **Secure email change** - включить для production

> 📝 Создание админ пользователя будет в следующей задаче (AIL-239)

## 🎉 Готово!

Теперь у вас есть:

- ✅ Supabase проект с настроенной PostgreSQL схемой
- ✅ 6 таблиц с правильными связями
- ✅ Индексы для производительности
- ✅ Автоматические триггеры для `updated_at`
- ✅ Начальные данные (автор, категории, теги)
- ✅ Helper функции (generate_slug)
- ✅ View для удобных запросов (blog_posts_full)

## Следующие шаги

1. ✅ [Выполнено] AIL-237: Настройка Supabase и схемы
2. ⏭️ AIL-238: Настроить Storage buckets и RLS policies
3. ⏭️ AIL-239: Создать админ пользователя и сгенерировать TypeScript types

## 🆘 Troubleshooting

### Проблема: "relation already exists"

Если вы запускаете миграцию повторно, используйте:

```sql
-- Удалить все таблицы (ОСТОРОЖНО! Удалит все данные!)
DROP TABLE IF EXISTS blog_post_tags CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_tags CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS blog_authors CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Затем запустите миграцию заново
```

### Проблема: Ошибка с permissions

Убедитесь, что используете Service Role key для операций через API, а не Anon key.

### Проблема: Не видно таблиц в Table Editor

Проверьте, что:
1. Миграция выполнена успешно (нет ошибок в SQL Editor)
2. Вы находитесь в правильном проекте
3. Обновите страницу браузера

## 📚 Полезные ссылки

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [Supabase SQL Editor](https://supabase.com/docs/guides/database/overview)
- [Database Migrations](https://supabase.com/docs/guides/cli/managing-environments)

