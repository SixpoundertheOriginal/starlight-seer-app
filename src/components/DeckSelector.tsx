
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Star, Shuffle } from 'lucide-react';
import { useDeckSelection } from '@/hooks/useDeckSelection';
import { DeckType } from '@/hooks/useCustomCardStorage';

interface DeckSelectorProps {
  onDeckChange?: (deckType: DeckType) => void;
}

const DeckSelector: React.FC<DeckSelectorProps> = ({ onDeckChange }) => {
  const { deckType, setDeckType, getDeckInfo } = useDeckSelection();

  const handleDeckChange = async (newDeckType: DeckType) => {
    await setDeckType(newDeckType);
    onDeckChange?.(newDeckType);
  };

  const deckOptions = [
    {
      type: 'custom' as DeckType,
      name: 'Custom Deck',
      description: 'Your personalized 15-card mystical deck',
      icon: <Star className="w-5 h-5" />,
      gradient: 'from-purple-600 via-blue-600 to-purple-700'
    },
    {
      type: 'traditional' as DeckType,
      name: 'Traditional Tarot',
      description: 'Classic 78-card Rider-Waite-Smith deck',
      icon: <Sparkles className="w-5 h-5" />,
      gradient: 'from-gold-600 via-yellow-600 to-gold-700'
    },
    {
      type: 'mixed' as DeckType,
      name: 'Mixed Deck',
      description: 'Combination of traditional and custom cards',
      icon: <Shuffle className="w-5 h-5" />,
      gradient: 'from-emerald-600 via-teal-600 to-emerald-700'
    }
  ];

  const currentDeckInfo = getDeckInfo();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold cosmic-text mb-2">Choose Your Deck</h3>
        <p className="text-gold-300/80">
          Currently using: <span className="text-gold-200 font-semibold">{currentDeckInfo.name}</span>
          <span className="text-gold-400/60 ml-2">({currentDeckInfo.cardCount} cards)</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {deckOptions.map((option) => (
          <Card 
            key={option.type}
            className={`mystical-border p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
              deckType === option.type 
                ? 'ring-2 ring-gold-400 bg-gold-400/10' 
                : 'hover:bg-gold-400/5'
            }`}
            onClick={() => handleDeckChange(option.type)}
          >
            <div className="text-center space-y-4">
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${option.gradient}`}>
                {option.icon}
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gold-200 mb-2">
                  {option.name}
                </h4>
                <p className="text-sm text-gold-300/70 leading-relaxed">
                  {option.description}
                </p>
              </div>

              {deckType === option.type && (
                <div className="pt-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/30">
                    <Star className="w-3 h-3 text-gold-400 mr-1" />
                    <span className="text-xs text-gold-200 font-medium">Selected</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          className="border-gold-400/50 text-gold-200 hover:bg-gold-400/10"
          onClick={() => handleDeckChange(deckType)}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Refresh Deck Selection
        </Button>
      </div>
    </div>
  );
};

export default DeckSelector;
