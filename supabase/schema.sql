-- ============================================================
-- MUSDAA Website – Supabase Schema
-- Run this in the Supabase SQL Editor (or via CLI)
-- ============================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES (extends auth.users for role-based access)
-- ============================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'member' 
    CHECK (role IN ('member', 'editor', 'admin', 'super_admin')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. EVENTS
-- ============================================================
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT,                          -- e.g. "9:00 AM – 1:00 PM"
  location TEXT,
  image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX events_date_idx ON public.events (date DESC);
CREATE INDEX events_featured_idx ON public.events (is_featured) WHERE is_featured = TRUE;

-- ============================================================
-- 3. SERMONS
-- ============================================================
CREATE TABLE public.sermons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  series TEXT,
  video_url TEXT,
  audio_url TEXT,
  document_url TEXT,
  thumbnail_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX sermons_date_idx ON public.sermons (date DESC);

-- ============================================================
-- 4. MINISTRIES
-- ============================================================
CREATE TABLE public.ministries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  leader TEXT,
  image_url TEXT,
  meeting_time TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. ANNOUNCEMENTS
-- ============================================================
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX announcements_pinned_idx ON public.announcements (is_pinned) WHERE is_pinned = TRUE;

-- ============================================================
-- 6. PRAYER REQUESTS
-- ============================================================
CREATE TABLE public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,                                      -- nullable if anonymous
  request TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,       -- can be shown on website
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'prayed', 'answered')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX prayer_requests_status_idx ON public.prayer_requests (status);
CREATE INDEX prayer_requests_public_idx ON public.prayer_requests (is_public) WHERE is_public = TRUE;

-- ============================================================
-- 7. GALLERY ITEMS
-- ============================================================
CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  image_url TEXT NOT NULL,
  category TEXT,                                  -- e.g. "Worship", "Outreach", "Youth"
  event_date DATE,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 8. CONTACT MESSAGES (optional – for the contact form)
-- ============================================================
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- UPDATED_AT TRIGGER (reusable)
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_sermons_updated_at
  BEFORE UPDATE ON public.sermons
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_ministries_updated_at
  BEFORE UPDATE ON public.ministries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_prayer_requests_updated_at
  BEFORE UPDATE ON public.prayer_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- ---------- PROFILES ----------
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ---------- EVENTS ----------
CREATE POLICY "Published events are viewable by everyone"
  ON public.events FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Editors and admins can insert events"
  ON public.events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin')
    )
  );

CREATE POLICY "Editors and admins can update events"
  ON public.events FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can delete events"
  ON public.events FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- ---------- SERMONS (same pattern as events) ----------
CREATE POLICY "Published sermons are viewable by everyone"
  ON public.sermons FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Editors and admins can insert sermons"
  ON public.sermons FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin')
    )
  );

CREATE POLICY "Editors and admins can update sermons"
  ON public.sermons FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can delete sermons"
  ON public.sermons FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- ---------- MINISTRIES ----------
CREATE POLICY "Active ministries are viewable by everyone"
  ON public.ministries FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Editors and admins can manage ministries"
  ON public.ministries FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin')
    )
  );

-- ---------- ANNOUNCEMENTS ----------
CREATE POLICY "Published announcements are viewable by everyone"
  ON public.announcements FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Editors and admins can manage announcements"
  ON public.announcements FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin')
    )
  );

-- ---------- PRAYER REQUESTS ----------
-- Anyone can submit a prayer request
CREATE POLICY "Anyone can insert prayer requests"
  ON public.prayer_requests FOR INSERT
  WITH CHECK (true);

-- Public prayer requests are viewable by everyone
CREATE POLICY "Public prayer requests are viewable"
  ON public.prayer_requests FOR SELECT
  USING (is_public = true OR auth.role() = 'authenticated');

-- Editors/admins can update/delete
CREATE POLICY "Editors and admins can manage prayer requests"
  ON public.prayer_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin')
    )
  );

-- ---------- GALLERY ----------
CREATE POLICY "Published gallery items are viewable by everyone"
  ON public.gallery_items FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Editors and admins can manage gallery"
  ON public.gallery_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('editor', 'admin', 'super_admin')
    )
  );

-- ---------- CONTACT MESSAGES ----------
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view and manage contact messages"
  ON public.contact_messages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('events', 'events', true),
  ('sermons', 'sermons', true),
  ('gallery', 'gallery', true),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

CREATE POLICY "Public read for MUSDAA media"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id IN ('events', 'sermons', 'gallery', 'avatars'));

CREATE POLICY "Authenticated users can upload MUSDAA media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id IN ('events', 'sermons', 'gallery', 'avatars'));

CREATE POLICY "Authenticated users can update MUSDAA media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id IN ('events', 'sermons', 'gallery', 'avatars'))
  WITH CHECK (bucket_id IN ('events', 'sermons', 'gallery', 'avatars'));

CREATE POLICY "Authenticated users can delete MUSDAA media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id IN ('events', 'sermons', 'gallery', 'avatars'));

-- ============================================================
-- SEED DATA (optional – for development)
-- ============================================================
-- You can insert sample data after creating the tables.
-- See src/data/placeholder.ts for the content currently used on the frontend.

-- ============================================================
-- 9. SITE SETTINGS (key-value store for simple configuration)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  label TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings are viewable by everyone"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage settings"
  ON public.site_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

CREATE TRIGGER set_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Default settings
INSERT INTO public.site_settings (key, value, label) VALUES
  ('site_name', 'MUSDAA', 'Site Name'),
  ('site_tagline', 'Makerere University Seventh-day Adventist Association', 'Tagline'),
  ('contact_email', 'info@musdaa.org', 'Contact Email'),
  ('contact_phone', '+256 XXX XXX XXX', 'Contact Phone'),
  ('location', 'Makerere University Main Campus, Kampala, Uganda', 'Location'),
  ('facebook_url', '', 'Facebook URL'),
  ('instagram_url', '', 'Instagram URL'),
  ('youtube_url', '', 'YouTube URL'),
  ('whatsapp_url', '', 'WhatsApp Group or Community Link'),
  ('whatsapp_channel_url', '', 'WhatsApp Channel Link')
ON CONFLICT (key) DO NOTHING;
