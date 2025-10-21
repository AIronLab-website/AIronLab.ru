# Supabase Configuration for AIronLab Admin Panel

Эта директория содержит все конфигурации и миграции для Supabase backend.

## 📁 Структура

```
supabase/
├── README.md                      # Этот файл
├── SETUP.md                       # Подробная инструкция по настройке
├── migrations/
│   └── 001_initial_schema.sql    # Начальная схема БД
└── .env.example                   # Пример переменных окружения
```

## 🚀 Быстрый старт

### 1. Создайте Supabase проект

Следуйте инструкциям в [SETUP.md](./SETUP.md)

### 2. Примените миграцию

Скопируйте содержимое `migrations/001_initial_schema.sql` и выполните в Supabase SQL Editor

### 3. Настройте переменные окружения

```bash
# В директории frontend/
cp ../supabase/.env.example .env.local
# Заполните реальными credentials из Supabase Dashboard
```

## 📊 Схема базы данных

### Таблицы

| Таблица | Описание | Связи |
|---------|----------|-------|
| `blog_authors` | Авторы статей | → blog_posts |
| `blog_categories` | Категории блога | → blog_posts |
| `blog_tags` | Теги | ↔ blog_posts (M2M) |
| `blog_posts` | Статьи блога | ← author, category, tags |
| `blog_post_tags` | Связь постов и тегов | Many-to-Many |
| `projects` | Портфолио проектов | - |

### Основные поля

#### blog_posts
- `title`, `slug`, `content` - основной контент
- `author_id` → blog_authors
- `category_id` → blog_categories
- `status` - draft / published / archived
- `is_featured` - избранная статья
- `seo_*` - SEO метаданные

#### projects
- `title`, `slug`, `description` - основная информация
- `results` (JSONB) - результаты проекта
- `technologies` (TEXT[]) - массив технологий
- `status`, `is_featured` - метаданные

## 🔧 Helper функции

### `generate_slug(title TEXT)`

Генерирует URL-friendly slug из заголовка:

```sql
SELECT generate_slug('Как ИИ изменил бизнес'); 
-- Вернет: 'kak-ii-izmenil-biznes'
```

### View: `blog_posts_full`

Возвращает статьи со всей связанной информацией (автор, категория, теги):

```sql
SELECT * FROM blog_posts_full WHERE status = 'published';
```

## 🔐 Row Level Security (RLS)

> RLS policies будут настроены в задаче AIL-238

Планируемые политики:
- **Public read** - публичные данные доступны всем (published посты)
- **Admin full access** - админы могут всё (CRUD)
- **Author edit own** - авторы могут редактировать свои статьи

## 📝 Миграции

### Применение новой миграции

1. Создайте файл `migrations/XXX_description.sql`
2. Напишите SQL код
3. Примените через Supabase Dashboard или CLI:

```bash
supabase db push
```

### Откат миграции

```sql
-- Для отката нужно вручную написать reverse миграцию
-- или удалить таблицы и пересоздать
```

## 🧪 Тестовые данные

Для локальной разработки можно добавить тестовые данные:

```sql
-- Вставить тестовую статью
INSERT INTO blog_posts (
  title, slug, content, author_id, category_id, status
) VALUES (
  'Тестовая статья',
  'test-article',
  'Содержимое тестовой статьи',
  (SELECT id FROM blog_authors LIMIT 1),
  (SELECT id FROM blog_categories WHERE slug = 'guides' LIMIT 1),
  'published'
);
```

## 🔗 Полезные запросы

### Получить все опубликованные статьи с автором

```sql
SELECT 
  p.title, 
  p.slug, 
  a.name as author_name,
  c.name as category_name
FROM blog_posts p
LEFT JOIN blog_authors a ON p.author_id = a.id
LEFT JOIN blog_categories c ON p.category_id = c.id
WHERE p.status = 'published'
ORDER BY p.published_at DESC;
```

### Получить статью со всеми тегами

```sql
SELECT 
  p.title,
  ARRAY_AGG(t.name) as tags
FROM blog_posts p
LEFT JOIN blog_post_tags pt ON p.id = pt.post_id
LEFT JOIN blog_tags t ON pt.tag_id = t.id
WHERE p.slug = 'your-article-slug'
GROUP BY p.id, p.title;
```

### Статистика по категориям

```sql
SELECT 
  c.name,
  COUNT(p.id) as posts_count
FROM blog_categories c
LEFT JOIN blog_posts p ON c.id = p.category_id AND p.status = 'published'
GROUP BY c.id, c.name
ORDER BY posts_count DESC;
```

## 🎯 Следующие шаги

- [ ] AIL-238: Настроить Storage buckets (blog-images, project-images)
- [ ] AIL-238: Настроить RLS policies
- [ ] AIL-239: Создать админ пользователя
- [ ] AIL-239: Сгенерировать TypeScript types

## 📞 Контакты

При проблемах с настройкой Supabase:
- [Supabase Discord](https://discord.supabase.com/)
- [Supabase GitHub Issues](https://github.com/supabase/supabase/issues)
- Документация проекта: `docs/admin-panel-epics-structure.md`

