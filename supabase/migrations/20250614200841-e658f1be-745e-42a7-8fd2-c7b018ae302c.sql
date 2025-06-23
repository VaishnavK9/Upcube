
-- Create table for project ideas
CREATE TABLE public.project_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for future (but without policies, all rows are visible for now)
ALTER TABLE public.project_ideas ENABLE ROW LEVEL SECURITY;

-- Allow read (SELECT) to everyone for now (you may restrict with policies later)
CREATE POLICY "Public read project ideas"
  ON public.project_ideas FOR SELECT
  USING (true);
