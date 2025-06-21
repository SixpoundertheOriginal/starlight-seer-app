
import React, { useState } from 'react';
import TarotCard from './TarotCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SelectedCard {
  id: number;
  name: string;
}

const tarotCards = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World"
];

const TarotReading: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [reading, setReading] = useState<string>('');
  const [isGeneratingReading, setIsGeneratingReading] = useState(false);
  const { toast } = useToast();

  const handleCardFlip = (cardId: number) => {
    if (selectedCards.length >= 3 && !flippedCards.includes(cardId)) {
      toast({
        title: "Maximum cards selected",
        description: "Please generate your reading or reset to select different cards.",
        variant: "destructive"
      });
      return;
    }

    setFlippedCards(prev => {
      const newFlipped = prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId];
      
      const newSelected = newFlipped.map(id => ({
        id,
        name: tarotCards[id % tarotCards.length]
      }));
      
      setSelectedCards(newSelected);
      return newFlipped;
    });
  };

  const generateReading = async () => {
    if (selectedCards.length === 0) {
      toast({
        title: "No cards selected",
        description: "Please select at least one card for your reading.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingReading(true);
    
    try {
      // In a real implementation, you would make an API call to OpenAI here
      // For now, we'll simulate with a timeout and generate a mystical reading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const cardNames = selectedCards.map(card => card.name).join(', ');
      const mysticalReading = generateMysticalReading(selectedCards);
      
      setReading(mysticalReading);
      
      toast({
        title: "Your reading is complete",
        description: `The cards ${cardNames} have spoken...`,
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

  const generateMysticalReading = (cards: SelectedCard[]): string => {
    const readings = {
      "The Fool": "A new journey awaits you, filled with infinite possibilities. Trust in your inner wisdom and take that leap of faith.",
      "The Magician": "You possess all the tools needed to manifest your desires. Focus your will and channel your energy towards your goals.",
      "The High Priestess": "Listen to your intuition and inner voice. Hidden knowledge and secrets will soon be revealed.",
      "The Star": "Hope, healing, and spiritual guidance illuminate your path. A period of peace and inspiration is coming.",
      "The Moon": "Illusions may cloud your judgment. Trust your instincts and navigate through uncertainty with patience.",
      "The Sun": "Joy, success, and vitality shine upon you. This is a time of achievement and positive energy."
    };

    let reading = "The cosmic forces have aligned to bring you this message:\n\n";
    
    cards.forEach((card, index) => {
      const position = index === 0 ? "Past" : index === 1 ? "Present" : "Future";
      const cardReading = readings[card.name as keyof typeof readings] || 
        `${card.name} brings powerful energy and transformation to your journey.`;
      
      reading += `${position} - ${card.name}:\n${cardReading}\n\n`;
    });

    reading += "The stars have spoken. May this guidance illuminate your path forward.";
    
    return reading;
  };

  const resetReading = () => {
    setSelectedCards([]);
    setFlippedCards([]);
    setReading('');
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient py-8 px-4">
      <div className="floating-stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold cosmic-text mb-4 font-serif">
            Mystical Tarot
          </h1>
          <p className="text-gold-200 text-lg md:text-xl max-w-2xl mx-auto">
            Select up to three cards to reveal the cosmic wisdom that awaits you
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-4 mb-8 justify-items-center">
          {tarotCards.map((cardName, index) => (
            <TarotCard
              key={index}
              id={index}
              name={cardName}
              isFlipped={flippedCards.includes(index)}
              onFlip={handleCardFlip}
              disabled={selectedCards.length >= 3 && !flippedCards.includes(index)}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={generateReading}
            disabled={selectedCards.length === 0 || isGeneratingReading}
            className="bg-gold-600 hover:bg-gold-700 text-mystical-dark font-semibold px-8 py-3 text-lg"
          >
            {isGeneratingReading ? (
              <>
                <Star className="w-5 h-5 mr-2 animate-spin" />
                Consulting the Stars...
              </>
            ) : (
              'Generate Reading'
            )}
          </Button>
          
          <Button
            onClick={resetReading}
            variant="outline"
            className="border-gold-400/50 text-gold-200 hover:bg-gold-400/10 px-8 py-3 text-lg"
          >
            Reset Cards
          </Button>
        </div>

        {selectedCards.length > 0 && (
          <Card className="mystical-border p-6 mb-8">
            <h3 className="text-xl font-semibold cosmic-text mb-4">Selected Cards:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCards.map((card, index) => (
                <span
                  key={card.id}
                  className="bg-gold-400/20 text-gold-200 px-3 py-1 rounded-full text-sm border border-gold-400/30"
                >
                  {card.name}
                </span>
              ))}
            </div>
          </Card>
        )}

        {reading && (
          <Card className="mystical-border p-8">
            <h2 className="text-2xl font-bold cosmic-text mb-6 text-center">Your Reading</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gold-100 leading-relaxed whitespace-pre-line text-lg">
                {reading}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TarotReading;
