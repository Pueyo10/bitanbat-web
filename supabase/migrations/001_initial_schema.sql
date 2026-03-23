-- BitanBat Database Schema
-- Run this migration in your Supabase SQL editor

-- Uses gen_random_uuid() (built-in PostgreSQL 13+)

-- Locations (2 locales)
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  description_es TEXT NOT NULL DEFAULT '',
  description_eu TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Class types
CREATE TYPE class_category AS ENUM ('dantza', 'fitness', 'wellness');

CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description_es TEXT NOT NULL DEFAULT '',
  description_eu TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '#CCCCCC',
  category class_category NOT NULL DEFAULT 'fitness',
  image_url TEXT,
  min_age INT,
  max_age INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Weekly schedules
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 4),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_es TEXT NOT NULL,
  title_eu TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  content_es TEXT NOT NULL DEFAULT '',
  content_eu TEXT NOT NULL DEFAULT '',
  excerpt_es TEXT NOT NULL DEFAULT '',
  excerpt_eu TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prices
CREATE TABLE prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_es TEXT NOT NULL,
  name_eu TEXT NOT NULL DEFAULT '',
  description_es TEXT NOT NULL DEFAULT '',
  description_eu TEXT NOT NULL DEFAULT '',
  price DECIMAL(10, 2) NOT NULL,
  period TEXT NOT NULL DEFAULT 'mes',
  features JSONB NOT NULL DEFAULT '[]',
  highlighted BOOLEAN NOT NULL DEFAULT FALSE,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Gallery images
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  caption_es TEXT,
  caption_eu TEXT,
  category TEXT,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_schedules_location ON schedules(location_id);
CREATE INDEX idx_schedules_class ON schedules(class_id);
CREATE INDEX idx_schedules_day ON schedules(day_of_week);
CREATE INDEX idx_schedules_active ON schedules(is_active);
CREATE INDEX idx_blog_published ON blog_posts(published);
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_prices_order ON prices("order");
CREATE INDEX idx_gallery_order ON gallery_images("order");

-- Row Level Security
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read)
CREATE POLICY "Public read locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Public read classes" ON classes FOR SELECT USING (true);
CREATE POLICY "Public read active schedules" ON schedules FOR SELECT USING (is_active = true);
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read prices" ON prices FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT USING (true);

-- Admin write policies (authenticated users only)
CREATE POLICY "Admin insert locations" ON locations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update locations" ON locations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete locations" ON locations FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert classes" ON classes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update classes" ON classes FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete classes" ON classes FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert schedules" ON schedules FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update schedules" ON schedules FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete schedules" ON schedules FOR DELETE TO authenticated USING (true);
CREATE POLICY "Admin read all schedules" ON schedules FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin insert blog" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update blog" ON blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete blog" ON blog_posts FOR DELETE TO authenticated USING (true);
CREATE POLICY "Admin read all blog" ON blog_posts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin insert prices" ON prices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update prices" ON prices FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete prices" ON prices FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert gallery" ON gallery_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update gallery" ON gallery_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete gallery" ON gallery_images FOR DELETE TO authenticated USING (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER schedules_updated_at
  BEFORE UPDATE ON schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
