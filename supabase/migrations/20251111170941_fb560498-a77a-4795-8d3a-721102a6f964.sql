-- Create enums
CREATE TYPE public.app_role AS ENUM ('super_admin', 'editor', 'viewer');
CREATE TYPE public.project_status AS ENUM ('planning', 'active', 'completed');
CREATE TYPE public.event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
CREATE TYPE public.blog_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.message_status AS ENUM ('new', 'read', 'responded', 'archived');

-- User Roles Table (must be created before the security definer functions)
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Check if user has any admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('super_admin', 'editor')
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Super admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

-- Site Settings Table
CREATE TABLE public.site_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name text NOT NULL DEFAULT 'BECC',
    tagline text,
    description text,
    contact_email text,
    contact_phone text,
    contact_address text,
    facebook_url text,
    twitter_url text,
    instagram_url text,
    linkedin_url text,
    logo_url text,
    favicon_url text,
    updated_at timestamptz DEFAULT now() NOT NULL,
    updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Admins can update site settings"
ON public.site_settings FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Initialize default settings
INSERT INTO public.site_settings (site_name, tagline, description)
VALUES ('Brightstar Environmental Conservation Centre', 'Mazingira Bora — Better Environment', 'Environmental conservation through practice and knowledge sharing');

-- Hero Sections Table
CREATE TABLE public.hero_sections (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug text NOT NULL,
    title text NOT NULL,
    subtitle text,
    description text,
    cta_primary_text text,
    cta_primary_link text,
    cta_secondary_text text,
    cta_secondary_link text,
    background_image_url text,
    badge_text text,
    badge_icon text,
    is_active boolean DEFAULT true,
    order_position integer DEFAULT 0,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.hero_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active hero sections"
ON public.hero_sections FOR SELECT
TO authenticated, anon
USING (is_active = true);

CREATE POLICY "Admins can manage hero sections"
ON public.hero_sections FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Impact Metrics Table
CREATE TABLE public.impact_metrics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    label text NOT NULL,
    value integer NOT NULL DEFAULT 0,
    icon text,
    suffix text,
    order_position integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active metrics"
ON public.impact_metrics FOR SELECT
TO authenticated, anon
USING (is_active = true);

CREATE POLICY "Admins can manage metrics"
ON public.impact_metrics FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Insert default metrics
INSERT INTO public.impact_metrics (label, value, icon, suffix, order_position) VALUES
('Projects Completed', 50, 'Target', '+', 1),
('Communities Served', 10, 'Users', '', 2),
('Trees Planted', 5000, 'TreePine', '+', 3),
('Partners', 15, 'Handshake', '', 4);

-- Content Blocks Table
CREATE TABLE public.content_blocks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    block_key text UNIQUE NOT NULL,
    title text NOT NULL,
    content text,
    icon text,
    background_color text,
    order_position integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active content blocks"
ON public.content_blocks FOR SELECT
TO authenticated, anon
USING (is_active = true);

CREATE POLICY "Admins can manage content blocks"
ON public.content_blocks FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Insert default content blocks
INSERT INTO public.content_blocks (block_key, title, content, icon, order_position) VALUES
('vision', 'Vision', 'Centre of excellence promoting sustainable environmental conservation.', 'Eye', 1),
('mission', 'Mission', 'Environmental conservation through practice and knowledge sharing for clean air, biodiversity, and sustainable land use management in diverse ecosystems.', 'Target', 2),
('motto', 'Motto', 'Inclusive Environmental Conservation — working together for self-sustaining ecosystems that benefit all communities.', 'Heart', 3);

-- Pillars Table
CREATE TABLE public.pillars (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    detailed_content text,
    icon text,
    color_theme text,
    image_url text,
    order_position integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.pillars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active pillars"
ON public.pillars FOR SELECT
TO authenticated, anon
USING (is_active = true);

CREATE POLICY "Admins can manage pillars"
ON public.pillars FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Projects Table
CREATE TABLE public.projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    short_description text,
    full_description text,
    category text,
    featured_image_url text,
    location text,
    start_date date,
    end_date date,
    status project_status DEFAULT 'planning',
    beneficiaries_count integer,
    budget decimal,
    is_featured boolean DEFAULT false,
    order_position integer DEFAULT 0,
    pillar_id uuid REFERENCES public.pillars(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
ON public.projects FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Admins can manage projects"
ON public.projects FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Project Images Table
CREATE TABLE public.project_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    image_url text NOT NULL,
    caption text,
    order_position integer DEFAULT 0,
    created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project images"
ON public.project_images FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Admins can manage project images"
ON public.project_images FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Events Table
CREATE TABLE public.events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    location text,
    event_date timestamptz NOT NULL,
    end_date timestamptz,
    image_url text,
    registration_link text,
    max_participants integer,
    is_featured boolean DEFAULT false,
    status event_status DEFAULT 'upcoming',
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events"
ON public.events FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Admins can manage events"
ON public.events FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Gallery Images Table
CREATE TABLE public.gallery_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    image_url text NOT NULL,
    category text,
    photographer text,
    taken_date date,
    is_featured boolean DEFAULT false,
    order_position integer DEFAULT 0,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Admins can manage gallery images"
ON public.gallery_images FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Partners Table
CREATE TABLE public.partners (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    logo_url text,
    website_url text,
    description text,
    partnership_type text,
    order_position integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active partners"
ON public.partners FOR SELECT
TO authenticated, anon
USING (is_active = true);

CREATE POLICY "Admins can manage partners"
ON public.partners FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Team Members Table
CREATE TABLE public.team_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    position text NOT NULL,
    bio text,
    photo_url text,
    email text,
    linkedin_url text,
    order_position integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active team members"
ON public.team_members FOR SELECT
TO authenticated, anon
USING (is_active = true);

CREATE POLICY "Admins can manage team members"
ON public.team_members FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Blog Posts Table
CREATE TABLE public.blog_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    excerpt text,
    content text,
    featured_image_url text,
    author_id uuid REFERENCES public.team_members(id) ON DELETE SET NULL,
    published_at timestamptz,
    status blog_status DEFAULT 'draft',
    views_count integer DEFAULT 0,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts FOR SELECT
TO authenticated, anon
USING (status = 'published');

CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Contact Messages Table
CREATE TABLE public.contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text,
    message text NOT NULL,
    status message_status DEFAULT 'new',
    responded_by uuid REFERENCES auth.users(id),
    responded_at timestamptz,
    created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages"
ON public.contact_messages FOR INSERT
TO authenticated, anon
WITH CHECK (true);

CREATE POLICY "Admins can view and manage messages"
ON public.contact_messages FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Activity Log Table
CREATE TABLE public.activity_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    action text NOT NULL,
    table_name text NOT NULL,
    record_id uuid,
    old_values jsonb,
    new_values jsonb,
    created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view activity logs"
ON public.activity_logs FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Function to log activities
CREATE OR REPLACE FUNCTION public.log_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.activity_logs (user_id, action, table_name, record_id, old_values)
    VALUES (auth.uid(), 'deleted', TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.activity_logs (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (auth.uid(), 'updated', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.activity_logs (user_id, action, table_name, record_id, new_values)
    VALUES (auth.uid(), 'created', TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
    RETURN NEW;
  END IF;
END;
$$;

-- Add activity logging triggers to key tables
CREATE TRIGGER log_projects_activity
AFTER INSERT OR UPDATE OR DELETE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.log_activity();

CREATE TRIGGER log_events_activity
AFTER INSERT OR UPDATE OR DELETE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.log_activity();

CREATE TRIGGER log_blog_posts_activity
AFTER INSERT OR UPDATE OR DELETE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.log_activity();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
('hero-images', 'hero-images', true),
('project-images', 'project-images', true),
('gallery-images', 'gallery-images', true),
('partner-logos', 'partner-logos', true),
('team-photos', 'team-photos', true),
('blog-images', 'blog-images', true),
('documents', 'documents', false);

-- Storage policies for public buckets
CREATE POLICY "Public access to hero images"
ON storage.objects FOR SELECT
USING (bucket_id = 'hero-images');

CREATE POLICY "Public access to project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Public access to gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-images');

CREATE POLICY "Public access to partner logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'partner-logos');

CREATE POLICY "Public access to team photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-photos');

CREATE POLICY "Public access to blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Admin upload policies
CREATE POLICY "Admins can upload hero images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'hero-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can upload project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can upload partner logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'partner-logos' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can upload team photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'team-photos' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents' AND public.is_admin(auth.uid()));

-- Admin delete policies
CREATE POLICY "Admins can delete any files"
ON storage.objects FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Admin update policies
CREATE POLICY "Admins can update any files"
ON storage.objects FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER update_hero_sections_updated_at BEFORE UPDATE ON public.hero_sections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_impact_metrics_updated_at BEFORE UPDATE ON public.impact_metrics
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON public.content_blocks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pillars_updated_at BEFORE UPDATE ON public.pillars
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON public.gallery_images
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();