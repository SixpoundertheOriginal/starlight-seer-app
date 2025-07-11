
import { useState, useCallback } from 'react';
import { TarotReading as TarotReadingType, ReadingType, CardPosition } from '@/types/tarot';
import { getRandomCards } from '@/data/tarotDeck';
import { SPREADS } from '@/data/spreads';
import { useToast } from '@/hooks/use-toast';

export const useReadingGeneration = () => {
  const [isGeneratingReading, setIsGeneratingReading] = useState(false);
  const { toast } = useToast();

  // Enhanced static interpretation as fallback
  const generateInterpretation = useCallback((positions: CardPosition[], userQuestion?: string): string => {
    let interpretation = "The cosmic tapestry reveals a profound message woven through the ancient symbols before you.\n\n";
    
    if (userQuestion) {
      interpretation += `In response to your heartfelt inquiry: "${userQuestion}"\n\n`;
    }

    if (positions.length === 1) {
      const position = positions[0];
      const card = position.card!;
      const meaning = position.isReversed ? card.reversedMeaning : card.uprightMeaning;
      
      interpretation += `The ${card.name}${position.isReversed ? ' appears in its shadow aspect' : ' shines forth with radiant energy'}, bringing forth the essence of ${card.keywords.slice(0, 3).join(', ')}.\n\n`;
      interpretation += `${meaning}\n\n`;
      interpretation += position.isReversed 
        ? "In its reversed state, this card whispers of inner reflection and the need to look within for hidden truths. The universe asks you to pause and consider what may be blocking your natural flow."
        : "Standing upright, this card channels pure cosmic energy, illuminating your path with divine guidance. Trust in the wisdom it offers as you step forward.";
    } else {
      positions.forEach((position, index) => {
        const card = position.card!;
        const meaning = position.isReversed ? card.reversedMeaning : card.uprightMeaning;
        
        interpretation += `**${position.name}** reveals the ${card.name}${position.isReversed ? ' in shadow' : ''}:\n`;
        interpretation += `${meaning}\n\n`;
      });

      interpretation += "These sacred cards form a constellation of wisdom, each lending its voice to the cosmic symphony of your journey. ";
      interpretation += "The past has woven the threads of your story, the present offers the loom of opportunity, ";
      interpretation += "and the future sparkles with infinite potential waiting to be shaped by your conscious choices.\n\n";
    }

    interpretation += "Remember, dear seeker, that you are both the author and the protagonist of your story. The cards illuminate the path, but your heart holds the compass. May this reading serve as a gentle guide as you dance with the mysteries of existence.";
    
    return interpretation;
  }, []);

  const generateReading = useCallback(async (
    selectedSpread: ReadingType,
    question: string,
    onComplete: (reading: TarotReadingType) => void
  ) => {
    setIsGeneratingReading(true);
    
    try {
      // Simulate mystical delay (reduced since we now have shuffle animation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const spread = { ...SPREADS[selectedSpread === 'single' ? 'single' : 'threeCard'] };
      const cardCount = spread.positions.length;
      const drawnCards = getRandomCards(cardCount);
      
      // Assign cards to positions with random reversal chance
      spread.positions = spread.positions.map((position, index) => ({
        ...position,
        card: drawnCards[index],
        isReversed: Math.random() < 0.3 // 30% chance of reversal
      }));

      const interpretation = generateInterpretation(spread.positions, question);
      
      const reading: TarotReadingType = {
        id: `reading-${Date.now()}`,
        question: question || undefined,
        spread,
        timestamp: new Date(),
        interpretation
      };

      onComplete(reading);
      
      toast({
        title: "✨ The cosmos has spoken",
        description: "Your mystical reading awaits discovery...",
      });
    } catch (error) {
      toast({
        title: "The veil trembles",
        description: "The cosmic energies are unclear. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReading(false);
    }
  }, [generateInterpretation, toast]);

  return {
    isGeneratingReading,
    generateReading
  };
};
