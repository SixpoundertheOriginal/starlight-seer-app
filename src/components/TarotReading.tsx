
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Moon, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TarotReading as TarotReadingType, ReadingType, TarotCard, CardPosition } from '@/types/tarot';
import { getRandomCards } from '@/data/tarotDeck';
import { SPREADS } from '@/data/spreads';
import QuestionInput from './QuestionInput';
import SpreadSelector from './SpreadSelector';
import ReadingDisplay from './ReadingDisplay';

type ReadingStep = 'question' | 'spread' | 'reading' | 'result';

const TarotReading: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ReadingStep>('question');
  const [question, setQuestion] = useState<string>('');
  const [selectedSpread, setSelectedSpread] = useState<ReadingType>('single');
  const [currentReading, setCurrentReading] = useState<TarotReadingType | null>(null);
  const [isGeneratingReading, setIsGeneratingReading] = useState(false);
  const { toast } = useToast();

  const handleQuestionSubmit = (userQuestion: string) => {
    setQuestion(userQuestion);
    setCurrentStep('spread');
  };

  const handleSpreadSelection = () => {
    setCurrentStep('reading');
  };

  const generateReading = async () => {
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

      setCurrentReading(reading);
      setCurrentStep('result');
      
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
  };

  const generateInterpretation = (positions: CardPosition[], userQuestion?: string): string => {
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
  };

  const resetReading = () => {
    setCurrentStep('question');
    setQuestion('');
    setSelectedSpread('single');
    setCurrentReading(null);
    setIsGeneratingReading(false);
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient py-12 px-4 relative">
      {/* Enhanced Background Effects */}
      <div className="constellation-bg"></div>
      <div className="floating-particles">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Moon className="w-8 h-8 text-gold-400 mr-4 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold cosmic-text font-serif">
              Mystical Tarot
            </h1>
            <Sparkles className="w-8 h-8 text-gold-400 ml-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-gold-200 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Discover the wisdom of the cosmic energies through the ancient art of tarot
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
            <Star className="w-6 h-6 text-gold-400 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'question' && (
          <QuestionInput
            onQuestionSubmit={handleQuestionSubmit}
            onSkip={() => handleQuestionSubmit('')}
            isLoading={isGeneratingReading}
          />
        )}

        {currentStep === 'spread' && (
          <SpreadSelector
            selectedSpread={selectedSpread}
            onSpreadSelect={setSelectedSpread}
            onProceed={handleSpreadSelection}
          />
        )}

        {currentStep === 'reading' && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold cosmic-text mb-4">
                {selectedSpread === 'single' ? 'Single Card Draw' : 'Past, Present, Future'}
              </h2>
              <p className="text-gold-200 text-lg">
                The cards are ready to reveal their wisdom. Click below to begin your reading.
              </p>
              {question && (
                <div className="mt-4 p-4 bg-gold-400/10 border border-gold-400/20 rounded-lg">
                  <p className="text-gold-300 italic">Your Question: "{question}"</p>
                </div>
              )}
            </div>

            <Button
              onClick={generateReading}
              disabled={isGeneratingReading}
              className="mystical-button text-mystical-dark font-semibold px-12 py-4 text-xl rounded-full"
            >
              {isGeneratingReading ? (
                <>
                  <Star className="w-6 h-6 mr-3 animate-spin" />
                  Consulting the Cosmic Forces...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-3" />
                  Draw Cards
                </>
              )}
            </Button>
          </div>
        )}

        {currentStep === 'result' && currentReading && (
          <div>
            <ReadingDisplay reading={currentReading} />
            
            <div className="text-center mt-12">
              <Button
                onClick={resetReading}
                variant="outline"
                className="border-gold-400/50 text-gold-200 hover:bg-gold-400/10 px-10 py-4 text-xl rounded-full backdrop-blur-sm"
              >
                <RotateCcw className="w-6 h-6 mr-3" />
                New Reading
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TarotReading;
