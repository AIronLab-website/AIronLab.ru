# 🧪 API Testing Guide

Руководство по тестированию Blog API endpoints.

---

## 📋 Содержание

1. [Обзор](#обзор)
2. [Endpoints](#endpoints)
3. [Zod Validation](#zod-validation)
4. [Helper Functions](#helper-functions)
5. [Security Tests](#security-tests)
6. [Примеры запросов](#примеры-запросов)

---

## 🎯 Обзор

Все API endpoints реализованы в:
- `src/app/api/blog/posts/` - Posts CRUD
- `src/app/api/blog/categories/` - Categories CRUD
- `src/app/api/blog/tags/` - Tags CRUD
- `src/app/api/upload/` - Image upload

**Тестовая страница:** `/admin/api-test`

---

## 🔌 Endpoints

### Posts API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/blog/posts` | Список постов с фильтрацией |
| `POST` | `/api/blog/posts` | Создание поста |
| `GET` | `/api/blog/posts/[id]` | Получение поста по ID |
| `PUT` | `/api/blog/posts/[id]` | Обновление поста |
| `DELETE` | `/api/blog/posts/[id]` | Удаление поста |

### Categories API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/blog/categories` | Список категорий |
| `POST` | `/api/blog/categories` | Создание категории |
| `PUT` | `/api/blog/categories/[id]` | Обновление категории |
| `DELETE` | `/api/blog/categories/[id]` | Удаление категории |

### Tags API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/blog/tags` | Список тегов |
| `POST` | `/api/blog/tags` | Создание тега |
| `PUT` | `/api/blog/tags/[id]` | Обновление тега |
| `DELETE` | `/api/blog/tags/[id]` | Удаление тега |

### Upload API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload` | Загрузка изображения |

---

## ✅ Zod Validation

### CreatePostSchema
```typescript
{
  title: string (1-255 chars, required)
  slug?: string (1-255 chars)
  content: string (required)
  excerpt?: string | null (max 500 chars)
  featured_image?: string | null (url)
  status: 'draft' | 'published' (default: 'draft')
  author_id: string (uuid, required)
  category_id?: string | null (uuid)
  published_at?: string | null (datetime)
  meta_title?: string | null (max 255 chars)
  meta_description?: string | null (max 500 chars)
  tags?: string[] (array of uuids)
}
```

### UpdatePostSchema
Все поля optional (частичное обновление)

### CreateCategorySchema
```typescript
{
  name: string (1-100 chars, required)
  slug?: string (1-100 chars)
  description?: string | null (max 500 chars)
}
```

### CreateTagSchema
```typescript
{
  name: string (1-50 chars, required)
  slug?: string (1-50 chars)
}
```

### PostFiltersSchema
```typescript
{
  status?: 'draft' | 'published' | 'all' (default: 'all')
  category_id?: string (uuid)
  author_id?: string (uuid)
  search?: string
  page?: number (min 1, default: 1)
  limit?: number (1-100, default: 20)
  sort?: 'created_at' | 'updated_at' | 'published_at' | 'title'
  order?: 'asc' | 'desc' (default: 'desc')
}
```

---

## 🛠️ Helper Functions

### `generateSlug(title: string): string`
Генерирует URL-friendly slug из заголовка с транслитерацией русских букв.

**Пример:**
```typescript
generateSlug('Привет, мир!') // => 'privet-mir'
generateSlug('Hello World 123') // => 'hello-world-123'
```

### `calculateReadTime(content: string): number`
Подсчитывает время чтения на основе количества слов (200 слов/мин).

**Пример:**
```typescript
calculateReadTime('Lorem ipsum...') // => 5 (минут)
```

### `generateExcerpt(content: string, maxLength?: number): string`
Генерирует краткое описание из контента (по умолчанию 200 символов).

**Пример:**
```typescript
generateExcerpt('Very long text...', 50) // => 'Very long text...'
```

---

## 🔒 Security Tests

### ✅ Auth Protection
Все endpoints требуют аутентификации. Без session cookie возвращается `401 Unauthorized`.

### ✅ Slug Uniqueness
При создании/обновлении проверяется уникальность slug. При дубликате возвращается `400 Bad Request`.

### ✅ File Validation
- Allowed types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- Max size: 5MB
- При нарушении возвращается `400 Bad Request`

### ✅ Category Protection
Защита от удаления категорий, используемых в постах. Возвращается `400 Bad Request` с сообщением о количестве постов.

### ✅ Cascade Delete
При удалении тега автоматически удаляются все связи `blog_post_tags`.

---

## 📝 Примеры запросов

### Создание поста
```bash
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Тестовый пост",
    "content": "Содержимое поста...",
    "author_id": "uuid-here",
    "status": "draft"
  }'
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Тестовый пост",
  "slug": "testovyy-post",
  "content": "Содержимое поста...",
  "read_time": 1,
  "status": "draft",
  ...
}
```

### Получение списка постов с фильтрацией
```bash
curl "http://localhost:3000/api/blog/posts?status=published&page=1&limit=10"
```

**Response:**
```json
{
  "posts": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### Создание категории
```bash
curl -X POST http://localhost:3000/api/blog/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Разработка",
    "description": "Статьи о программировании"
  }'
```

### Загрузка изображения
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@/path/to/image.jpg" \
  -F "bucket=blog-images" \
  -F "folder=posts"
```

**Response:**
```json
{
  "url": "https://supabase.co/storage/v1/object/public/...",
  "path": "posts/1234567890-abc.jpg",
  "bucket": "blog-images",
  "size": 123456,
  "type": "image/jpeg"
}
```

---

## ❌ Error Cases

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Пост не найден"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## 📊 Test Checklist

- [x] ✅ Создание поста
- [x] ✅ Получение списка постов
- [x] ✅ Обновление поста
- [x] ✅ Удаление поста
- [x] ✅ Создание категории
- [x] ✅ Создание тега
- [x] ✅ Загрузка изображения
- [x] ❌ Попытка доступа без auth
- [x] ❌ Валидация неправильных данных
- [x] ✅ Auto-генерация slug
- [x] ✅ Auto-подсчет read_time
- [x] ✅ Проверка уникальности slug
- [x] ✅ Защита от удаления используемых категорий
- [x] ✅ Каскадное удаление связей с тегами

---

## 🚀 Результат

✅ Все Zod schemas созданы и работают  
✅ Helper функции реализованы  
✅ Все API endpoints протестированы  
✅ Обработка ошибок работает корректно  
✅ Auth protection включен на всех endpoints  
✅ Валидация данных работает  

**Backend API готов к интеграции с UI!** 🎉

