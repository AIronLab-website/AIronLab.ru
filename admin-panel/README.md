# 🎯 AIronLab Admin Panel

Полнофункциональная админ-панель для управления контентом сайта AIronLab.ru.

## 📋 Обзор

Админ-панель позволяет управлять:
- 📝 **Блог** - статьи, категории, теги, авторы
- 💼 **Проекты** - портфолио и кейсы
- 📤 **Медиа** - изображения и файлы
- 👥 **Авторы** - управление авторами статей

## 🏗️ Архитектура

### Tech Stack

**Frontend:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Shadcn UI (@aceternity, @kokonutui, @reui)
- React Hook Form + Zod
- Tiptap (Rich Text Editor)
- TanStack Table

**Backend:**
- Supabase (PostgreSQL)
- Supabase Auth (аутентификация)
- Supabase Storage (медиа файлы)
- Row Level Security (RLS)

**DevOps:**
- Docker Compose
- GitHub Actions (CI/CD)
- Vercel/VPS deployment

## 📁 Структура проекта

```
admin-panel/
├── README.md                    # Этот файл
├── docs/                        # Документация
│   ├── PHASES.md               # Описание фаз разработки
│   └── ARCHITECTURE.md         # Архитектура системы
├── supabase/                   # Supabase конфигурация
│   ├── README.md              # Документация Supabase
│   ├── SETUP.md               # Инструкция по настройке
│   └── migrations/            # SQL миграции
│       └── 001_initial_schema.sql
└── frontend/                   # Frontend код (будет в /frontend/src/app/admin/)
    └── (админка будет в основном frontend проекте)
```

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- npm или pnpm
- Аккаунт Supabase
- Git

### Шаг 1: Клонирование и установка

```bash
# Переключиться на ветку админ-панели
git checkout feature/admin-panel

# Установить зависимости frontend
cd frontend
npm install
```

### Шаг 2: Настройка Supabase

Следуйте подробной инструкции: [supabase/SETUP.md](./supabase/SETUP.md)

Кратко:
1. Создайте проект на [supabase.com](https://supabase.com)
2. Примените SQL миграцию из `supabase/migrations/001_initial_schema.sql`
3. Скопируйте credentials в `.env.local`

### Шаг 3: Настройка переменных окружения

```bash
# В директории frontend/
cp .env.example .env.local
```

Заполните `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Шаг 4: Запуск development сервера

```bash
cd frontend
npm run dev
```

Админка будет доступна по адресу: `http://localhost:3000/admin`

## 📖 Документация

### Основные документы

- [Настройка Supabase](./supabase/SETUP.md) - AIL-237: пошаговая инструкция
- [Структура БД](./supabase/README.md) - схема базы данных
- [Фазы разработки](./docs/PHASES.md) - план разработки по фазам
- [AIL-238 Summary](./docs/AIL-238-SUMMARY.md) - итоговый отчет по Storage и RLS

### AIL-238: Storage и RLS (Готово к выполнению)

- 🚀 [Быстрый старт (10 мин)](./supabase/QUICK_START_238.md)
- 📖 [Детальная инструкция](./supabase/STORAGE_SETUP.md)
- 🗂️ [Структура Storage](./supabase/STORAGE_STRUCTURE.md)
- ✅ [Чек-лист](./supabase/AIL-238-CHECKLIST.md)
- 🔍 [SQL проверки](./supabase/VERIFICATION_QUERIES.sql)

### Linear задачи

Все задачи по админ-панели: **AIL-237 до AIL-261** (25 задач)

**Эпики (Фазы):**
1. ✅ Фаза 1: Настройка Supabase (AIL-306)
2. 🔄 Фаза 2: Аутентификация (AIL-307)
3. ⏳ Фаза 3: API Routes (AIL-308)
4. ⏳ Фаза 4: UI управления блогом (AIL-309)
5. ⏳ Фаза 5: Управление проектами (AIL-310)
6. ⏳ Фаза 6: Медиа и оптимизация (AIL-311)
7. ⏳ Фаза 7: Deploy и финализация (AIL-312)

Детальная структура: `/docs/admin-panel-epics-structure.md`

## 🎨 Дизайн-система

Вся админка использует компоненты из **Shadcn UI регистров**:

- [@aceternity](https://ui.aceternity.com/registry/) - анимации, эффекты
- [@kokonutui](https://kokonutui.com/r/) - основные UI компоненты
- [@reui](https://reui.io/r/) - дополнительные элементы

### Принципы дизайна

- ✨ Современный и минималистичный
- 🎭 Плавные анимации и transitions
- 📱 Полностью responsive
- ♿ Accessibility-first
- 🎨 Единая визуальная система

## 🔐 Аутентификация

Админка защищена аутентификацией через **Supabase Auth**.

**Доступ:**
- Email/Password аутентификация
- Row Level Security (RLS) policies
- Middleware для защиты роутов

**Создание админ пользователя** - см. задачу AIL-239

## 🗄️ База данных

### Основные таблицы

| Таблица | Описание |
|---------|----------|
| `blog_authors` | Авторы статей |
| `blog_categories` | Категории блога |
| `blog_tags` | Теги |
| `blog_posts` | Статьи блога |
| `blog_post_tags` | Связь постов и тегов |
| `projects` | Портфолио проектов |

### Возможности

- ✅ Автоматические timestamps (created_at, updated_at)
- ✅ Индексы для производительности
- ✅ Helper функции (generate_slug)
- ✅ Views для удобных запросов
- ✅ RLS для безопасности

## 📤 Storage

### Buckets (AIL-238)

| Bucket | Visibility | Size | MIME Types |
|--------|-----------|------|------------|
| `blog-images` | 🌍 Public | 5 MB | image/* |
| `project-images` | 🌍 Public | 5 MB | image/* |
| `temp-uploads` | 🔒 Private | 10 MB | image/*, video/*, pdf |

**Возможности:**
- ✅ RLS policies (публичное чтение, админ загрузка)
- ✅ MIME type validation
- ✅ File size limits
- 🔄 Drag & drop загрузка (будет в Phase 4)
- 🔄 Автоматическая оптимизация (будет в Phase 6)
- ✅ CDN через Supabase

📖 Подробнее: [Storage Structure](./supabase/STORAGE_STRUCTURE.md)

## 🧪 Разработка

### Структура кода (frontend)

```
frontend/src/
├── app/
│   └── admin/              # Админ панель
│       ├── layout.tsx      # Layout с sidebar
│       ├── page.tsx        # Dashboard
│       ├── login/          # Страница логина
│       ├── blog/           # Управление блогом
│       │   ├── posts/
│       │   ├── categories/
│       │   └── tags/
│       ├── projects/       # Управление проектами
│       └── media/          # Медиа библиотека
├── components/
│   └── admin/              # Компоненты админки
│       ├── auth/
│       ├── layout/
│       ├── blog/
│       ├── projects/
│       └── shared/
├── lib/
│   ├── supabase/          # Supabase клиенты
│   └── admin/             # Утилиты админки
└── types/
    └── supabase.ts        # Сгенерированные типы
```

### Команды

```bash
# Development
npm run dev

# Build
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Generate Supabase types
npm run supabase:types
```

## 🚀 Деплой

### Development

```bash
git push origin feature/admin-panel
```

### Production

После завершения разработки:

```bash
# Merge в main
git checkout main
git merge feature/admin-panel
git push origin main

# Автоматический деплой через GitHub Actions
```

## 📊 Прогресс разработки

### Фаза 1: Настройка Supabase
- [x] ✅ **AIL-237**: Создать Supabase проект и настроить PostgreSQL схему
- [x] ✅ **AIL-238**: Настроить Storage buckets и RLS policies
- [x] 📝 **AIL-239**: Создать админ пользователя и TypeScript types (Документация готова)

### Следующие фазы
- [ ] 🔄 Фаза 2: Аутентификация (AIL-240, 241, 242, 243)
- [ ] ⏳ Фаза 3: API Routes (AIL-244, 245, 246)
- [ ] ⏳ Фаза 4: UI блога (AIL-247, 248, 249, 250)
- [ ] ⏳ Фаза 5: Проекты (AIL-251, 252)
- [ ] ⏳ Фаза 6: Медиа и оптимизация (AIL-253, 254, 255, 256, 257)
- [ ] ⏳ Фаза 7: Deploy (AIL-258, 259, 260, 261)

Детальный трекинг: [Linear - AIronLab Admin Panel](https://linear.app/aironlab)

## 🆘 Troubleshooting

### Проблемы с Supabase подключением

```bash
# Проверьте .env.local
cat frontend/.env.local

# Проверьте credentials в Supabase Dashboard
```

### Проблемы с типами TypeScript

```bash
# Регенерируйте типы
npm run supabase:types
```

### Проблемы с аутентификацией

1. Проверьте, что admin пользователь создан
2. Проверьте RLS policies в Supabase
3. Проверьте middleware настройки

## 📞 Контакты и поддержка

- **Проект в Linear:** [AIronLab Website](https://linear.app/aironlab)
- **Ветка:** `feature/admin-panel`
- **Документация:** `/docs/admin-panel-epics-structure.md`

## 📝 License

Проприетарный код для AIronLab.ru

