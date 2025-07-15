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

echo "🔨 Собираем проект..."
npm run build

echo "🌿 Создаем/обновляем ветку deploy..."

# Удаляем локальную deploy ветку если существует
git branch -D deploy 2>/dev/null || true

# Создаем новую deploy ветку
git checkout -b deploy

# Удаляем все файлы кроме .git
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

# Копируем собранные файлы из out в корень
cp -r out/* .
cp out/.htaccess . 2>/dev/null || true

# Создаем .gitignore для deploy ветки
cat > .gitignore << 'EOF'
# Минимальный .gitignore для deploy ветки
.DS_Store
Thumbs.db
EOF

echo "📝 Коммитим deploy файлы..."
git add .
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

echo "📤 Пушим в GitHub..."
git push origin deploy --force

echo "🔄 Возвращаемся на main ветку..."
git checkout main

echo "✅ Деплой завершен!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Зайдите на ваш хостинг рег.ру по SSH"
echo "2. Перейдите в корневую папку сайта: cd public_html"
echo "3. Клонируйте deploy ветку: git clone -b deploy https://github.com/ВАШ_USERNAME/ВАШ_РЕПО.git ."
echo "4. Для обновлений: git pull origin deploy"
echo ""
echo "🌐 Ваш сайт будет доступен по адресу вашего домена!" 