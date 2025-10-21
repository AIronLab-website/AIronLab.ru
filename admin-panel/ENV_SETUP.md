# Настройка переменных окружения

## Frontend (.env.local)

Создайте файл `frontend/.env.local` со следующими переменными:

```bash
# ============================================
# Supabase Configuration
# ============================================

# Project URL (из Supabase Dashboard → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Anon (public) key - для frontend (безопасно использовать в браузере)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service Role key - для backend/Server Components (⚠️ ДЕРЖИТЕ В СЕКРЕТЕ!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================
# Email Configuration (существующие настройки)
# ============================================
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## Как получить Supabase credentials

1. Откройте ваш проект на [https://supabase.com](https://supabase.com)
2. Перейдите в **Settings → API**
3. Скопируйте:
   - **Project URL**
   - **anon / public** key (для NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **service_role** key (для SUPABASE_SERVICE_ROLE_KEY)

## Безопасность

⚠️ **ВАЖНО:**

- Добавьте `.env.local` в `.gitignore`
- **Никогда не коммитьте** файлы с реальными credentials
- **Service Role key** дает полный доступ к БД - храните его в безопасности!
- Не используйте Service Role key на фронтенде
- Для production используйте переменные окружения на сервере

## Проверка настройки

После настройки переменных проверьте подключение:

```bash
cd frontend
npm run dev
```

В консоли браузера не должно быть ошибок подключения к Supabase.

## Production

Для production добавьте переменные окружения в:

- **Vercel:** Settings → Environment Variables
- **VPS:** Через Docker Compose или systemd environment файлы

```bash
# docker-compose.yml
environment:
  - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
  - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
  - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
```

