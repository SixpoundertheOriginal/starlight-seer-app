import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TarotCard } from '@/types/tarot';
import { toast } from 'sonner';

export const useTarotImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const generateCardImage = async (card: TarotCard) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-tarot-images', {
        body: {
          cardName: card.name,
          cardType: card.type,
          suit: card.suit || null,
          keywords: card.keywords,
          description: card.description
        }
      });

      if (error) throw error;

      if (data.success) {
        return data.imageData;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error generating image for card:', card.name, error);
      throw error;
    }
  };

  const generateAllMissingImages = async (cards: TarotCard[]) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const cardsNeedingImages = cards.filter(card => !card.imageUrl);
    const generatedImages: Record<string, string> = {};

    try {
      for (let i = 0; i < cardsNeedingImages.length; i++) {
        const card = cardsNeedingImages[i];
        
        toast(`Generating image for ${card.name}...`);
        
        try {
          const imageData = await generateCardImage(card);
          generatedImages[card.id] = imageData;
          
          setGenerationProgress(((i + 1) / cardsNeedingImages.length) * 100);
          
          // Small delay to avoid rate limiting
          if (i < cardsNeedingImages.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.error(`Failed to generate image for ${card.name}:`, error);
          toast.error(`Failed to generate image for ${card.name}`);
        }
      }

      toast.success(`Generated ${Object.keys(generatedImages).length} card images!`);
      return generatedImages;
    } catch (error) {
      console.error('Error in batch generation:', error);
      toast.error('Failed to generate all images');
      throw error;
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  return {
    generateCardImage,
    generateAllMissingImages,
    isGenerating,
    generationProgress
  };
};