# Настройка Sentry для AIRONLab Frontend

## Шаги настройки:

### 1. Создайте файл .env.local в корне проекта frontend/
```bash
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=aironlab
SENTRY_PROJECT=aironlab-front
SENTRY_AUTH_TOKEN=your-auth-token-here
```

### 2. Получите DSN из Sentry Dashboard:
1. Зайдите в проект `aironlab-front` в Sentry
2. Перейдите в Settings → Client Keys (DSN)
3. Скопируйте DSN и вставьте в переменные окружения

### 3. Тестирование:
1. Запустите проект: `npm run dev`
2. Перейдите на `/sentry-example-page`
3. Нажмите кнопки для тестирования ошибок
4. Проверьте дашборд Sentry на наличие событий

### 4. Проверка конфигурации:
- ✅ `@sentry/nextjs` установлен
- ✅ Конфигурационные файлы созданы:
  - `sentry.client.config.ts`
  - `sentry.server.config.ts` 
  - `sentry.edge.config.ts`
- ✅ `next.config.mjs` обновлен
- ✅ Тестовая страница создана

### 5. Production настройки:
- ✅ `tracesSampleRate: 0.1` для production (автоматически)
- ✅ `debug: false` для production (автоматически)
- ✅ Конфигурация готова к production

### 6. Мониторинг:
- События отображаются в Sentry Dashboard → Issues
- Настройте алерты для критических ошибок
- Используйте Performance для анализа производительности
