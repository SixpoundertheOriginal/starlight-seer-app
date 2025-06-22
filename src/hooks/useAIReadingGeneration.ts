
import { useState, useCallback } from 'react';
import { TarotReading as TarotReadingType, ReadingType, CardPosition } from '@/types/tarot';
import { useDeckSelection } from './useDeckSelection';
import { SPREADS } from '@/data/spreads';
import { useToast } from '@/hooks/use-toast';

export const useAIReadingGeneration = () => {
  const [isGeneratingReading, setIsGeneratingReading] = useState(false);
  const { toast } = useToast();
  const { getCardsFromSelectedDeck, getDeckInfo } = useDeckSelection();

  const generateAIInterpretation = useCallback(async (positions: CardPosition[], userQuestion?: string): Promise<string> => {
    try {
      const cardsDescription = positions.map(pos => 
        `${pos.name}: ${pos.card!.name}${pos.isReversed ? ' (Reversed)' : ''} - ${pos.isReversed ? pos.card!.reversedMeaning : pos.card!.uprightMeaning}`
      ).join('\n');

      const deckInfo = getDeckInfo();
      const prompt = `You are a mystical tarot reader with deep knowledge of the cosmic energies. You are reading from the ${deckInfo.name} (${deckInfo.description}). Provide a profound, insightful reading based on these cards:

${cardsDescription}

${userQuestion ? `The seeker asks: "${userQuestion}"` : 'This is a general guidance reading.'}

Please provide a mystical, flowing interpretation that:
- Speaks directly to the seeker with warmth and wisdom
- Weaves the cards together into a cohesive narrative
- Uses evocative, mystical language while remaining accessible
- Offers guidance and insight rather than predictions
- Acknowledges the seeker's power to shape their destiny
- Is approximately 200-300 words

Begin with "The cosmic tapestry reveals..." and maintain a tone of ancient wisdom throughout.`;

      const response = await fetch('/api/generate-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error('AI service unavailable');
      }

      const data = await response.json();
      return data.interpretation;
    } catch (error) {
      console.error('AI interpretation failed:', error);
      // Fallback to enhanced static interpretation
      return generateEnhancedStaticInterpretation(positions, userQuestion);
    }
  }, [getDeckInfo]);

  const generateEnhancedStaticInterpretation = useCallback((positions: CardPosition[], userQuestion?: string): string => {
    const deckInfo = getDeckInfo();
    let interpretation = `The cosmic tapestry reveals a profound message woven through the ancient symbols of the ${deckInfo.name}.\n\n`;
    
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
  }, [getDeckInfo]);

  const generateReading = useCallback(async (
    selectedSpread: ReadingType,
    question: string,
    onComplete: (reading: TarotReadingType) => void
  ) => {
    setIsGeneratingReading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const spread = { ...SPREADS[selectedSpread === 'single' ? 'single' : 'threeCard'] };
      const cardCount = spread.positions.length;
      const drawnCards = getCardsFromSelectedDeck(cardCount);
      
      spread.positions = spread.positions.map((position, index) => ({
        ...position,
        card: drawnCards[index],
        isReversed: Math.random() < 0.3
      }));

      const interpretation = await generateAIInterpretation(spread.positions, question);
      
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
        description: "Your mystical reading awaits...",
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
  }, [generateAIInterpretation, getCardsFromSelectedDeck, toast]);

  return {
    isGeneratingReading,
    generateReading
  };
};
