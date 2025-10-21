# 📦 Storage Structure - AIronLab Admin Panel

## Обзор Storage Buckets

```
Supabase Storage (AIronLab Production)
│
├── 📁 blog-images (PUBLIC)
│   ├── Size limit: 5 MB
│   ├── MIME types: image/jpeg, image/png, image/webp, image/gif
│   │
│   ├── 📂 featured/           # Обложки статей (Featured images)
│   │   └── post-slug-123.webp
│   │
│   ├── 📂 content/             # Изображения в контенте
│   │   ├── diagram-1.png
│   │   └── screenshot-2.jpg
│   │
│   └── 📂 authors/             # Аватары авторов
│       └── team-avatar.jpg
│
├── 📁 project-images (PUBLIC)
│   ├── Size limit: 5 MB
│   ├── MIME types: image/jpeg, image/png, image/webp, image/gif
│   │
│   ├── 📂 covers/              # Обложки проектов
│   │   └── project-name-cover.webp
│   │
│   ├── 📂 gallery/             # Галерея проекта
│   │   ├── screenshot-1.jpg
│   │   └── screenshot-2.jpg
│   │
│   └── 📂 results/             # Скриншоты результатов
│       └── metrics-chart.png
│
└── 🔒 temp-uploads (PRIVATE)
    ├── Size limit: 10 MB
    ├── MIME types: image/*, video/*, application/pdf
    │
    ├── 📂 drafts/              # Временные файлы для черновиков
    │   └── temp-image-123.jpg
    │
    └── 📂 processing/          # Файлы в процессе обработки
        └── video-upload.mp4
```

---

## Storage Policies Matrix

### blog-images (Public)

| Operation | Access Level | Policy Name |
|-----------|--------------|-------------|
| **SELECT** | 🌍 Public | `Public read blog images` |
| **INSERT** | 🔐 Admin | `Admin upload blog images` |
| **UPDATE** | 🔐 Admin | `Admin update blog images` |
| **DELETE** | 🔐 Admin | `Admin delete blog images` |

### project-images (Public)

| Operation | Access Level | Policy Name |
|-----------|--------------|-------------|
| **SELECT** | 🌍 Public | `Public read project images` |
| **INSERT** | 🔐 Admin | `Admin upload project images` |
| **UPDATE** | 🔐 Admin | `Admin update project images` |
| **DELETE** | 🔐 Admin | `Admin delete project images` |

### temp-uploads (Private)

| Operation | Access Level | Policy Name |
|-----------|--------------|-------------|
| **SELECT** | 🔐 Admin | `Admin read temp uploads` |
| **INSERT** | 🔐 Admin | `Admin upload temp files` |
| **DELETE** | 🔐 Admin | `Admin delete temp files` |

---

## URL Structure

### Public URLs (для blog-images и project-images)

```
https://<project-id>.supabase.co/storage/v1/object/public/<bucket>/<path>/<filename>
```

**Примеры:**
```
# Обложка статьи
https://xxxxx.supabase.co/storage/v1/object/public/blog-images/featured/ai-agents-post.webp

# Аватар автора
https://xxxxx.supabase.co/storage/v1/object/public/blog-images/authors/team.jpg

# Обложка проекта
https://xxxxx.supabase.co/storage/v1/object/public/project-images/covers/chatbot-project.webp
```

### Private URLs (для temp-uploads)

Private files требуют signed URL:

```javascript
const { data } = await supabase
  .storage
  .from('temp-uploads')
  .createSignedUrl('drafts/temp-123.jpg', 3600); // 1 hour expiry
```

---

## Рекомендации по именованию файлов

### Формат: `{type}-{identifier}-{timestamp}.{ext}`

**Примеры:**
```
featured-how-ai-agents-work-2025-01.webp
content-diagram-authentication-flow.png
author-john-doe.jpg
cover-telegram-bot-project.webp
gallery-dashboard-screenshot-1.jpg
temp-draft-abc123def.jpg
```

### Правила:
- ✅ Lowercase (строчные буквы)
- ✅ Kebab-case (через дефис)
- ✅ Латинские символы
- ✅ Уникальные идентификаторы
- ❌ Пробелы
- ❌ Кириллица
- ❌ Специальные символы (кроме `-` и `_`)

---

## Загрузка файлов

### Через Supabase Client (JavaScript)

```javascript
// Upload blog featured image
const file = event.target.files[0];
const fileName = `featured-${slug}-${Date.now()}.webp`;

const { data, error } = await supabase
  .storage
  .from('blog-images')
  .upload(`featured/${fileName}`, file, {
    cacheControl: '3600',
    upsert: false
  });

// Get public URL
const { data: { publicUrl } } = supabase
  .storage
  .from('blog-images')
  .getPublicUrl(`featured/${fileName}`);
```

### Через Dashboard (Manual)

1. Storage → выбрать bucket
2. Navigate to folder (или создать новую)
3. Click "Upload file"
4. Select file
5. Copy public URL

---

## Ограничения

| Parameter | blog-images | project-images | temp-uploads |
|-----------|-------------|----------------|--------------|
| Max file size | 5 MB | 5 MB | 10 MB |
| MIME types | image/* | image/* | image/*, video/*, pdf |
| Public access | ✅ Yes | ✅ Yes | ❌ No |
| Max files | Unlimited | Unlimited | Unlimited |
| Retention | Permanent | Permanent | Auto-cleanup* |

\* temp-uploads рекомендуется периодически очищать вручную или через cron job

---

## Оптимизация изображений

### Рекомендуемые форматы

| Use case | Format | Quality | Max size |
|----------|--------|---------|----------|
| Featured images | WebP | 85% | 1920×1080 |
| Content images | WebP/PNG | 85% | 1200×800 |
| Avatars | WebP/JPG | 80% | 400×400 |
| Icons | PNG/SVG | - | 256×256 |

### Инструменты для сжатия

- **TinyPNG** - https://tinypng.com
- **Squoosh** - https://squoosh.app
- **ImageOptim** (Mac) - https://imageoptim.com
- **Sharp** (Node.js) - npm package для автоматизации

---

## Миграция существующих изображений

Если у вас уже есть изображения в `/frontend/public/images/blog/`:

### Скрипт для массовой загрузки

```javascript
// upload-images.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const uploadImages = async () => {
  const localPath = './frontend/public/images/blog';
  const files = fs.readdirSync(localPath);
  
  for (const file of files) {
    const filePath = path.join(localPath, file);
    const fileBuffer = fs.readFileSync(filePath);
    
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(`migrated/${file}`, fileBuffer);
      
    if (error) {
      console.error(`Error uploading ${file}:`, error);
    } else {
      console.log(`✅ Uploaded: ${file}`);
    }
  }
};

uploadImages();
```

---

## Безопасность

### ✅ Что сделано

- RLS включен на storage.objects
- Public buckets доступны только для чтения
- Загрузка/удаление только для authenticated users
- MIME type validation
- File size limits

### 🔐 Дополнительные меры

1. **Сканирование вирусов** - рассмотреть интеграцию с VirusTotal API
2. **Rate limiting** - ограничить количество загрузок в минуту
3. **Image validation** - проверять реальный формат файла, не только расширение
4. **Auto-cleanup** - удалять старые файлы из temp-uploads

---

## Мониторинг и статистика

### Полезные запросы

```sql
-- Общий размер хранилища по bucket
SELECT 
  bucket_id,
  COUNT(*) as files_count,
  SUM(metadata->>'size')::bigint as total_size_bytes,
  pg_size_pretty(SUM(metadata->>'size')::bigint) as total_size
FROM storage.objects
GROUP BY bucket_id;

-- Последние загруженные файлы
SELECT 
  bucket_id,
  name,
  created_at,
  metadata->>'size' as size_bytes
FROM storage.objects
ORDER BY created_at DESC
LIMIT 10;

-- Самые большие файлы
SELECT 
  bucket_id,
  name,
  metadata->>'size' as size_bytes,
  pg_size_pretty((metadata->>'size')::bigint) as size
FROM storage.objects
ORDER BY (metadata->>'size')::bigint DESC
LIMIT 10;
```

---

## Backup Strategy

### Автоматический backup (Supabase)
- Ежедневные бэкапы БД (включая storage metadata)
- Point-in-time recovery (PITR) для платных планов

### Дополнительный backup (рекомендуется)
- Периодическое скачивание критичных изображений
- Хранение в S3/Cloudflare R2 как secondary storage
- Git LFS для изображений в репозитории (не рекомендуется для production)

---

## Troubleshooting

### Не могу загрузить файл
1. ✅ Проверьте MIME type
2. ✅ Проверьте размер файла
3. ✅ Проверьте Storage policies
4. ✅ Проверьте, что вы authenticated

### Public URL не работает
1. ✅ Bucket должен быть Public
2. ✅ Storage policy для SELECT должна существовать
3. ✅ Файл должен существовать (проверьте path)

### Ошибка 413 (File too large)
1. ✅ Уменьшите размер файла
2. ✅ Увеличьте file_size_limit для bucket (если нужно)

---

## Полезные ссылки

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Storage Security](https://supabase.com/docs/guides/storage/security/access-control)
- [Image Transformation](https://supabase.com/docs/guides/storage/image-transformations)

---

**Создано:** AIL-238  
**Последнее обновление:** 2025-10-21

