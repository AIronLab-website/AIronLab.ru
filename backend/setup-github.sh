#!/bin/bash

# Скрипт для настройки GitHub репозитория для AIronLab Email Backend

echo "🚀 Настройка GitHub репозитория для AIronLab Email Backend"
echo "=================================================="

# Проверяем, что мы в правильной папке
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Убедитесь, что вы находитесь в папке Email_backend"
    exit 1
fi

# Проверяем наличие git
if ! command -v git &> /dev/null; then
    echo "❌ Ошибка: Git не установлен. Установите Git и попробуйте снова."
    exit 1
fi

# Запрашиваем GitHub username
read -p "Введите ваш GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Ошибка: GitHub username не может быть пустым"
    exit 1
fi

# Инициализируем git репозиторий
echo "📁 Инициализация git репозитория..."
git init

# Добавляем все файлы
echo "📦 Добавление файлов в git..."
git add .

# Создаем первый коммит
echo "💾 Создание первого коммита..."
git commit -m "Initial commit: AIronLab Email Backend"

# Добавляем удаленный репозиторий
echo "🔗 Добавление удаленного репозитория..."
git remote add origin https://github.com/$GITHUB_USERNAME/aironlab-email-backend.git

# Отправляем код на GitHub
echo "⬆️ Отправка кода на GitHub..."
git push -u origin main

echo ""
echo "✅ GitHub репозиторий успешно настроен!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Перейдите на https://vercel.com"
echo "2. Войдите через GitHub"
echo "3. Нажмите 'New Project'"
echo "4. Выберите репозиторий 'aironlab-email-backend'"
echo "5. Настройте переменные окружения"
echo "6. Нажмите 'Deploy'"
echo ""
echo "📖 Подробная инструкция находится в файле DEPLOYMENT.md" 