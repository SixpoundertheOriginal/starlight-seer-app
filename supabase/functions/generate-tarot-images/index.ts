import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cardName, cardType, suit, keywords, description } = await req.json();

    // Create a detailed prompt for consistent tarot card imagery
    let prompt = `A mystical tarot card illustration for "${cardName}"`;
    
    if (suit) {
      prompt += ` from the suit of ${suit}`;
    }
    
    prompt += `. ${description}. `;
    
    if (keywords && keywords.length > 0) {
      prompt += `Key themes: ${keywords.join(', ')}. `;
    }
    
    prompt += `Art style: Mystical, spiritual, detailed illustration with rich symbolism, ornate borders, cosmic elements, deep blues and purples with gold accents. Traditional tarot aesthetic with modern artistic quality. Vertical portrait orientation, ethereal lighting, intricate details.`;

    console.log('Generating image for:', cardName, 'with prompt:', prompt);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: prompt,
        n: 1,
        size: '1024x1536',
        quality: 'high',
        output_format: 'webp'
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const imageBase64 = data.data[0].b64_json;

    return new Response(JSON.stringify({ 
      success: true,
      imageData: `data:image/webp;base64,${imageBase64}`,
      cardName 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-tarot-images function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});