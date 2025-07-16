# 🎯 AIronLab Backend

Бэкенд на **Supabase** для проекта AIronLab - обработка контактных форм, блог, аутентификация.

---

## 📁 Структура проекта

```
backend/
├── api/                    # API сервисы
│   └── contact.ts         # Обработка контактных заявок
├── lib/                   # Supabase клиенты
│   ├── supabase-browser.ts # Клиент для браузера
│   └── supabase-server.ts  # Серверный клиент
├── supabase/              # Конфигурация Supabase
│   ├── config.toml        # Настройки локального Supabase
│   └── migrations/        # SQL миграции
├── types/                 # TypeScript типы
│   └── database.ts        # Типы для базы данных
├── utils/                 # Утилиты
│   └── api-helpers.ts     # Хелперы для API
└── README.md             # Этот файл
```

---

## 🚀 Быстрый старт

### **1. Настройка Supabase проекта**

1. **Создайте проект** на [supabase.com](https://supabase.com)
2. **Скопируйте credentials** из Settings > API
3. **Создайте `.env.local`** в корне проекта:

```bash
# Скопируйте из Supabase Dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### **2. Выполните миграции**

В Supabase Dashboard откройте **SQL Editor** и выполните:

```sql
-- Файл: backend/supabase/migrations/001_create_contact_requests.sql
-- Скопируйте и выполните весь SQL код
```

### **3. Проверьте работу API**

Запустите проект и протестируйте:

```bash
npm run dev

# Тест создания заявки
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тест",
    "email": "test@example.com", 
    "message": "Тестовое сообщение",
    "agreement": true
  }'
```

---

## 📋 API Endpoints

### **POST /api/contact**
Создание контактной заявки

**Тело запроса:**
```json
{
  "name": "Имя клиента",
  "email": "email@example.com",
  "phone": "+7 999 123-45-67",
  "message": "Текст сообщения",
  "agreement": true
}
```

**Ответ (201):**
```json
{
  "success": true,
  "data": { "id": "uuid" },
  "message": "Заявка успешно отправлена!"
}
```

### **GET /api/contact**
Получение заявок (только для админов)

**Query параметры:**
- `status` - фильтр по статусу (new, in_progress, completed, cancelled)
- `source` - фильтр по источнику (website, telegram, email)
- `limit` - количество заявок (по умолчанию 10)
- `offset` - смещение для пагинации

---

## 🗄️ База данных

### **Таблица `contact_requests`**

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | UUID | Уникальный ID |
| `name` | VARCHAR(100) | Имя клиента |
| `email` | VARCHAR(255) | Email |
| `phone` | VARCHAR(50) | Телефон (опционально) |
| `message` | TEXT | Сообщение |
| `status` | ENUM | new, in_progress, completed, cancelled |
| `source` | ENUM | website, telegram, email |
| `utm_source` | VARCHAR(100) | UTM метки |
| `created_at` | TIMESTAMP | Дата создания |

---

## 🔐 Безопасность

### **Row Level Security (RLS)**
- ✅ **Анонимы** могут только создавать заявки
- ✅ **Админы** могут читать/обновлять все заявки
- ✅ **Rate limiting** - 5 запросов в минуту с IP

### **Валидация данных**
- Zod схемы для всех входящих данных
- Проверка email, телефона, длины полей
- Обязательное согласие на обработку данных

---

## 🛠️ Разработка

### **Добавление новой миграции**

1. Создайте файл `backend/supabase/migrations/00X_name.sql`
2. Выполните в Supabase Dashboard
3. Обновите типы в `backend/types/database.ts`

### **Добавление нового API**

1. Создайте сервис в `backend/api/`
2. Создайте роут в `src/app/api/`
3. Добавьте валидацию и тесты

### **Обновление типов**

```bash
# Автоматическая генерация типов (требует Supabase CLI)
npx supabase gen types typescript --project-id your-project-id > backend/types/database-generated.ts
```

---

## 🔧 Переменные окружения

```bash
# Обязательные для продакшена
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Опциональные
NEXTAUTH_SECRET=your-secret
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📊 Мониторинг

- **Supabase Dashboard** - логи, метрики, производительность
- **Next.js консоль** - логи API запросов
- **Rate limiting** - защита от спама

---

## 🚨 Troubleshooting

**Ошибка: "Invalid API key"**
- Проверьте переменные в `.env.local`
- Убедитесь что используете правильный URL

**Ошибка: "Row Level Security"**
- Проверьте настройки RLS в Supabase
- Убедитесь что политики применены

**Ошибка: "Rate limit exceeded"**
- Подождите минуту и повторите
- Проверьте IP клиента

---

## 📞 Контакты

При возникновении проблем:
- Проверьте Supabase Dashboard > Logs
- Посмотрите консоль Next.js
- Свяжитесь с разработчиком 