# AIronLab Email Backend

Email бэкенд для обработки форм обратной связи сайта AIronLab. Сервис построен на Node.js и Express с использованием SMTP сервера рег.ру.

## 🚀 Возможности

- ✅ Отправка email через SMTP рег.ру
- ✅ Валидация данных форм с помощью Joi
- ✅ Rate limiting для защиты от спама
- ✅ Красивые HTML шаблоны email
- ✅ Логирование и обработка ошибок
- ✅ Сбор UTM параметров и метаданных
- ✅ CORS защита и безопасность
- ✅ Тестовые эндпоинты для разработки

## 📋 Требования

- Node.js >= 16.0.0
- npm или yarn
- Доступ к почтовому ящику на рег.ру
- Настроенный домен (aironlab.ru)

## ⚙️ Установка

1. **Перейдите в папку проекта:**
   ```bash
   cd Email_backend
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Настройте переменные окружения:**
   ```bash
   cp env.example .env
   ```

4. **Отредактируйте файл `.env`:**
   ```env
   # Настройки сервера
   PORT=3001
   NODE_ENV=development

   # Настройки SMTP для рег.ру
   SMTP_HOST=mail.hosting.reg.ru
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=info@aironlab.ru
   SMTP_PASS=ваш_пароль_от_почты

   # Получатель и отправитель email
   EMAIL_TO=info@aironlab.ru
   EMAIL_FROM=info@aironlab.ru

   # CORS настройки
   FRONTEND_URL=http://localhost:3000

   # Rate limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=5
   ```

## 🏃‍♂️ Запуск

### Для разработки:
```bash
npm run dev
```

### Для продакшена:
```bash
npm start
```

Сервер будет доступен по адресу: `http://localhost:3001`

## 📧 Настройка SMTP рег.ру

### 1. Создание почтового ящика

1. Зайдите в личный кабинет рег.ру
2. Перейдите в раздел "Почта на домене"
3. Создайте почтовый ящик `info@aironlab.ru`
4. Запомните пароль для настройки SMTP

### 2. Настройки SMTP

Рег.ру использует следующие настройки:

- **Сервер исходящей почты (SMTP):** `mail.hosting.reg.ru`
- **Порт:** `465` (с SSL/TLS)
- **Шифрование:** SSL/TLS
- **Аутентификация:** Да

### 3. Проверка настроек

После настройки переменных окружения можно проверить соединение:

```bash
curl http://localhost:3001/api/email/status
```

Или отправить тестовое письмо (только в development режиме):

```bash
curl http://localhost:3001/api/email/test
```

## 🛠 API Эндпоинты

### POST `/api/email/contact`

Отправка формы обратной связи.

**Тело запроса:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "phone": "+7 (999) 123-45-67",
  "message": "Здравствуйте, хочу заказать разработку сайта",
  "agreement": true,
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "ai_development"
}
```

**Ответ при успехе:**
```json
{
  "success": true,
  "message": "Заявка успешно отправлена",
  "messageId": "<abc123@mail.hosting.reg.ru>"
}
```

**Ответ при ошибке:**
```json
{
  "error": "Ошибка валидации данных",
  "message": "Email обязателен для заполнения",
  "code": "VALIDATION_ERROR"
}
```

### GET `/api/email/status`

Проверка статуса email сервиса.

**Ответ:**
```json
{
  "status": "operational",
  "smtp": {
    "connected": true,
    "host": "mail.hosting.reg.ru",
    "port": 465,
    "secure": true
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET `/api/email/test` (только development)

Отправка тестового письма для проверки настроек.

### GET `/health`

Health check сервиса.

## 🔒 Безопасность

### Rate Limiting
- **Лимит:** 5 запросов в 15 минут с одного IP
- **Настройка:** через переменные `RATE_LIMIT_WINDOW_MS` и `RATE_LIMIT_MAX_REQUESTS`

### CORS
- Разрешены запросы только с домена, указанного в `FRONTEND_URL`
- Методы: GET, POST
- Headers: Content-Type, Authorization

### Валидация данных
- Все входящие данные валидируются с помощью Joi
- Максимальная длина сообщения: 2000 символов
- Обязательное согласие на обработку данных

### Логирование
- Все запросы логируются
- Ошибки записываются с детальной информацией
- В production режиме скрываются чувствительные данные

## 🧪 Тестирование

### Ручное тестирование

1. **Запустите сервер в development режиме:**
   ```bash
   npm run dev
   ```

2. **Проверьте health check:**
   ```bash
   curl http://localhost:3001/health
   ```

3. **Проверьте статус email сервиса:**
   ```bash
   curl http://localhost:3001/api/email/status
   ```

4. **Отправьте тестовое письмо:**
   ```bash
   curl http://localhost:3001/api/email/test
   ```

5. **Отправьте тестовую форму:**
   ```bash
   curl -X POST http://localhost:3001/api/email/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Тест",
       "email": "test@example.com",
       "message": "Тестовое сообщение",
       "agreement": true
     }'
   ```

## 🔧 Настройка фронтенда

В файле фронтенда `.env.local` добавьте:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Для продакшена:
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 📝 Логи

Сервер записывает подробные логи всех операций:

- **INFO:** Общая информация о запросах и операциях
- **ERROR:** Ошибки с полным стектрейсом
- **DEBUG:** Детальная отладочная информация (только в development)
- **WARN:** Предупреждения

Примеры логов:
```
[2024-01-15T10:30:15.123Z] INFO: 🚀 Email сервер запущен на порту 3001
[2024-01-15T10:30:15.124Z] INFO: 📧 SMTP хост: mail.hosting.reg.ru
[2024-01-15T10:30:15.125Z] INFO: ✅ SMTP соединение проверено успешно
[2024-01-15T10:31:00.456Z] INFO: Получен запрос на отправку формы обратной связи
[2024-01-15T10:31:01.789Z] INFO: Email успешно отправлен: messageId=<abc123@mail.hosting.reg.ru>
```

## 🚨 Решение проблем

### Ошибка аутентификации SMTP

```
SMTP ошибка: EAUTH - Invalid login
```

**Решение:**
1. Проверьте правильность email и пароля в `.env`
2. Убедитесь, что почтовый ящик создан в панели рег.ру
3. Проверьте, что используете правильный домен

### Ошибка подключения

```
SMTP ошибка: ECONNECTION - Connection timeout
```

**Решение:**
1. Проверьте настройки хоста и порта
2. Убедитесь, что фаервол не блокирует соединения
3. Проверьте интернет-соединение сервера

### Rate limit превышен

```
Слишком много запросов с этого IP адреса
```

**Решение:**
1. Подождите 15 минут
2. Увеличьте лимиты в `.env` файле
3. Проверьте, нет ли циклических запросов

## 📈 Мониторинг

Для мониторинга работы сервиса можно использовать:

1. **Health check эндпоинт:** `/health`
2. **Status эндпоинт:** `/api/email/status`
3. **Логи сервера:** через `docker logs` или файлы логов
4. **Мониторинг SMTP:** через внешние сервисы

## 🚀 Развертывание

### Docker

Создайте `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

### PM2

```bash
npm install -g pm2
pm2 start server.js --name "aironlab-email"
pm2 save
pm2 startup
```

### Systemd

Создайте файл `/etc/systemd/system/aironlab-email.service`:

```ini
[Unit]
Description=AIronLab Email Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/Email_backend
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

## 📄 Лицензия

© 2024 AIronLab. Все права защищены.

## 🤝 Поддержка

При возникновении проблем:

1. Проверьте логи сервера
2. Убедитесь в правильности настроек `.env`
3. Протестируйте SMTP соединение
4. Обратитесь к администратору системы

---

**Контакты:**
- Email: info@aironlab.ru
- Сайт: https://aironlab.ru
- Поддержка: support@aironlab.ru 