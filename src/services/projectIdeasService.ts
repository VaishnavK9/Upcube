
import { supabase } from "@/integrations/supabase/client";

// Get all project ideas
export const getAllProjectIdeas = async () => {
  const { data, error } = await supabase
    .from("project_ideas")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

// Get all votes
export const getProjectIdeaVotes = async () => {
  const { data, error } = await supabase
    .from("project_idea_votes")
    .select("idea_id,value");
  if (error) throw error;
  return data || [];
};

// Submit new project idea (NOT USED for now)
// export const createProjectIdea = async ({title, description, tags, user_id}:{title:string;description:string;tags:string[];user_id:string;}) => { ... }

// Upvote/downvote
export const upvoteProjectIdea = async (idea_id: string, user_id: string) => {
  await supabase.from("project_idea_votes").upsert(
    [
      {
        idea_id,
        user_id,
        value: 1,
      },
    ],
    { onConflict: "idea_id,user_id" }
  );
};

export const downvoteProjectIdea = async (idea_id: string, user_id: string) => {
  await supabase.from("project_idea_votes").upsert(
    [
      {
        idea_id,
        user_id,
        value: -1,
      },
    ],
    { onConflict: "idea_id,user_id" }
  );
};

// Get the current user's vote for a specific idea
export const getUserIdeaVote = async (idea_id: string, user_id: string) => {
  const { data, error } = await supabase
    .from("project_idea_votes")
    .select("value")
    .eq("idea_id", idea_id)
    .eq("user_id", user_id)
    .maybeSingle();
  if (error || !data) return { value: 0 };
  return data;
};
