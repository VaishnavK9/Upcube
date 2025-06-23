
import { supabase } from '@/integrations/supabase/client';

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  chat_session_id: string;
  message: string;
  sender: 'user' | 'bot';
  created_at: string;
}

export const chatService = {
  // Create a new chat session
  async createChatSession(authUserId: string, title: string = 'New Chat'): Promise<ChatSession> {
    // First get the user's profile ID from the users table
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', authUserId)
      .single();

    if (userError) {
      console.error('Error getting user profile:', userError);
      throw new Error('User profile not found');
    }

    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([{ user_id: userProfile.id, title }])
      .select()
      .single();
    
    if (error) throw error;
    return data as ChatSession;
  },

  // Get all chat sessions for a user
  async getUserChatSessions(authUserId: string): Promise<ChatSession[]> {
    // First get the user's profile ID from the users table
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', authUserId)
      .single();

    if (userError) {
      console.error('Error getting user profile:', userError);
      return [];
    }

    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userProfile.id)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as ChatSession[];
  },

  // Get messages for a specific chat session
  async getChatMessages(chatSessionId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('chat_session_id', chatSessionId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return (data || []).map(item => ({
      id: item.id,
      user_id: item.user_id || '',
      chat_session_id: chatSessionId,
      message: item.message,
      sender: item.sender as 'user' | 'bot',
      created_at: item.created_at
    }));
  },

  // Save a message to a chat session
  async saveChatMessage(
    authUserId: string,
    chatSessionId: string,
    message: string,
    sender: 'user' | 'bot'
  ): Promise<ChatMessage> {
    // First get the user's profile ID from the users table
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', authUserId)
      .single();

    if (userError) {
      console.error('Error getting user profile:', userError);
      throw new Error('User profile not found');
    }

    const { data, error } = await supabase
      .from('chat_history')
      .insert([{
        user_id: userProfile.id,
        chat_session_id: chatSessionId,
        message,
        sender
      }])
      .select()
      .single();
    
    if (error) throw error;

    // Update the session's updated_at timestamp
    await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', chatSessionId);

    return {
      id: data.id,
      user_id: data.user_id || '',
      chat_session_id: chatSessionId,
      message: data.message,
      sender: data.sender as 'user' | 'bot',
      created_at: data.created_at
    };
  },

  // Update chat session title
  async updateChatSessionTitle(chatSessionId: string, title: string): Promise<void> {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ title })
      .eq('id', chatSessionId);
    
    if (error) throw error;
  },

  // Delete a chat session
  async deleteChatSession(chatSessionId: string): Promise<void> {
    const { error } = await supabase
      .from('chat_sessions')
      .delete()
      .eq('id', chatSessionId);
    
    if (error) throw error;
  }
};
