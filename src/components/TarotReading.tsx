import React, { useState } from 'react';
import TarotCard from './TarotCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Sparkles, Moon } from 'lucide-react';
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
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const cardNames = selectedCards.map(card => card.name).join(', ');
      const mysticalReading = generateMysticalReading(selectedCards);
      
      setReading(mysticalReading);
      
      toast({
        title: "✨ Your reading is complete",
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
    <div className="min-h-screen bg-cosmic-gradient py-12 px-4 relative">
      {/* Enhanced Background Effects */}
      <div className="constellation-bg"></div>
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
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
            Select up to three cards to reveal the cosmic wisdom that awaits you
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
            <Star className="w-6 h-6 text-gold-400 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
          </div>
        </div>

        {/* Enhanced Card Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-6 mb-12 justify-items-center px-4">
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

        {/* Enhanced Control Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
          <Button
            onClick={generateReading}
            disabled={selectedCards.length === 0 || isGeneratingReading}
            className="mystical-button text-mystical-dark font-semibold px-10 py-4 text-xl rounded-full relative"
          >
            {isGeneratingReading ? (
              <>
                <Star className="w-6 h-6 mr-3 animate-spin" />
                Consulting the Cosmic Forces...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-3" />
                Generate Reading
              </>
            )}
          </Button>
          
          <Button
            onClick={resetReading}
            variant="outline"
            className="border-gold-400/50 text-gold-200 hover:bg-gold-400/10 px-10 py-4 text-xl rounded-full backdrop-blur-sm"
          >
            <Moon className="w-6 h-6 mr-3" />
            Reset Cards
          </Button>
        </div>

        {/* Enhanced Selected Cards Display */}
        {selectedCards.length > 0 && (
          <Card className="mystical-border p-8 mb-12 rounded-2xl">
            <h3 className="text-2xl font-semibold cosmic-text mb-6 text-center">Selected Cards</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {selectedCards.map((card, index) => (
                <span
                  key={card.id}
                  className="selected-card-badge"
                >
                  <Star className="w-4 h-4 mr-2 text-gold-400" />
                  {card.name}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Enhanced Reading Display */}
        {reading && (
          <Card className="reading-container p-12 rounded-3xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold cosmic-text mb-4">Your Cosmic Reading</h2>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
                <Sparkles className="w-6 h-6 text-gold-400" />
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-gold-100 leading-relaxed whitespace-pre-line text-lg md:text-xl reading-text">
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
