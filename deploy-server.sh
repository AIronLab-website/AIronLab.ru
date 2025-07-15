#!/bin/bash

# Скрипт автоматического деплоя на сервер рег.ру
# Использование: ./deploy-server.sh

set -e

echo "🚀 Начинаем деплой на сервер рег.ру..."

# Переменные (настройте под ваш сервер)
SERVER_USER="your_username"           # Ваш логин SSH
SERVER_HOST="your_server.hosting.reg.ru" # Хост сервера
SERVER_PATH="/home/your_username/public_html" # Путь к папке сайта
REPO_URL="https://github.com/Santino42-gr/AIronLab---Frontend.git"

echo "📡 Подключение к серверу..."

# Команды для выполнения на сервере
SSH_COMMANDS="
cd $SERVER_PATH &&
echo '📥 Обновление кода из GitHub...' &&
git pull origin main &&
echo '📦 Установка зависимостей...' &&
npm ci &&
echo '🔨 Сборка проекта для хостинга...' &&
NEXT_PUBLIC_DEPLOY_TARGET=hosting npm run build &&
echo '📁 Копирование файлов в корень сайта...' &&
cp -r out/* . &&
echo '🧹 Очистка временных файлов...' &&
rm -rf out .next node_modules &&
echo '✅ Деплой завершен успешно!'
"

# Выполнение команд на сервере
ssh "$SERVER_USER@$SERVER_HOST" "$SSH_COMMANDS"

echo "🎉 Сайт обновлен на https://aironlab.ru" 