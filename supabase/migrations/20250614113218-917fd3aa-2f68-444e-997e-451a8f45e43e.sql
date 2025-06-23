
-- First, let's clean up any orphaned chat sessions and chat history
-- Delete chat sessions that don't have corresponding users in the users table
DELETE FROM public.chat_sessions 
WHERE user_id NOT IN (SELECT id FROM public.users);

-- Delete chat history that doesn't have corresponding users in the users table
DELETE FROM public.chat_history 
WHERE user_id NOT IN (SELECT id FROM public.users);

-- Now we can safely apply the foreign key constraints
-- Fix the chat_sessions table to properly reference the users table
ALTER TABLE public.chat_sessions 
DROP CONSTRAINT IF EXISTS chat_sessions_user_id_fkey;

ALTER TABLE public.chat_sessions 
ADD CONSTRAINT chat_sessions_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Fix the chat_history table foreign key as well
ALTER TABLE public.chat_history 
DROP CONSTRAINT IF EXISTS chat_history_user_id_fkey;

ALTER TABLE public.chat_history 
ADD CONSTRAINT chat_history_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Update RLS policies for chat_sessions to work with the users table
DROP POLICY IF EXISTS "Users can view their own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can create their own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can update their own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can delete their own chat sessions" ON public.chat_sessions;

-- Create new RLS policies that properly reference the users table
CREATE POLICY "Users can view their own chat sessions" 
  ON public.chat_sessions 
  FOR SELECT 
  USING (user_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can create their own chat sessions" 
  ON public.chat_sessions 
  FOR INSERT 
  WITH CHECK (user_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can update their own chat sessions" 
  ON public.chat_sessions 
  FOR UPDATE 
  USING (user_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can delete their own chat sessions" 
  ON public.chat_sessions 
  FOR DELETE 
  USING (user_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid()));

-- Update RLS policies for chat_history to work with the users table
DROP POLICY IF EXISTS "Users can view their own chat messages" ON public.chat_history;
DROP POLICY IF EXISTS "Users can create their own chat messages" ON public.chat_history;
DROP POLICY IF EXISTS "Users can update their own chat messages" ON public.chat_history;
DROP POLICY IF EXISTS "Users can delete their own chat messages" ON public.chat_history;

-- Create new RLS policies for chat_history that properly reference the users table
CREATE POLICY "Users can view their own chat messages" 
  ON public.chat_history 
  FOR SELECT 
  USING (user_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can create their own chat messages" 
  ON public.chat_history 
  FOR INSERT 
  WITH CHECK (user_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can update their own chat messages" 
  ON public.chat_history 
  FOR UPDATE 
  USING (user_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can delete their own chat messages" 
  ON public.chat_history 
  FOR DELETE 
  USING (user_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid()));
