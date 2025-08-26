# 🚀 Быстрый старт AIronLab Email Backend

## 📋 Пошаговая инструкция

### 1. Подготовка проекта

```bash
# Перейдите в папку Email_backend
cd Email_backend

# Установите зависимости
npm install

# Скопируйте файл переменных окружения
cp env.example .env
```

### 2. Настройка переменных окружения

Отредактируйте файл `.env`:

```env
# Настройки SMTP для рег.ру
SMTP_HOST=mail.hosting.reg.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@aironlab.ru
SMTP_PASS=ваш_пароль_от_почты

# Получатель email
EMAIL_TO=hello@aironlab.ru
EMAIL_FROM=hello@aironlab.ru

# CORS настройки
FRONTEND_URL=http://localhost:3000

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### 3. Создание GitHub репозитория

```bash
# Запустите скрипт настройки
./setup-github.sh
```

### 4. Деплой на Vercel

1. Перейдите на [Vercel](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите репозиторий `aironlab-email-backend`
5. Настройте переменные окружения в Vercel
6. Нажмите "Deploy"

### 5. Настройка поддомена

1. В настройках проекта Vercel перейдите в "Domains"
2. Добавьте домен: `api.aironlab.ru`
3. Настройте DNS на рег.ру:
   - **Имя:** `api`
   - **Значение:** `cname.vercel-dns.com`
   - **TTL:** `3600`

### 6. Тестирование

```bash
# Проверка health check
curl https://api.aironlab.ru/health

# Проверка статуса email сервиса
curl https://api.aironlab.ru/api/email/status

# Тест отправки email
curl -X POST https://api.aironlab.ru/api/email/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тест",
    "email": "test@example.com",
    "message": "Тестовое сообщение",
    "agreement": true
  }'
```

## 🔧 Обновление фронтенда

В вашем фронтенд проекте обновите `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.aironlab.ru
```

## 📖 Подробная документация

Полная инструкция находится в файле `DEPLOYMENT.md`

---

**Готово!** 🎉

Ваш бэкенд будет доступен по адресу: `https://api.aironlab.ru` 