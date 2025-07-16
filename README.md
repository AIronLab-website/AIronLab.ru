# 🚀 AIronLab - Frontend

## 📝 О проекте

Next.js веб-сайт для компании AIronLab - разработка ИИ решений и автоматизация бизнес-процессов.

**Технологии:**
- ⚡ Next.js 14
- 🎨 Tailwind CSS
- 📱 TypeScript
- 🖼️ Оптимизированные изображения

---

## 🛠️ Разработка

### Установка зависимостей
```bash
npm install
```

### Запуск dev сервера
```bash
npm run dev
```

### Сборка проекта
```bash
npm run build
```

---

## 🚀 Деплой

У проекта есть две платформы деплоя:

### 🟢 **GitHub Pages** 
- **URL:** `https://santino42-gr.github.io/AIronLab---Frontend/`
- **Конфигурация:** `next.config.mjs` (с basePath)
- **Команда:** `npm run deploy`

### 🔵 **Рег.ру хостинг** (основной)
- **URL:** `https://aironlab.ru`
- **Конфигурация:** `next.config.hosting.mjs` (без basePath)
- **Метод:** SSH деплой

---

## 📦 SSH Деплой на рег.ру

### **1. Первоначальная настройка сервера**

Подключитесь к серверу:
```bash
ssh ваш_логин@ваш_сервер.hosting.reg.ru
```

Перейдите в папку сайта и клонируйте репозиторий:
```bash
cd public_html  # или cd www, или cd httpdocs
git clone https://github.com/Santino42-gr/AIronLab---Frontend.git .
```

### **2. Проверьте Node.js** (нужен 18+)
```bash
node --version
npm --version
```

### **3. Первый деплой**
```bash
# Установка зависимостей
npm ci

# Сборка для хостинга
NEXT_PUBLIC_DEPLOY_TARGET=hosting npm run build

# Копирование файлов
cp -r out/* .

# Очистка
rm -rf out/ node_modules/ src/ .next/
```

### **4. Автоматический деплой**

Используйте скрипт `deploy-server.sh`:

1. **Настройте переменные в скрипте:**
   ```bash
   SERVER_USER="ваш_логин"
   SERVER_HOST="ваш_сервер.hosting.reg.ru"
   SERVER_PATH="/home/ваш_логин/public_html"
   ```

2. **Запустите деплой:**
   ```bash
   ./deploy-server.sh
   ```

### **5. Настройка хостинга рег.ру**

В панели управления:
- **Индексная страница:** `index.php index.html`
- **Кодировка:** UTF-8
- **PHP версия:** 8.1+

---

## 📁 Структура проекта

```
AIronLab - Frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React компоненты
│   │   ├── layout/          # Header, Footer, Logo
│   │   ├── sections/        # Секции главной страницы
│   │   └── ui/              # UI компоненты
│   └── lib/                 # Утилиты
├── public/                  # Статические файлы
│   ├── fonts/               # Шрифты Calleo
│   └── images/              # Изображения
├── next.config.mjs          # Конфиг для GitHub Pages
├── next.config.hosting.mjs  # Конфиг для рег.ру
├── deploy.sh               # Деплой на GitHub Pages
└── deploy-server.sh        # Деплой на рег.ру
```

---

## 🎨 Особенности

### Адаптивные пути к изображениям
Функция `getImagePath()` автоматически определяет правильные пути для разных платформ:

```typescript
// Для GitHub Pages: /AIronLab---Frontend/images/logo.png
// Для рег.ру: /images/logo.png
const logoPath = getImagePath("/images/logo.png");
```

### Настройка деплоя
Используется переменная `NEXT_PUBLIC_DEPLOY_TARGET`:
- `hosting` - для рег.ру (без basePath)
- не задана - для GitHub Pages (с basePath)

---

## ⚙️ Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev сервера |
| `npm run build` | Сборка проекта |
| `npm run start` | Запуск prod сервера |
| `npm run deploy` | Деплой на GitHub Pages |
| `./deploy-server.sh` | Деплой на рег.ру |

---

## 🔧 Конфигурация

### GitHub Pages
```javascript
// next.config.mjs
basePath: '/AIronLab---Frontend',
assetPrefix: '/AIronLab---Frontend',
```

### Рег.ру хостинг
```javascript
// next.config.hosting.mjs  
// basePath отсутствует
env: {
  NEXT_PUBLIC_DEPLOY_TARGET: 'hosting',
}
```

---

## 📞 Контакты

**AIronLab** - Разработка ИИ решений
- 🌐 [aironlab.ru](https://aironlab.ru)
- 📧 [info@aironlab.ru](mailto:info@aironlab.ru)
- 🔗 [GitHub](https://github.com/Santino42-gr/AIronLab---Frontend) 