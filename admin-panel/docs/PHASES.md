# Фазы разработки Admin Panel

> Детальный план разработки по фазам. Полная структура: `/docs/admin-panel-epics-structure.md`

## Обзор

Разработка админ-панели разделена на **7 фаз**, каждая из которых представляет собой логически завершенный этап.

---

## 🏗️ Фаза 1: Настройка Supabase (ТЕКУЩАЯ)

**Эпик:** AIL-306  
**Статус:** 🔄 В работе  
**Задачи:** AIL-237, AIL-238, AIL-239

### Цели

- ✅ Создать Supabase проект
- ✅ Настроить PostgreSQL схему
- ⏳ Настроить Storage buckets
- ⏳ Настроить RLS policies
- ⏳ Создать админ пользователя
- ⏳ Сгенерировать TypeScript types

### Задачи

1. **AIL-237:** Создать Supabase проект и PostgreSQL схему
   - Создание проекта на supabase.com
   - SQL миграция (blog_authors, blog_categories, blog_tags, blog_posts, projects)
   - Индексы и триггеры
   - Начальные данные

2. **AIL-238:** Настроить Storage buckets и RLS policies
   - Создать buckets: blog-images, project-images, temp-uploads
   - RLS policies для таблиц (public read, admin write)
   - Storage policies

3. **AIL-239:** Создать админ пользователя и TypeScript types
   - Создать admin@aironlab.ru через Supabase Auth
   - Установить @supabase/supabase-js
   - Сгенерировать types из схемы
   - Настроить Supabase клиенты

### Результаты

- ✅ Полностью настроенный Supabase backend
- ✅ Готовая схема БД
- ✅ TypeScript типы для type-safe разработки

---

## 🔐 Фаза 2: Аутентификация и структура

**Эпик:** AIL-307  
**Статус:** ⏳ Ожидание  
**Задачи:** AIL-240, AIL-241, AIL-242, AIL-243

### Цели

- Настроить Supabase Auth middleware
- Создать страницу логина
- Реализовать AdminLayout с sidebar
- Создать Dashboard

### Дизайн

Все UI компоненты из Shadcn регистров:
- @aceternity - для анимаций
- @kokonutui - для UI компонентов
- @reui - для дополнительных элементов

---

## 🔌 Фаза 3: API Routes для CRUD

**Эпик:** AIL-308  
**Статус:** ⏳ Ожидание  
**Задачи:** AIL-244, AIL-245, AIL-246

### Цели

- Next.js API Routes для блога
- Next.js API Routes для проектов
- Валидация через Zod schemas
- Обработка ошибок

---

## ✏️ Фаза 4: UI для управления блогом

**Эпик:** AIL-309  
**Статус:** ⏳ Ожидание  
**Задачи:** AIL-247, AIL-248, AIL-249, AIL-250

### Цели

- PostList с таблицей и фильтрацией
- PostForm с Tiptap редактором
- ImageUpload компонент
- CategoryManager и TagManager

---

## 💼 Фаза 5: Управление проектами

**Эпик:** AIL-310  
**Статус:** ⏳ Ожидание  
**Задачи:** AIL-251, AIL-252

### Цели

- CRUD API для projects
- ProjectList и ProjectForm
- Multi-image upload

---

## 📤 Фаза 6: Медиа библиотека и оптимизация

**Эпик:** AIL-311  
**Статус:** ⏳ Ожидание  
**Задачи:** AIL-253, AIL-254, AIL-255, AIL-256, AIL-257

### Цели

- MediaLibrary страница
- Интеграция ISR + revalidation
- Миграция существующих статей
- Image optimization
- SEO metadata

---

## 🚀 Фаза 7: Deploy и финализация

**Эпик:** AIL-312  
**Статус:** ⏳ Ожидание  
**Задачи:** AIL-258, AIL-259, AIL-260, AIL-261

### Цели

- Тестирование на staging
- Production деплой
- GitHub Actions CI/CD
- Документация

---

## Прогресс

```
Фаза 1: [████░░░░░░] 30% (1/3 задачи)
Фаза 2: [░░░░░░░░░░]  0% (0/4 задачи)
Фаза 3: [░░░░░░░░░░]  0% (0/3 задачи)
Фаза 4: [░░░░░░░░░░]  0% (0/4 задачи)
Фаза 5: [░░░░░░░░░░]  0% (0/2 задачи)
Фаза 6: [░░░░░░░░░░]  0% (0/5 задачи)
Фаза 7: [░░░░░░░░░░]  0% (0/4 задачи)

Общий прогресс: [█░░░░░░░░░] 4% (1/25 задач)
```

---

## Следующие шаги

После завершения текущей задачи (AIL-237):

1. ✅ AIL-237: Создать Supabase проект и PostgreSQL схему
2. ⏭️ AIL-238: Настроить Storage и RLS
3. ⏭️ AIL-239: Админ пользователь и TypeScript types
4. ⏭️ AIL-240: Supabase клиенты и middleware

