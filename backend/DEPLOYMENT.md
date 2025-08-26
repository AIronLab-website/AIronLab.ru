# 🚀 Деплой AIronLab Email Backend на Vercel

## 📋 Предварительные требования

1. **GitHub аккаунт** - для хранения кода
2. **Vercel аккаунт** - для хостинга
3. **Домен на рег.ру** - для настройки SMTP
4. **Почтовый ящик** - для отправки email

## 🔧 Этап 1: Подготовка репозитория

### 1.1 Создание нового репозитория на GitHub

1. Перейдите на [GitHub](https://github.com)
2. Нажмите "New repository"
3. Назовите репозиторий: `aironlab-email-backend`
4. Сделайте его приватным (рекомендуется)
5. Не инициализируйте с README

### 1.2 Загрузка кода в GitHub

```bash
# Перейдите в папку Email_backend
cd Email_backend

# Инициализируйте git репозиторий
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit: AIronLab Email Backend"

# Добавьте удаленный репозиторий (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/aironlab-email-backend.git

# Отправьте код на GitHub
git push -u origin main
```

## 🌐 Этап 2: Деплой на Vercel

### 2.1 Подключение к Vercel

1. Перейдите на [Vercel](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите репозиторий `aironlab-email-backend`
5. Нажмите "Import"

### 2.2 Настройка переменных окружения

В настройках проекта Vercel добавьте следующие переменные:

```env
# Настройки SMTP для рег.ру
SMTP_HOST=mail.hosting.reg.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@aironlab.ru
SMTP_PASS=ваш_пароль_от_почты

# Получатель и отправитель email
EMAIL_TO=hello@aironlab.ru
EMAIL_FROM=hello@aironlab.ru

# CORS настройки (замените на ваш домен)
FRONTEND_URL=https://aironlab.ru

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5

# Режим работы
NODE_ENV=production
```

### 2.3 Деплой

1. Нажмите "Deploy"
2. Дождитесь завершения деплоя
3. Скопируйте URL вашего API (например: `https://aironlab-email-backend.vercel.app`)

## 🔗 Этап 3: Настройка поддомена

### 3.1 Создание поддомена на Vercel

1. В настройках проекта Vercel перейдите в "Domains"
2. Добавьте домен: `api.aironlab.ru`
3. Следуйте инструкциям по настройке DNS

### 3.2 Настройка DNS на рег.ру

1. Зайдите в личный кабинет рег.ру
2. Перейдите в "Домены" → ваш домен → "DNS"
3. Добавьте CNAME запись:
   - **Имя:** `api`
   - **Значение:** `cname.vercel-dns.com`
   - **TTL:** `3600`

### 3.3 Обновление CORS настроек

После настройки поддомена обновите переменную окружения:

```env
FRONTEND_URL=https://aironlab.ru
```

## 🧪 Этап 4: Тестирование

### 4.1 Проверка health check

```bash
curl https://api.aironlab.ru/health
```

Ожидаемый ответ:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "AIronLab Email Backend"
}
```

### 4.2 Проверка статуса email сервиса

```bash
curl https://api.aironlab.ru/api/email/status
```

### 4.3 Тест отправки email

```bash
curl -X POST https://api.aironlab.ru/api/email/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тест",
    "email": "test@example.com",
    "message": "Тестовое сообщение",
    "agreement": true
  }'
```

## 🔧 Этап 5: Настройка фронтенда

### 5.1 Обновление переменных окружения фронтенда

В вашем фронтенд проекте обновите `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.aironlab.ru
```

### 5.2 Обновление кода формы

Убедитесь, что форма отправляет запросы на правильный URL:

```javascript
const response = await fetch('https://api.aironlab.ru/api/email/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

## 🔒 Безопасность

### Проверка CORS

Убедитесь, что CORS настроен правильно:

```javascript
// В server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://aironlab.ru',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Rate Limiting

Проверьте, что rate limiting работает:

```bash
# Отправьте несколько запросов подряд
for i in {1..10}; do
  curl -X POST https://api.aironlab.ru/api/email/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"test","email":"test@test.com","message":"test","agreement":true}'
done
```

## 🚨 Решение проблем

### Ошибка CORS

Если получаете ошибку CORS:

1. Проверьте переменную `FRONTEND_URL` в Vercel
2. Убедитесь, что домен указан без протокола (https://)
3. Перезапустите деплой

### Ошибка SMTP

Если email не отправляется:

1. Проверьте настройки SMTP в переменных окружения
2. Убедитесь, что пароль от почты правильный
3. Проверьте статус сервиса: `https://api.aironlab.ru/api/email/status`

### Ошибка 404

Если получаете 404:

1. Проверьте файл `vercel.json`
2. Убедитесь, что `server.js` находится в корне проекта
3. Проверьте логи в Vercel Dashboard

## 📊 Мониторинг

### Vercel Analytics

1. Включите Analytics в настройках проекта
2. Отслеживайте количество запросов
3. Мониторьте ошибки

### Логи

Просматривайте логи в Vercel Dashboard:
1. Перейдите в проект
2. Выберите "Functions"
3. Нажмите на функцию для просмотра логов

## 🔄 Обновления

Для обновления кода:

```bash
# Внесите изменения в код
git add .
git commit -m "Update: описание изменений"
git push origin main

# Vercel автоматически передеплоит проект
```

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи в Vercel Dashboard
2. Убедитесь в правильности переменных окружения
3. Протестируйте API эндпоинты
4. Обратитесь к документации Vercel

---

**Готово!** 🎉

Ваш бэкенд теперь доступен по адресу: `https://api.aironlab.ru` 