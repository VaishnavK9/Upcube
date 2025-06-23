
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get your chatbot API configuration from environment variables
const CHATBOT_API_KEY = Deno.env.get('CHATBOT_API_KEY');
const CHATBOT_API_ENDPOINT = Deno.env.get('CHATBOT_API_ENDPOINT');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();

    // If your chatbot API keys are configured, use your service
    if (CHATBOT_API_KEY && CHATBOT_API_ENDPOINT) {
      const response = await fetch(CHATBOT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHATBOT_API_KEY}`
        },
        body: JSON.stringify({
          message: message,
          context: context || 'career_guidance'
        })
      });

      if (response.ok) {
        const data = await response.json();
        return new Response(JSON.stringify({ response: data.response || data.message }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Fallback: basic chatbot responses
    const fallbackResponse = generateFallbackResponse(message);
    
    return new Response(JSON.stringify({ response: fallbackResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chatbot response:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    return "I'd be happy to help with your resume! Here are some key tips:\n\n• Use strong action verbs (achieved, developed, implemented)\n• Quantify your accomplishments with numbers\n• Tailor keywords to match job descriptions\n• Keep it concise and well-formatted\n• Include relevant technical skills\n\nWould you like me to review a specific section of your resume?";
  }
  
  if (lowerMessage.includes('interview') || lowerMessage.includes('preparation')) {
    return "Great! Interview preparation is crucial. Here's what I recommend:\n\n• Research the company and role thoroughly\n• Practice STAR method for behavioral questions\n• Prepare technical examples from your projects\n• Have questions ready about the team and culture\n• Practice coding problems if it's a technical role\n\nWhat type of interview are you preparing for?";
  }
  
  return "I'm here to help you with your career and technical development. How can I provide the most helpful guidance?";
}
