# 📤 Настройка Supabase Storage Buckets

> **Задача:** AIL-238 - Настроить Storage buckets и RLS policies

## Обзор

Создадим 3 Storage bucket для хранения изображений админ-панели.

---

## Шаг 1: Создание Storage Buckets

### 1.1 Откройте Storage в Supabase

1. Перейдите в ваш Supabase проект
2. В левом меню нажмите **Storage**
3. Нажмите **"Create a new bucket"**

---

### 1.2 Создать bucket: `blog-images`

**Настройки:**

| Параметр | Значение |
|----------|----------|
| **Name** | `blog-images` |
| **Public bucket** | ✅ Yes |
| **File size limit** | `5242880` (5MB) |
| **Allowed MIME types** | `image/jpeg`, `image/png`, `image/webp`, `image/gif` |

**Описание:** Изображения для блога (обложки статей, аватары авторов, изображения в контенте)

#### Создание подпапок (опционально)

После создания bucket можно создать подпапки для организации:

```
blog-images/
├── featured/     # Обложки статей
├── content/      # Изображения в контенте
└── authors/      # Аватары авторов
```

Подпапки создаются автоматически при загрузке файлов с путями типа `featured/image.jpg`.

---

### 1.3 Создать bucket: `project-images`

**Настройки:**

| Параметр | Значение |
|----------|----------|
| **Name** | `project-images` |
| **Public bucket** | ✅ Yes |
| **File size limit** | `5242880` (5MB) |
| **Allowed MIME types** | `image/jpeg`, `image/png`, `image/webp`, `image/gif` |

**Описание:** Изображения для проектов/кейсов портфолио

---

### 1.4 Создать bucket: `temp-uploads`

**Настройки:**

| Параметр | Значение |
|----------|----------|
| **Name** | `temp-uploads` |
| **Public bucket** | ❌ No (Private) |
| **File size limit** | `10485760` (10MB) |
| **Allowed MIME types** | `image/*`, `video/*`, `application/pdf` |

**Описание:** Временное хранение файлов (для предпросмотра перед публикацией)

⚠️ **Важно:** Этот bucket должен быть **приватным** (не публичным)

---

## Шаг 2: Применение RLS и Storage Policies

### 2.1 Выполнить SQL миграцию

1. Откройте **SQL Editor** в Supabase
2. Скопируйте содержимое файла:
   ```
   admin-panel/supabase/migrations/002_rls_and_storage_policies.sql
   ```
3. Вставьте в редактор
4. Нажмите **"Run"** (или `Ctrl+Enter`)

### 2.2 Что делает миграция

✅ Включает RLS на всех таблицах  
✅ Создает публичные read-only политики для published контента  
✅ Создает admin full-access политики для authenticated пользователей  
✅ Создает Storage policies для загрузки и удаления файлов

---

## Шаг 3: Проверка созданных buckets

### 3.1 Через UI

1. Перейдите в **Storage** → **Buckets**
2. Вы должны увидеть:
   - ✅ `blog-images` (Public)
   - ✅ `project-images` (Public)
   - ✅ `temp-uploads` (Private)

### 3.2 Проверка Policies

1. Перейдите в **Storage** → **Policies**
2. Для каждого bucket должны быть созданы policies:
   - **Select** (Public для публичных buckets)
   - **Insert** (Admin only)
   - **Update** (Admin only)
   - **Delete** (Admin only)

---

## Шаг 4: Тестирование Storage

### 4.1 Тестовая загрузка файла

1. Перейдите в **Storage** → `blog-images`
2. Нажмите **"Upload file"**
3. Загрузите тестовое изображение (например, `test-image.jpg`)
4. После загрузки нажмите на файл
5. Скопируйте **Public URL**

### 4.2 Проверка публичного доступа

Откройте Public URL в браузере - изображение должно отображаться.

**Формат URL:**
```
https://your-project-id.supabase.co/storage/v1/object/public/blog-images/test-image.jpg
```

---

## Шаг 5: Проверка RLS Policies

### 5.1 Проверить статус RLS

Выполните в SQL Editor:

```sql
-- Проверить включен ли RLS
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'blog_authors', 
    'blog_categories', 
    'blog_tags', 
    'blog_posts', 
    'blog_post_tags', 
    'projects'
  )
ORDER BY tablename;
```

Все должны показывать `rls_enabled = true`.

### 5.2 Проверить созданные policies

```sql
-- Посмотреть все policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Должно быть минимум 2 policy на каждую таблицу:
- Public read (для SELECT)
- Admin full access (для ALL)

---

## Шаг 6: Настройка CORS (если нужно)

Если вы будете загружать файлы с frontend, убедитесь, что CORS настроен:

1. Перейдите в **Settings** → **API**
2. Прокрутите до **CORS**
3. Добавьте ваши домены:
   ```
   http://localhost:3000
   https://aironlab.ru
   https://www.aironlab.ru
   ```

---

## 🎉 Готово!

Теперь у вас есть:

- ✅ 3 Storage buckets настроены
- ✅ RLS включен на всех таблицах
- ✅ Публичные read-only policies для контента
- ✅ Admin full-access policies для аутентифицированных
- ✅ Storage policies для загрузки файлов

---

## 📋 Следующие шаги

1. ✅ [Выполнено] AIL-237: Настройка БД
2. ✅ [Выполнено] AIL-238: Storage и RLS
3. ⏭️ AIL-239: Создать админ пользователя и TypeScript types

---

## 🆘 Troubleshooting

### Проблема: Storage policies не применяются

**Решение:**
1. Убедитесь, что buckets созданы с правильными именами
2. Проверьте, что RLS включен: `ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;`
3. Пересоздайте policies, если нужно

### Проблема: Не могу загрузить файл через frontend

**Решение:**
1. Проверьте CORS настройки
2. Убедитесь, что используете правильный Supabase client
3. Проверьте, что файл соответствует MIME типам и размеру

### Проблема: Public URL не работает

**Решение:**
1. Убедитесь, что bucket создан как **Public**
2. Проверьте Storage policy для SELECT
3. Попробуйте пересоздать bucket

---

## 📚 Полезные ссылки

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)

