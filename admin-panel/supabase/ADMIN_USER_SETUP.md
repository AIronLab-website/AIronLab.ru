# 👤 Создание Админ Пользователя в Supabase

> **Задача:** AIL-239 - Создать админ пользователя для доступа к админ-панели

---

## 📋 Обзор

Создадим первого администратора с email `admin@aironlab.ru` для доступа к админ-панели.

**Время выполнения:** ~3 минуты

---

## 🚀 Метод 1: Через Supabase Dashboard (Рекомендуется)

### Шаг 1: Откройте Authentication

1. Перейдите на [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Выберите проект **AIronLab Production**
3. В левом меню: **Authentication** → **Users**

### Шаг 2: Создайте пользователя

1. Нажмите кнопку **"Add user"** (или **"Invite"**)
2. Выберите **"Create new user"**

### Шаг 3: Заполните данные

```
Email: admin@aironlab.ru
Password: [Создайте надежный пароль]
```

**Рекомендации для пароля:**
- Минимум 8 символов
- Буквы верхнего и нижнего регистра
- Цифры
- Специальные символы

**Пример надежного пароля:**
```
Aironlab2025!Admin
```

⚠️ **ВАЖНО:** Сохраните пароль в надежном месте (1Password, LastPass и т.д.)

### Шаг 4: Подтверждение (опционально)

Если у вас включена email verification:

**Вариант A: Отключить email verification (для dev)**
1. **Authentication** → **Settings**
2. **Email Auth** → Отключите **"Enable email confirmations"**
3. Пользователь будет создан сразу как активный

**Вариант B: Вручную подтвердить email**
1. После создания пользователя найдите его в списке
2. Нажмите на email
3. В деталях пользователя: **"Confirm email"**

### Шаг 5: Проверка

1. В списке Users должен появиться `admin@aironlab.ru`
2. Статус: **"Confirmed"** (зеленый)
3. Запомните **User ID** (UUID) - он понадобится позже

---

## 🔐 Метод 2: Через SQL (Альтернатива)

Если нужно создать пользователя программно:

### Через SQL Editor

```sql
-- Создать админ пользователя
-- Замените 'your-secure-password' на реальный пароль
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@aironlab.ru',
  crypt('your-secure-password', gen_salt('bf')), -- Замените пароль!
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"AIronLab Admin"}',
  false,
  '',
  ''
);
```

⚠️ **Внимание:** Этот метод сложнее и может привести к ошибкам. Используйте Метод 1 (Dashboard).

---

## ✅ Проверка создания

### Проверка 1: User существует

```sql
-- Проверить пользователя
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  raw_user_meta_data
FROM auth.users
WHERE email = 'admin@aironlab.ru';
```

Должна вернуться одна строка с вашим пользователем.

### Проверка 2: Тестовый логин

**Через Supabase JS (в браузере или Node.js):**

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
)

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@aironlab.ru',
  password: 'your-password'
})

if (error) {
  console.error('Login failed:', error.message)
} else {
  console.log('✅ Login successful!', data.user.email)
}
```

---

## 🔧 Настройка метаданных (Опционально)

### Добавить дополнительные данные

Можно добавить метаданные пользователя для отображения в админке:

```sql
-- Обновить метаданные
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  raw_user_meta_data,
  '{name}',
  '"AIronLab Admin"'
)
WHERE email = 'admin@aironlab.ru';

-- Добавить роль (если нужно)
UPDATE auth.users
SET raw_app_meta_data = jsonb_set(
  raw_app_meta_data,
  '{role}',
  '"admin"'
)
WHERE email = 'admin@aironlab.ru';
```

### Проверить метаданные

```sql
SELECT 
  email,
  raw_user_meta_data->>'name' as name,
  raw_app_meta_data->>'role' as role
FROM auth.users
WHERE email = 'admin@aironlab.ru';
```

Ожидаемый результат:
```
email                 | name            | role
----------------------|-----------------|-------
admin@aironlab.ru     | AIronLab Admin  | admin
```

---

## 👥 Создание дополнительных админов (в будущем)

### Через Dashboard
Повторите Метод 1 с другим email (например, `sasha@aironlab.ru`)

### Через SQL
```sql
-- Пример для второго админа
INSERT INTO auth.users (...)
VALUES (..., 'sasha@aironlab.ru', ...);
```

---

## 🔐 Безопасность

### ✅ Что уже настроено

- RLS policies разрешают доступ только authenticated users
- Email/Password authentication включен
- Пароли хэшируются через bcrypt

### 🔄 Рекомендации на будущее

#### 1. Включить 2FA (Two-Factor Authentication)
```
Authentication → Settings → Enable MFA
```

#### 2. Настроить Email Templates
```
Authentication → Email Templates
```
Кастомизировать письма:
- Confirmation email
- Reset password
- Magic link

#### 3. Session Duration
```
Authentication → Settings → Session Duration
```
Рекомендуется: 7 дней (604800 секунд)

#### 4. Password Requirements
```
Authentication → Settings → Password Requirements
```
- Minimum length: 8
- Require uppercase
- Require numbers
- Require special characters

---

## 🆘 Troubleshooting

### Проблема: "User already exists"

**Решение:**
```sql
-- Удалить существующего пользователя
DELETE FROM auth.users WHERE email = 'admin@aironlab.ru';

-- Создать заново
```

### Проблема: "Email not confirmed"

**Решение A (через UI):**
1. Users → найти пользователя
2. Нажать на email → **"Confirm email"**

**Решение B (через SQL):**
```sql
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'admin@aironlab.ru';
```

### Проблема: "Invalid login credentials"

**Возможные причины:**
1. Неправильный пароль
2. Email не подтвержден
3. Пользователь не существует

**Проверка:**
```sql
-- Проверить статус пользователя
SELECT 
  email,
  email_confirmed_at,
  banned_until,
  deleted_at
FROM auth.users
WHERE email = 'admin@aironlab.ru';
```

### Проблема: "User is banned"

**Решение:**
```sql
UPDATE auth.users
SET banned_until = NULL
WHERE email = 'admin@aironlab.ru';
```

---

## 📝 Сохранение credentials

### Для локальной разработки

Создайте файл `.env.local` (уже должен существовать):

```bash
# Admin credentials (НЕ коммитить в git!)
ADMIN_EMAIL=admin@aironlab.ru
ADMIN_PASSWORD=your-password-here
```

⚠️ **ВАЖНО:** Убедитесь, что `.env.local` в `.gitignore`!

### Для production

Используйте менеджер паролей:
- 1Password
- LastPass
- Bitwarden
- Keepass

**Не храните пароли в:**
- Git репозитории
- Незашифрованные файлы
- Slack/Telegram сообщения
- Email

---

## 🎯 Следующие шаги

После создания админ пользователя:

1. ✅ Пользователь создан и подтвержден
2. ⏭️ Сгенерировать TypeScript types (следующая часть AIL-239)
3. ⏭️ Настроить Supabase клиенты в frontend
4. ⏭️ Создать страницу логина (AIL-241)

---

## 📚 Полезные ссылки

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Managing Users](https://supabase.com/docs/guides/auth/managing-user-data)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Задача:** AIL-239 (часть 1/3)  
**Создано:** 2025-10-21  
**Время выполнения:** ~3 минуты

