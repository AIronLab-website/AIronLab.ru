-- ============================================
-- AIronLab Admin Panel: RLS and Storage Policies
-- ============================================
-- Description: Row Level Security policies for tables and Storage buckets
-- Date: 2025-10-21
-- Task: AIL-238

-- ============================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ============================================

ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ POLICIES (для всех пользователей)
-- ============================================

-- Blog Posts: только опубликованные статьи доступны публично
CREATE POLICY "Public read published posts"
ON blog_posts
FOR SELECT
USING (status = 'published');

-- Blog Categories: все категории доступны публично
CREATE POLICY "Public read categories"
ON blog_categories
FOR SELECT
USING (true);

-- Blog Tags: все теги доступны публично
CREATE POLICY "Public read tags"
ON blog_tags
FOR SELECT
USING (true);

-- Blog Authors: все авторы доступны публично
CREATE POLICY "Public read authors"
ON blog_authors
FOR SELECT
USING (true);

-- Blog Post Tags: связи постов и тегов доступны публично
CREATE POLICY "Public read post tags"
ON blog_post_tags
FOR SELECT
USING (true);

-- Projects: все проекты доступны публично
CREATE POLICY "Public read published projects"
ON projects
FOR SELECT
USING (status = 'published');

-- ============================================
-- ADMIN FULL ACCESS POLICIES (для authenticated пользователей)
-- ============================================

-- Blog Posts: полный доступ для админов
CREATE POLICY "Admin full access posts"
ON blog_posts
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Blog Categories: полный доступ для админов
CREATE POLICY "Admin full access categories"
ON blog_categories
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Blog Tags: полный доступ для админов
CREATE POLICY "Admin full access tags"
ON blog_tags
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Blog Authors: полный доступ для админов
CREATE POLICY "Admin full access authors"
ON blog_authors
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Blog Post Tags: полный доступ для админов
CREATE POLICY "Admin full access post tags"
ON blog_post_tags
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Projects: полный доступ для админов
CREATE POLICY "Admin full access projects"
ON projects
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- STORAGE POLICIES
-- ============================================
-- Примечание: Storage buckets должны быть созданы вручную через UI
-- Затем выполните эти политики для каждого bucket

-- ============================================
-- Blog Images Storage Policies
-- ============================================

-- Публичное чтение изображений блога
CREATE POLICY "Public read blog images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog-images');

-- Админ может загружать изображения
CREATE POLICY "Admin upload blog images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- Админ может обновлять изображения
CREATE POLICY "Admin update blog images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- Админ может удалять изображения
CREATE POLICY "Admin delete blog images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- Project Images Storage Policies
-- ============================================

-- Публичное чтение изображений проектов
CREATE POLICY "Public read project images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-images');

-- Админ может загружать изображения проектов
CREATE POLICY "Admin upload project images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
);

-- Админ может обновлять изображения проектов
CREATE POLICY "Admin update project images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
);

-- Админ может удалять изображения проектов
CREATE POLICY "Admin delete project images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- Temp Uploads Storage Policies
-- ============================================

-- Только админ может читать временные загрузки
CREATE POLICY "Admin read temp uploads"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'temp-uploads'
  AND auth.role() = 'authenticated'
);

-- Админ может загружать временные файлы
CREATE POLICY "Admin upload temp files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'temp-uploads' 
  AND auth.role() = 'authenticated'
);

-- Админ может удалять временные файлы
CREATE POLICY "Admin delete temp files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'temp-uploads' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- HELPER FUNCTIONS FOR POLICIES
-- ============================================

-- Функция для проверки, является ли пользователь владельцем контента
CREATE OR REPLACE FUNCTION is_owner(author_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.uid() = author_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION is_owner(UUID) IS 'Проверяет, является ли текущий пользователь владельцем контента';

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Проверить включен ли RLS на всех таблицах
DO $$
DECLARE
  table_name TEXT;
  rls_enabled BOOLEAN;
BEGIN
  FOR table_name IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN ('blog_authors', 'blog_categories', 'blog_tags', 'blog_posts', 'blog_post_tags', 'projects')
  LOOP
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class
    WHERE relname = table_name;
    
    IF rls_enabled THEN
      RAISE NOTICE 'RLS enabled on: %', table_name;
    ELSE
      RAISE WARNING 'RLS NOT enabled on: %', table_name;
    END IF;
  END LOOP;
END $$;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ RLS policies migration completed successfully!';
  RAISE NOTICE 'Enabled RLS on: blog_authors, blog_categories, blog_tags, blog_posts, blog_post_tags, projects';
  RAISE NOTICE 'Created public read policies for published content';
  RAISE NOTICE 'Created admin full access policies for authenticated users';
  RAISE NOTICE 'Created storage policies for blog-images, project-images, temp-uploads';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️ NEXT STEPS:';
  RAISE NOTICE '1. Create Storage buckets through Supabase Dashboard UI';
  RAISE NOTICE '2. Test policies by creating a test post';
  RAISE NOTICE '3. Create admin user (AIL-239)';
END $$;

