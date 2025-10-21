# Структура эпиков и фаз: Админ-панель для AIronLab.ru

## Обзор проекта

Админ-панель для управления контентом сайта AIronLab.ru (блог, проекты, категории, теги) с использованием Supabase в качестве backend.

**Задачи:** AIL-237 до AIL-261 (25 задач)  
**Проект в Linear:** AIronLab Website

---

## 🏗️ ЭПИК 1: Фаза 1 - Настройка инфраструктуры Supabase

**Linear ID:** AIL-306  
**Приоритет:** High (2)  
**Лейблы:** feature, backend, devops

### Цель фазы
Настроить Supabase проект, создать схему базы данных, настроить Storage и RLS policies, создать админ пользователя и сгенерировать TypeScript типы.

### Подзадачи
- **AIL-237:** Создать Supabase проект и настроить PostgreSQL схему
- **AIL-238:** Настроить Supabase Storage buckets и RLS policies
- **AIL-239:** Создать админ пользователя и сгенерировать TypeScript types

### Результаты фазы
- ✅ Supabase проект создан и настроен
- ✅ PostgreSQL схема с таблицами для blog и projects
- ✅ Storage buckets для изображений (blog-images, project-images, temp-uploads)
- ✅ RLS policies для безопасности (public read, admin full access)
- ✅ TypeScript types сгенерированы
- ✅ Админ пользователь создан (admin@aironlab.ru)

### Техстек
- Supabase (PostgreSQL, Storage, Auth, RLS)
- TypeScript types generation
- SQL migrations

---

## 🔐 ЭПИК 2: Фаза 2 - Аутентификация и структура админки

**Приоритет:** High (2)  
**Лейблы:** feature, frontend, fullstack

### Цель фазы
Реализовать аутентификацию через Supabase Auth, создать защищенный layout админ-панели с навигацией и dashboard.

### Подзадачи
- **AIL-240:** Установить Supabase клиенты и настроить middleware
- **AIL-241:** Создать страницу логина и реализовать auth flow
- **AIL-242:** Создать AdminLayout с sidebar и навигацией
- **AIL-243:** Реализовать Dashboard страницу со статистикой

### Результаты фазы
- ✅ Middleware защищает `/admin` роуты
- ✅ Страница логина с формой аутентификации
- ✅ AdminLayout с sidebar и навигацией
- ✅ Dashboard с реальной статистикой из Supabase
- ✅ Logout функционал

### Техстек
- Next.js App Router
- Supabase Auth (middleware, session management)
- shadcn/ui компоненты
- React Hook Form

---

## 🔌 ЭПИК 3: Фаза 3 - Backend API для блога

**Приоритет:** High (2)  
**Лейблы:** feature, backend

### Цель фазы
Создать REST API для CRUD операций с постами, категориями, тегами и загрузки изображений. Добавить валидацию и тестирование.

### Подзадачи
- **AIL-244:** Создать API routes для blog posts (CRUD)
- **AIL-245:** Создать API routes для categories, tags и upload images
- **AIL-246:** Добавить Zod валидацию и тестирование API

### Результаты фазы
- ✅ API endpoints для постов (GET, POST, PUT, DELETE)
- ✅ API endpoints для categories и tags
- ✅ API endpoint для загрузки изображений в Supabase Storage
- ✅ Zod schemas для валидации
- ✅ Helper функции (generateSlug, calculateReadTime, validateImageFile)
- ✅ Все endpoints протестированы

### Техстек
- Next.js API Routes (App Router)
- Zod validation
- Supabase Client (server-side)
- TypeScript

---

## ✏️ ЭПИК 4: Фаза 4 - UI для управления блогом

**Приоритет:** High (2)  
**Лейблы:** feature, frontend

### Цель фазы
Создать полнофункциональный интерфейс для управления блогом: список постов, форму создания/редактирования с Rich Text редактором, загрузку изображений, управление категориями и тегами.

### Подзадачи
- **AIL-247:** Создать PostList с таблицей и фильтрацией
- **AIL-248:** Реализовать PostForm с Rich Text Editor (Tiptap)
- **AIL-249:** Создать ImageUpload компонент с drag & drop
- **AIL-250:** Реализовать CategoryManager и TagManager

### Результаты фазы
- ✅ Таблица постов с фильтрами и поиском
- ✅ Форма создания/редактирования постов
- ✅ Tiptap Rich Text Editor с полным функционалом
- ✅ ImageUpload компонент с drag & drop
- ✅ Управление категориями (CRUD)
- ✅ Управление тегами (CRUD)
- ✅ Auto-save drafts

### Техстек
- React + Next.js (Client Components)
- Tiptap Rich Text Editor
- @tanstack/react-table
- react-dropzone
- React Hook Form + Zod
- shadcn/ui компоненты (Table, Dialog, Input, Button)

---

## 💼 ЭПИК 5: Фаза 5 - Управление проектами

**Приоритет:** High (2)  
**Лейблы:** feature, fullstack

### Цель фазы
Создать API и UI для управления проектами/кейсами с динамическими полями для results и technologies.

### Подзадачи
- **AIL-251:** Создать API routes для projects (CRUD)
- **AIL-252:** Реализовать ProjectList и ProjectForm
- **AIL-253:** Добавить динамические поля для results и technologies

### Результаты фазы
- ✅ API endpoints для проектов (GET, POST, PUT, DELETE)
- ✅ Таблица проектов с фильтрами
- ✅ Форма создания/редактирования проектов
- ✅ Динамические поля для results (metric, value, improvement)
- ✅ Tags input для technologies
- ✅ Валидация структуры данных
- ✅ Preview карточки проекта

### Техстек
- Next.js API Routes
- React Hook Form (useFieldArray для динамических полей)
- Zod validation
- JSONB для results
- TEXT[] для technologies

---

## 🔄 ЭПИК 6: Фаза 6 - Интеграция с публичным сайтом

**Приоритет:** High (2)  
**Лейблы:** feature, frontend

### Цель фазы
Заменить mock данные на реальные данные из Supabase в публичных секциях сайта (BlogSection, ProjectsSection). Настроить ISR и revalidation для оптимальной производительности.

### Подзадачи
- **AIL-254:** Заменить mock данные на Supabase в BlogSection
- **AIL-255:** Заменить mock данные на Supabase в ProjectsSection
- **AIL-256:** Настроить ISR и revalidation для blog страниц

### Результаты фазы
- ✅ BlogSection использует Supabase вместо mockBlogData.ts
- ✅ ProjectsSection использует Supabase вместо hardcoded данных
- ✅ ISR настроен (revalidate: 60 секунд)
- ✅ On-Demand Revalidation после публикации/изменения контента
- ✅ generateStaticParams для популярных постов
- ✅ Mock файлы удалены

### Техстек
- Next.js ISR (Incremental Static Regeneration)
- Supabase Server Client
- revalidatePath / revalidateTag
- generateStaticParams

---

## 🚀 ЭПИК 7: Фаза 7 - Финализация и деплой на production

**Приоритет:** High (2)  
**Лейблы:** feature, qa, devops

### Цель фазы
Заполнить базу данных начальными данными, провести комплексное тестирование, исправить баги, оптимизировать производительность и задеплоить на production с настройкой CI/CD.

### Подзадачи
- **AIL-257:** Создать seeding скрипт и перенести существующие данные
- **AIL-258:** Тестирование всех CRUD операций и auth flow
- **AIL-259:** Исправление багов и оптимизация производительности
- **AIL-260:** Настроить environment variables и задеплоить на production
- **AIL-261:** Настроить GitHub Actions для автоматического деплоя

### Результаты фазы
- ✅ База данных заполнена начальными данными (categories, tags, автор, 7 проектов)
- ✅ Все CRUD операции протестированы
- ✅ Auth flow работает корректно
- ✅ Баги исправлены
- ✅ Performance оптимизирован (bundle size, database indexes, lazy loading)
- ✅ Environment variables настроены на production
- ✅ Админ-панель задеплоена на https://aironlab.ru/admin
- ✅ GitHub Actions настроен для автоматического деплоя при push в main

### Техстек
- Seeding script (TypeScript)
- Docker Compose
- GitHub Actions (CI/CD)
- VPS (45.144.220.239)

---

## Общая статистика

**Всего задач:** 25  
**Фазы/Эпики:** 7  
**Средняя сложность фазы:** 3-4 задачи

### Распределение по типам
- **Backend API:** 4 задачи (244, 245, 246, 251)
- **Frontend UI:** 8 задач (240, 241, 242, 243, 247, 248, 249, 250, 252, 253)
- **Infrastructure/DevOps:** 5 задач (237, 238, 239, 260, 261)
- **Integration:** 3 задачи (254, 255, 256)
- **Testing/QA:** 2 задачи (258, 259)
- **Data:** 1 задача (257)

### Зависимости между фазами

```
Фаза 1 (Supabase Setup)
   ↓
Фаза 2 (Auth & Admin Layout)
   ↓
Фаза 3 (Blog API) ←→ Фаза 5 (Projects API)
   ↓                      ↓
Фаза 4 (Blog UI)   Фаза 5 (Projects UI)
   ↓                      ↓
Фаза 6 (Integration)
   ↓
Фаза 7 (Testing & Deploy)
```

### Рекомендуемый порядок выполнения

1. **Начать с Фазы 1** - без Supabase ничего не работает
2. **Затем Фаза 2** - нужна аутентификация для доступа к админке
3. **Параллельно Фаза 3 и Фаза 5** - можно делать одновременно (Blog API и Projects API независимы)
4. **После API: Фаза 4** - UI для блога (зависит от Blog API)
5. **Фаза 6** - интеграция с публичным сайтом
6. **Финиш: Фаза 7** - тестирование и деплой

---

## Ключевые технологии проекта

### Backend
- **Supabase:** PostgreSQL, Storage, Auth, Row Level Security
- **Next.js API Routes:** REST API endpoints
- **Zod:** Валидация данных
- **TypeScript:** Строгая типизация

### Frontend
- **Next.js 14+:** App Router, Server Components, ISR
- **React:** Client Components для интерактивных UI
- **Tiptap:** Rich Text Editor
- **shadcn/ui:** UI компоненты (Table, Dialog, Input, Button, etc.)
- **React Hook Form:** Управление формами
- **@tanstack/react-table:** Таблицы с фильтрацией
- **react-dropzone:** Drag & drop для файлов

### DevOps
- **Docker Compose:** Контейнеризация
- **GitHub Actions:** CI/CD пайплайн
- **VPS:** 45.144.220.239

---

## Дополнительные материалы

- **SQL Schema:** См. задачу AIL-237
- **RLS Policies:** См. задачу AIL-238
- **API Documentation:** См. задачи AIL-244, AIL-245, AIL-251
- **UI Components:** См. задачи AIL-247 - AIL-253

---

*Создано: 21 октября 2025*  
*Проект: AIronLab Website*  
*Ответственный: Александр Гребенщиков*

