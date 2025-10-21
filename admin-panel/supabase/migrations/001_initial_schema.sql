-- ============================================
-- AIronLab Admin Panel: Initial Schema Migration
-- ============================================
-- Description: Creates all tables, indexes, and triggers for blog and projects management
-- Date: 2025-10-21
-- Task: AIL-237

-- ============================================
-- 1. BLOG AUTHORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  role VARCHAR(100) DEFAULT 'author', -- author, editor, admin
  social_links JSONB DEFAULT '{}', -- {twitter: "", linkedin: "", github: ""}
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE blog_authors IS 'Авторы статей блога';
COMMENT ON COLUMN blog_authors.social_links IS 'JSON объект с социальными ссылками: {twitter, linkedin, github}';

-- ============================================
-- 2. BLOG CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6', -- HEX color code
  icon VARCHAR(50), -- Icon name (например, для иконок библиотеки)
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE blog_categories IS 'Категории блога';
COMMENT ON COLUMN blog_categories.color IS 'HEX код цвета для UI (#RRGGBB)';

-- ============================================
-- 3. BLOG TAGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE blog_tags IS 'Теги для статей блога';

-- ============================================
-- 4. BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Основная информация
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  
  -- Связи
  author_id UUID NOT NULL REFERENCES blog_authors(id) ON DELETE RESTRICT,
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  
  -- Медиа
  featured_image_url TEXT,
  
  -- Метаданные
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, published, archived
  is_featured BOOLEAN DEFAULT FALSE,
  read_time INTEGER, -- минуты для чтения
  views_count INTEGER DEFAULT 0,
  
  -- SEO
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT[],
  
  -- Timestamps
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE blog_posts IS 'Статьи блога';
COMMENT ON COLUMN blog_posts.status IS 'Статус публикации: draft, published, archived';
COMMENT ON COLUMN blog_posts.read_time IS 'Время чтения в минутах';

-- ============================================
-- 5. BLOG POST TAGS (Many-to-Many)
-- ============================================
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_id, tag_id)
);

COMMENT ON TABLE blog_post_tags IS 'Связь между статьями и тегами (many-to-many)';

-- ============================================
-- 6. PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Основная информация
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  category VARCHAR(100), -- AI консалтинг, разработка, автоматизация
  client VARCHAR(255),
  
  -- Контент
  description TEXT NOT NULL,
  content TEXT, -- Подробное описание проекта
  results JSONB DEFAULT '[]', -- [{metric: "ROI", value: "300%", description: "..."}]
  
  -- Технологии
  technologies TEXT[] DEFAULT '{}', -- ["Python", "OpenAI", "FastAPI"]
  
  -- Медиа
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}', -- Дополнительные изображения
  
  -- Метаданные
  timeline VARCHAR(100), -- "2 месяца", "Q1 2024"
  status VARCHAR(20) DEFAULT 'published', -- draft, published, archived
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  
  -- URLs
  project_url TEXT,
  github_url TEXT,
  
  -- SEO
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT[],
  
  -- Timestamps
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE projects IS 'Портфолио проектов и кейсов';
COMMENT ON COLUMN projects.results IS 'JSON массив с результатами проекта [{metric, value, description}]';
COMMENT ON COLUMN projects.technologies IS 'Массив использованных технологий';

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Blog Posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_featured ON blog_posts(is_featured) WHERE is_featured = TRUE;

-- Blog Categories indexes
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

-- Blog Tags indexes
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON blog_tags(slug);

-- Blog Post Tags indexes
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_post_id ON blog_post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_tag_id ON blog_post_tags(tag_id);

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON projects(published_at DESC);

-- ============================================
-- TRIGGERS FOR AUTOMATIC UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_updated_at_column() IS 'Автоматически обновляет updated_at при изменении записи';

-- Apply trigger to all tables
CREATE TRIGGER update_blog_authors_updated_at
  BEFORE UPDATE ON blog_authors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_tags_updated_at
  BEFORE UPDATE ON blog_tags
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
BEGIN
  -- Convert to lowercase, replace spaces with hyphens, remove special chars
  slug := lower(regexp_replace(title, '[^a-zA-Z0-9а-яА-ЯёЁ\s-]', '', 'g'));
  slug := regexp_replace(slug, '\s+', '-', 'g');
  slug := regexp_replace(slug, '-+', '-', 'g');
  slug := trim(both '-' from slug);
  RETURN slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION generate_slug(TEXT) IS 'Генерирует URL-friendly slug из заголовка';

-- ============================================
-- VIEWS FOR CONVENIENCE
-- ============================================

-- View: Blog posts with all relations
CREATE OR REPLACE VIEW blog_posts_full AS
SELECT 
  p.*,
  a.name as author_name,
  a.email as author_email,
  a.avatar_url as author_avatar,
  c.name as category_name,
  c.slug as category_slug,
  c.color as category_color,
  ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) as tag_names,
  ARRAY_AGG(DISTINCT t.slug) FILTER (WHERE t.slug IS NOT NULL) as tag_slugs
FROM blog_posts p
LEFT JOIN blog_authors a ON p.author_id = a.id
LEFT JOIN blog_categories c ON p.category_id = c.id
LEFT JOIN blog_post_tags pt ON p.id = pt.post_id
LEFT JOIN blog_tags t ON pt.tag_id = t.id
GROUP BY p.id, a.name, a.email, a.avatar_url, c.name, c.slug, c.color;

COMMENT ON VIEW blog_posts_full IS 'Полная информация о статьях с авторами, категориями и тегами';

-- ============================================
-- INITIAL DATA (Optional)
-- ============================================

-- Insert default author (будет использоваться для миграции существующих статей)
INSERT INTO blog_authors (name, email, bio, role) 
VALUES (
  'AIronLab Team',
  'info@aironlab.ru',
  'Команда экспертов в области искусственного интеллекта и автоматизации бизнес-процессов.',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Insert default categories
INSERT INTO blog_categories (name, slug, description, color, display_order) VALUES
  ('Кейсы', 'cases', 'Реальные примеры внедрения ИИ в бизнес', '#10B981', 1),
  ('Гайды', 'guides', 'Практические руководства и инструкции', '#3B82F6', 2),
  ('ИИ-агенты', 'ai-agents', 'Статьи про AI агентов и автоматизацию', '#8B5CF6', 3),
  ('Новости', 'news', 'Новости из мира искусственного интеллекта', '#F59E0B', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert common tags
INSERT INTO blog_tags (name, slug) VALUES
  ('AI', 'ai'),
  ('Автоматизация', 'automation'),
  ('GPT', 'gpt'),
  ('Бизнес', 'business'),
  ('Кейс', 'case'),
  ('Python', 'python'),
  ('Телеграм-бот', 'telegram-bot'),
  ('OpenAI', 'openai'),
  ('RAG', 'rag'),
  ('LangChain', 'langchain')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- GRANT PERMISSIONS (for service role)
-- ============================================

-- Grant all permissions to authenticated users (will be restricted by RLS)
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Initial schema migration completed successfully!';
  RAISE NOTICE 'Created tables: blog_authors, blog_categories, blog_tags, blog_posts, blog_post_tags, projects';
  RAISE NOTICE 'Created indexes for performance optimization';
  RAISE NOTICE 'Created triggers for automatic updated_at';
  RAISE NOTICE 'Created helper functions and views';
  RAISE NOTICE 'Inserted initial data (default author, categories, tags)';
END $$;

