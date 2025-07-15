#!/bin/bash

# Скрипт деплоя для рег.ру хостинга
# Использование: ./deploy.sh

set -e

echo "🚀 Начинаем деплой на рег.ру..."

# Проверяем что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Запустите скрипт из корня проекта"
    exit 1
fi

# Проверяем что все изменения закоммичены
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Ошибка: есть незакоммиченные изменения. Сначала закоммитьте их"
    git status --short
    exit 1
fi

echo "📦 Устанавливаем зависимости..."
npm ci

echo "🔧 Переключаемся на конфигурацию для рег.ру хостинга..."
# Временно заменяем конфигурацию
cp next.config.mjs next.config.backup.mjs
cp next.config.hosting.mjs next.config.mjs

echo "🔨 Собираем проект..."
npm run build

echo "🔄 Восстанавливаем оригинальную конфигурацию..."
mv next.config.backup.mjs next.config.mjs

# Проверяем что папка out создалась
if [ ! -d "out" ]; then
    echo "❌ Ошибка: папка out не найдена после сборки"
    exit 1
fi

echo "📁 Копируем файлы во временную папку..."
# Создаем временную папку для файлов
TEMP_DIR=$(mktemp -d)
cp -r out/* "$TEMP_DIR/"

echo "🌿 Создаем/обновляем ветку deploy..."

# Удаляем локальную deploy ветку если существует
git branch -D deploy 2>/dev/null || true

# Создаем новую deploy ветку
git checkout -b deploy

# ВАЖНО: проверяем что мы в deploy ветке перед удалением файлов!
current_branch=$(git branch --show-current)
if [ "$current_branch" != "deploy" ]; then
    echo "❌ Ошибка: не удалось переключиться на deploy ветку!"
    exit 1
fi

echo "🗑️ Очищаем deploy ветку..."
# Удаляем все файлы кроме .git
find . -maxdepth 1 -not -name '.git' -not -name '.' -exec rm -rf {} +

echo "📂 Копируем статические файлы..."
# Копируем файлы из временной папки
cp -r "$TEMP_DIR"/* .

# Удаляем временную папку
rm -rf "$TEMP_DIR"

echo "📝 Коммитим deploy файлы..."
git add .
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

echo "📤 Пушим в GitHub..."
git push -f origin deploy

echo "🔄 Возвращаемся на main ветку..."
git checkout main

echo "✅ Деплой завершен!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Зайдите на ваш хостинг рег.ру по SSH"
echo "2. Перейдите в корневую папку сайта: cd public_html"
echo "3. Клонируйте deploy ветку:"
echo "   git clone -b deploy https://github.com/Santino42-gr/AIronLab---Frontend.git ."
echo "4. Для обновлений: git pull origin deploy"
echo ""
echo "🌐 Ваш сайт будет доступен по адресу вашего домена!" 