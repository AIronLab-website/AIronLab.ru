-- ============================================
-- AIL-238: Verification Queries
-- ============================================
-- Используйте эти запросы для проверки настроек
-- после выполнения миграции 002_rls_and_storage_policies.sql

-- ============================================
-- 1. ПРОВЕРКА RLS НА ТАБЛИЦАХ
-- ============================================

-- Все таблицы должны иметь rowsecurity = true
SELECT 
  schemaname,
  tablename,
  CASE 
    WHEN rowsecurity THEN '✅ Enabled'
    ELSE '❌ Disabled'
  END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'blog_authors', 
    'blog_categories', 
    'blog_tags', 
    'blog_posts', 
    'blog_post_tags', 
    'projects'
  )
ORDER BY tablename;

-- ============================================
-- 2. ПРОВЕРКА TABLE POLICIES
-- ============================================

-- Должно быть минимум 2 policy на таблицу (public read + admin full)
SELECT 
  tablename,
  policyname,
  cmd as operation,
  CASE 
    WHEN roles::text LIKE '%authenticated%' THEN '🔐 Admin'
    ELSE '🌍 Public'
  END as access_level
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================
-- 3. ПРОВЕРКА STORAGE POLICIES
-- ============================================

-- Проверить policies для Storage buckets
SELECT 
  bucket_id,
  name as policy_name,
  CASE 
    WHEN definition LIKE '%authenticated%' THEN '🔐 Admin only'
    ELSE '🌍 Public'
  END as access_level
FROM storage.policies
ORDER BY bucket_id, name;

-- ============================================
-- 4. ПРОВЕРКА STORAGE BUCKETS
-- ============================================

-- Должно быть 3 bucket
SELECT 
  id,
  name,
  CASE 
    WHEN public THEN '🌍 Public'
    ELSE '🔒 Private'
  END as visibility,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
ORDER BY name;

-- ============================================
-- 5. КОЛИЧЕСТВО POLICIES ПО ТАБЛИЦАМ
-- ============================================

-- У каждой таблицы должно быть >= 2 policies
SELECT 
  tablename,
  COUNT(*) as policies_count,
  CASE 
    WHEN COUNT(*) >= 2 THEN '✅ OK'
    ELSE '⚠️ Check needed'
  END as status
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'blog_authors', 
    'blog_categories', 
    'blog_tags', 
    'blog_posts', 
    'blog_post_tags', 
    'projects'
  )
GROUP BY tablename
ORDER BY tablename;

-- ============================================
-- 6. ПРОВЕРКА HELPER FUNCTIONS
-- ============================================

-- Проверить, что функция is_owner создана
SELECT 
  routine_name,
  routine_type,
  data_type as return_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name = 'is_owner';

-- ============================================
-- 7. ПОЛНАЯ СВОДКА ПО RLS
-- ============================================

-- Красивая сводка для финальной проверки
DO $$
DECLARE
  tables_count INTEGER;
  rls_enabled_count INTEGER;
  policies_count INTEGER;
  buckets_count INTEGER;
BEGIN
  -- Подсчет таблиц
  SELECT COUNT(*) INTO tables_count
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename IN ('blog_authors', 'blog_categories', 'blog_tags', 'blog_posts', 'blog_post_tags', 'projects');
  
  -- Подсчет таблиц с включенным RLS
  SELECT COUNT(*) INTO rls_enabled_count
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename IN ('blog_authors', 'blog_categories', 'blog_tags', 'blog_posts', 'blog_post_tags', 'projects')
    AND rowsecurity = true;
  
  -- Подсчет policies
  SELECT COUNT(*) INTO policies_count
  FROM pg_policies
  WHERE schemaname = 'public';
  
  -- Подсчет buckets
  SELECT COUNT(*) INTO buckets_count
  FROM storage.buckets;
  
  -- Вывод результатов
  RAISE NOTICE '========================================';
  RAISE NOTICE '     AIL-238 VERIFICATION SUMMARY      ';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables: % / % with RLS enabled', rls_enabled_count, tables_count;
  RAISE NOTICE 'Total Policies: %', policies_count;
  RAISE NOTICE 'Storage Buckets: %', buckets_count;
  RAISE NOTICE '';
  
  IF rls_enabled_count = tables_count AND buckets_count >= 3 AND policies_count >= 12 THEN
    RAISE NOTICE '✅ All checks passed! AIL-238 completed successfully!';
  ELSE
    RAISE WARNING '⚠️ Some checks failed. Please review:';
    IF rls_enabled_count < tables_count THEN
      RAISE WARNING '  - Not all tables have RLS enabled';
    END IF;
    IF buckets_count < 3 THEN
      RAISE WARNING '  - Missing storage buckets (expected 3, found %)', buckets_count;
    END IF;
    IF policies_count < 12 THEN
      RAISE WARNING '  - Insufficient policies (expected >=12, found %)', policies_count;
    END IF;
  END IF;
  
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
END $$;

-- ============================================
-- 8. ТЕСТИРОВАНИЕ PUBLIC READ
-- ============================================

-- Эти запросы должны работать даже без аутентификации
-- (имитация публичного доступа)

-- Получить опубликованные посты (должно работать)
SELECT title, slug, status 
FROM blog_posts 
WHERE status = 'published'
LIMIT 3;

-- Получить все категории (должно работать)
SELECT name, slug, color
FROM blog_categories
LIMIT 3;

-- Получить опубликованные проекты (должно работать)
SELECT title, slug, status
FROM projects
WHERE status = 'published'
LIMIT 3;

-- ============================================
-- 9. ПРОВЕРКА ИНДЕКСОВ
-- ============================================

-- Убедиться, что все индексы на месте
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('blog_posts', 'blog_categories', 'blog_tags', 'projects')
ORDER BY tablename, indexname;

-- ============================================
-- 10. ПРОВЕРКА ТРИГГЕРОВ
-- ============================================

-- Все таблицы должны иметь триггер updated_at
SELECT 
  trigger_name,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND event_object_table IN (
    'blog_authors', 
    'blog_categories', 
    'blog_tags', 
    'blog_posts', 
    'blog_post_tags', 
    'projects'
  )
ORDER BY event_object_table;

-- ============================================
-- NOTES
-- ============================================

/*
Ожидаемые результаты:

1. RLS: 6/6 таблиц с включенным RLS
2. Policies: минимум 12 (2 на таблицу для 6 таблиц)
3. Storage Buckets: 3 (blog-images, project-images, temp-uploads)
4. Storage Policies: минимум 9 (3 bucket × 3 операции минимум)
5. Helper Functions: is_owner
6. Triggers: 6 (по одному update_*_updated_at на таблицу)

Если все проверки прошли - AIL-238 успешно выполнена!
*/

