
import { supabase } from '@/integrations/supabase/client';

export interface SkillResult {
  id?: string;
  user_id: string;
  language: string;
  score: number;
  weak_areas: string[];
  total_questions: number;
  created_at?: string;
}

export interface ResumeAnalysis {
  id?: string;
  user_id: string;
  ats_score: number;
  suggestions: string[];
  resume_url?: string;
  filename?: string;
  created_at?: string;
}

export interface ChatMessage {
  id?: string;
  user_id: string;
  message: string;
  sender: 'user' | 'bot';
  created_at?: string;
}

// Skill Test Services
export const saveSkillResult = async (result: Omit<SkillResult, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('skill_results')
    .insert([result])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getUserSkillResults = async (userId: string) => {
  const { data, error } = await supabase
    .from('skill_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

// Resume Analysis Services
export const uploadResume = async (file: File, userId: string) => {
  const fileName = `${userId}/resume_${Date.now()}.pdf`;
  
  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file);
    
  if (error) throw error;
  
  const { data: urlData } = supabase.storage
    .from('resumes')
    .getPublicUrl(fileName);
    
  return {
    path: data.path,
    url: urlData.publicUrl
  };
};

export const saveResumeAnalysis = async (analysis: Omit<ResumeAnalysis, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('resume_analysis')
    .insert([analysis])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getUserResumeAnalysis = async (userId: string) => {
  const { data, error } = await supabase
    .from('resume_analysis')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

// Chat Services
export const saveChatMessage = async (message: Omit<ChatMessage, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('chat_history')
    .insert([message])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getUserChatHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
    
  if (error) throw error;
  return data;
};

// User Profile Services
export const getUserProfile = async (authUserId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single();
    
  if (error) throw error;
  return data;
};

export const updateProfile = async (profileId: string, updateData: any, avatarFile?: File | null) => {
  let avatarUrl = null;
  
  // Upload avatar if provided
  if (avatarFile) {
    const fileName = `avatars/${profileId}_${Date.now()}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatarFile);
      
    if (uploadError) throw uploadError;
    
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
      
    avatarUrl = urlData.publicUrl;
  }
  
  const finalUpdateData = {
    ...updateData,
    ...(avatarUrl && { avatar_url: avatarUrl }),
    updated_at: new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('users')
    .update(finalUpdateData)
    .eq('id', profileId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updatePassword = async (currentPassword: string, newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });
  
  if (error) throw error;
};
