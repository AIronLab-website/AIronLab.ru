# ✅ Чеклист: AIL-238 Storage и RLS

> Быстрая инструкция для выполнения задачи AIL-238

## 📦 Часть 1: Создание Storage Buckets (через UI)

### 1. blog-images
- [ ] Storage → Create bucket
- [ ] Name: `blog-images`
- [ ] Public: ✅ Yes
- [ ] File size limit: `5242880` (5MB)
- [ ] MIME types: `image/jpeg, image/png, image/webp, image/gif`

### 2. project-images  
- [ ] Storage → Create bucket
- [ ] Name: `project-images`
- [ ] Public: ✅ Yes
- [ ] File size limit: `5242880` (5MB)
- [ ] MIME types: `image/jpeg, image/png, image/webp, image/gif`

### 3. temp-uploads
- [ ] Storage → Create bucket
- [ ] Name: `temp-uploads`
- [ ] Public: ❌ No (Private)
- [ ] File size limit: `10485760` (10MB)
- [ ] MIME types: `image/*, video/*, application/pdf`

---

## 🔐 Часть 2: Применение RLS и Storage Policies (SQL)

- [ ] SQL Editor → New Query
- [ ] Скопировать `admin-panel/supabase/migrations/002_rls_and_storage_policies.sql`
- [ ] Вставить в редактор
- [ ] Нажать **Run**
- [ ] Дождаться успешного выполнения (✅ в консоли)

---

## ✅ Часть 3: Проверка

### Проверить buckets
- [ ] Storage → видны 3 bucket (blog-images, project-images, temp-uploads)
- [ ] blog-images и project-images помечены как Public
- [ ] temp-uploads помечен как Private

### Проверить RLS
- [ ] Выполнить в SQL Editor:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename LIKE 'blog%' OR tablename = 'projects';
```
- [ ] Все таблицы показывают `rowsecurity = true`

### Проверить Storage Policies
- [ ] Storage → Policies
- [ ] Для blog-images видны: Public read, Admin insert/update/delete
- [ ] Для project-images видны: Public read, Admin insert/update/delete
- [ ] Для temp-uploads видны: Admin read/insert/delete

### Тестовая загрузка
- [ ] Storage → blog-images → Upload file
- [ ] Загрузить тестовое изображение
- [ ] Скопировать Public URL
- [ ] Открыть URL в браузере - изображение отображается

---

## 🎯 Готово!

Если все чекбоксы отмечены ✅ - задача AIL-238 выполнена!

**Следующая задача:** AIL-239 - Создать админ пользователя и TypeScript types

---

## ⏱️ Время выполнения

- Создание buckets: ~5 минут
- Применение SQL: ~2 минуты
- Проверка: ~3 минуты
- **Всего: ~10 минут**

