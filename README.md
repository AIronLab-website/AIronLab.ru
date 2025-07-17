# 🚀 AIronLab - Frontend

## 📝 О проекте

Next.js веб-сайт для компании AIronLab - разработка ИИ решений и автоматизация бизнес-процессов.

**Технологии:**
- ⚡ Next.js 14 
- 🎨 Tailwind CSS
- 📱 TypeScript
- 🖼️ Оптимизированные изображения Vercel
- 💾 Supabase (Backend API)

---

## 🛠️ Разработка

### Установка зависимостей
```bash
npm install
```

### Запуск dev сервера
```bash
npm run dev
```

### Сборка проекта
```bash
npm run build
```

---

## 🚀 Деплой

Проект автоматически деплоится на **Vercel** при push в main ветку.

- **URL:** `https://aironlab.ru`
- **Платформа:** Vercel
- **Автодеплой:** Из GitHub репозитория

---

## 📁 Структура проекта

```
AIronLab - Frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React компоненты
│   │   ├── layout/          # Header, Footer, Logo
│   │   ├── sections/        # Секции главной страницы
│   │   └── ui/              # UI компоненты
│   └── lib/                 # Утилиты и Supabase клиенты
├── backend/                 # Supabase конфигурация
│   ├── supabase/           # Миграции и типы
│   ├── api/                # API сервисы
│   └── types/              # TypeScript типы БД
├── public/                 # Статические файлы
│   ├── fonts/              # Шрифты Calleo
│   └── images/             # Изображения
└── next.config.mjs         # Конфигурация Next.js
```

---

## 🎨 Особенности

### Бэкенд на Supabase
- **База данных:** PostgreSQL
- **API:** REST и GraphQL
- **Аутентификация:** Supabase Auth
- **Реальное время:** Websockets
- **Edge Functions:** Serverless функции

### Форма обратной связи
Полностью интегрирована с Supabase:
- Валидация через Zod
- Rate limiting
- UTM отслеживание
- Обработка ошибок

### Адаптивный дизайн
- Glass morphism эффекты
- Smooth анимации
- Gradients и shadows
- Mobile-first подход

---

## ⚙️ Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev сервера |
| `npm run build` | Сборка проекта |
| `npm run start` | Запуск prod сервера |
| `npm run lint` | Линтинг кода |

---

## 🔧 Переменные окружения

Создайте файл `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=ваш_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_anon_key
SUPABASE_SERVICE_ROLE_KEY=ваш_service_role_key

# Опциональные
NEXT_PUBLIC_APP_URL=https://aironlab.ru
```

---

## 📞 Контакты

**AIronLab** - Разработка ИИ решений
- 🌐 [aironlab.ru](https://aironlab.ru)
- 📧 [info@aironlab.ru](mailto:info@aironlab.ru)
- 📱 [Telegram](https://t.me/Aironlab)
- 📸 [Instagram](https://www.instagram.com/_grebenshikov_/)
- 🔗 [GitHub](https://github.com/Santino42-gr/AIronLab---Frontend) 