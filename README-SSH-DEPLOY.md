# 🚀 Автоматический деплой на рег.ру через SSH

## 📋 Пошаговая настройка

### **Шаг 1: Первоначальная настройка сервера**

1. **Подключитесь к серверу через SSH:**
```bash
ssh your_username@your_server.hosting.reg.ru
```

2. **Перейдите в папку сайта:**
```bash
cd public_html
# или cd www, или cd httpdocs (зависит от настроек хостинга)
```

3. **Клонируйте репозиторий:**
```bash
git clone https://github.com/Santino42-gr/AIronLab---Frontend.git .
```

4. **Установите Node.js** (если не установлен):
```bash
# Проверьте версию Node.js
node --version
npm --version

# Если не установлен, обратитесь в поддержку рег.ру
# для установки Node.js 18+ на хостинг
```

### **Шаг 2: Первый деплой**

1. **Установите зависимости:**
```bash
npm ci
```

2. **Соберите проект:**
```bash
NEXT_PUBLIC_DEPLOY_TARGET=hosting npm run build
```

3. **Скопируйте файлы в корень сайта:**
```bash
cp -r out/* .
```

4. **Очистите временные файлы:**
```bash
rm -rf out .next node_modules
```

### **Шаг 3: Настройка автоматического деплоя**

1. **Отредактируйте скрипт `deploy-server.sh`:**
   - Замените `your_username` на ваш логин SSH
   - Замените `your_server.hosting.reg.ru` на ваш хост
   - Проверьте путь к папке сайта

2. **Дайте права на выполнение:**
```bash
chmod +x deploy-server.sh
```

3. **Настройте SSH-ключи** (рекомендуется):
```bash
# Создайте SSH-ключ (если нет)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Скопируйте ключ на сервер
ssh-copy-id your_username@your_server.hosting.reg.ru
```

## 🔄 Процесс обновления сайта

### **Вариант A: Автоматический (через скрипт)**
```bash
./deploy-server.sh
```

### **Вариант B: Ручной (прямо на сервере)**
```bash
# Подключитесь к серверу
ssh your_username@your_server.hosting.reg.ru

# Перейдите в папку сайта
cd public_html

# Обновите код
git pull origin main

# Установите зависимости
npm ci

# Соберите проект
NEXT_PUBLIC_DEPLOY_TARGET=hosting npm run build

# Скопируйте файлы
cp -r out/* .

# Очистите временные файлы
rm -rf out .next node_modules
```

## 🛠️ Полезные команды

### **Проверка статуса на сервере:**
```bash
ssh your_username@your_server.hosting.reg.ru "cd public_html && pwd && ls -la"
```

### **Просмотр логов:**
```bash
ssh your_username@your_server.hosting.reg.ru "cd public_html && tail -f error.log"
```

### **Быстрое обновление без сборки:**
```bash
ssh your_username@your_server.hosting.reg.ru "cd public_html && git pull origin main"
```

## 🔧 Настройка .htaccess (если нужно)

Создайте файл `.htaccess` в корне сайта:
```apache
RewriteEngine On

# Перенаправление на index.html для SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.html [L]

# Кэширование статических файлов
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</FilesMatch>
```

## ⚠️ Важные моменты

1. **Убедитесь, что на сервере установлен Node.js 18+**
2. **Проверьте права доступа к папке сайта**
3. **Используйте переменную `NEXT_PUBLIC_DEPLOY_TARGET=hosting` при сборке**
4. **Не забывайте очищать временные файлы после деплоя**

## 🎯 Структура файлов на сервере

```
public_html/
├── index.html          ← Главная страница
├── 404.html           ← Страница ошибки
├── _next/             ← JS/CSS файлы Next.js
├── images/            ← Изображения
├── fonts/             ← Шрифты
├── .git/              ← Git репозиторий
├── src/               ← Исходный код (временно)
├── package.json       ← Конфигурация npm (временно)
└── next.config.mjs    ← Конфигурация Next.js (временно)
```

## 🆘 Решение проблем

### **Ошибка "node: command not found"**
Обратитесь в поддержку рег.ру для установки Node.js

### **Ошибка доступа к файлам**
Проверьте права доступа:
```bash
chmod 755 public_html
chmod 644 public_html/*
```

### **Сайт не обновляется**
Очистите кэш браузера (Ctrl+F5) или проверьте, что файлы скопированы правильно. 