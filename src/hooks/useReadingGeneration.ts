
import { useState, useCallback } from 'react';
import { TarotReading as TarotReadingType, ReadingType, CardPosition } from '@/types/tarot';
import { getRandomCards } from '@/data/tarotDeck';
import { SPREADS } from '@/data/spreads';
import { useToast } from '@/hooks/use-toast';

export const useReadingGeneration = () => {
  const [isGeneratingReading, setIsGeneratingReading] = useState(false);
  const { toast } = useToast();

  const generateInterpretation = useCallback((positions: CardPosition[], userQuestion?: string): string => {
    let interpretation = "The cosmic forces have aligned to bring you this message:\n\n";
    
    if (userQuestion) {
      interpretation += `In response to your question: "${userQuestion}"\n\n`;
    }

    if (positions.length === 1) {
      // Single card reading
      const position = positions[0];
      const card = position.card!;
      const meaning = position.isReversed ? card.reversedMeaning : card.uprightMeaning;
      
      interpretation += `${card.name}${position.isReversed ? ' (Reversed)' : ''}:\n`;
      interpretation += `${meaning}\n\n`;
      interpretation += `This card brings the energy of ${card.keywords.slice(0, 3).join(', ')}. `;
      interpretation += position.isReversed 
        ? "In its reversed position, this card asks you to look inward and consider alternative perspectives. "
        : "Trust in this guidance as you move forward on your path. ";
    } else {
      // Three card reading
      positions.forEach((position, index) => {
        const card = position.card!;
        const meaning = position.isReversed ? card.reversedMeaning : card.uprightMeaning;
        
        interpretation += `${position.name} - ${card.name}${position.isReversed ? ' (Reversed)' : ''}:\n`;
        interpretation += `${meaning}\n\n`;
      });

      interpretation += "These three cards weave together a story of your journey. ";
      interpretation += "The past has laid the foundation, the present offers opportunities for action, ";
      interpretation += "and the future beckons with possibility. ";
    }

    interpretation += "\nRemember, the cards offer guidance, but you hold the power to shape your destiny. ";
    interpretation += "May this reading illuminate your path and bring you clarity on your journey forward.";
    
    return interpretation;
  }, []);

  const generateReading = useCallback(async (
    selectedSpread: ReadingType,
    question: string,
    onComplete: (reading: TarotReadingType) => void
  ) => {
    setIsGeneratingReading(true);
    
    try {
      // Simulate mystical delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
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
        title: "✨ Your reading is complete",
        description: "The cosmic energies have spoken...",
      });
    } catch (error) {
      toast({
        title: "Reading failed",
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
