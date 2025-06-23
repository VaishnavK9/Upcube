
-- Add Row Level Security policies for chat_history table
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own chat messages
CREATE POLICY "Users can view their own chat messages" 
  ON public.chat_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own chat messages
CREATE POLICY "Users can create their own chat messages" 
  ON public.chat_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own chat messages
CREATE POLICY "Users can update their own chat messages" 
  ON public.chat_history 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own chat messages
CREATE POLICY "Users can delete their own chat messages" 
  ON public.chat_history 
  FOR DELETE 
  USING (auth.uid() = user_id);
