
-- Create table for project idea votes
CREATE TABLE public.project_idea_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES public.project_ideas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  value INTEGER NOT NULL CHECK (value IN (-1, 1)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(idea_id, user_id)
);

-- Enable RLS for votes
ALTER TABLE public.project_idea_votes ENABLE ROW LEVEL SECURITY;

-- Allow read votes to everyone (for vote counts)
CREATE POLICY "Public read project idea votes"
  ON public.project_idea_votes FOR SELECT
  USING (true);

-- Allow authenticated users to insert their own votes
CREATE POLICY "Users can vote on project ideas"
  ON public.project_idea_votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to update their own votes  
CREATE POLICY "Users can update their own votes"
  ON public.project_idea_votes FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert some sample project ideas for testing
INSERT INTO public.project_ideas (user_id, title, description, tags) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Build a Weather App', 'Create a responsive weather application using React and weather APIs', ARRAY['JavaScript', 'React', 'API']),
  ('00000000-0000-0000-0000-000000000002', 'Social Media Dashboard', 'Design a dashboard to manage multiple social media accounts', ARRAY['React', 'Dashboard', 'Social Media']),
  ('00000000-0000-0000-0000-000000000003', 'E-commerce Platform', 'Build a full-stack e-commerce platform with payment integration', ARRAY['Full-stack', 'E-commerce', 'Payment']),
  ('00000000-0000-0000-0000-000000000004', 'Task Management Tool', 'Create a collaborative task management application', ARRAY['Productivity', 'React', 'Collaboration']),
  ('00000000-0000-0000-0000-000000000005', 'Recipe Finder App', 'Develop an app to find recipes based on available ingredients', ARRAY['Mobile', 'Food', 'Search']);
