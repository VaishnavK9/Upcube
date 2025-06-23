
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get your NLP API configuration from environment variables
// You'll set these in your Supabase project settings
const NLP_API_KEY = Deno.env.get('NLP_API_KEY');
const NLP_API_ENDPOINT = Deno.env.get('NLP_API_ENDPOINT');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, context } = await req.json();

    // If your API keys are configured, use your NLP service
    if (NLP_API_KEY && NLP_API_ENDPOINT) {
      const response = await fetch(NLP_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${NLP_API_KEY}`
        },
        body: JSON.stringify({
          text: text,
          context: context || 'general'
        })
      });

      if (response.ok) {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Fallback: basic analysis if API keys not configured
    const basicAnalysis = {
      sentiment: 'neutral',
      confidence: 0.5,
      keyPhrases: text.split(' ').filter((word: string) => word.length > 4).slice(0, 3),
      topics: ['general'],
      difficulty: 0.5,
      comprehension: 0.5
    };

    return new Response(JSON.stringify(basicAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in NLP analysis:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
