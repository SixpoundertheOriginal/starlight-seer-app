
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Sparkles, Moon } from 'lucide-react';
import { ReadingType } from '@/types/tarot';

interface SpreadSelectorProps {
  selectedSpread: ReadingType;
  onSpreadSelect: (spread: ReadingType) => void;
  onProceed: () => void;
}

const SpreadSelector: React.FC<SpreadSelectorProps> = React.memo(({
  selectedSpread,
  onSpreadSelect,
  onProceed
}) => {
  const spreads = [
    {
      type: 'single' as ReadingType,
      name: 'Single Card',
      description: 'One card for daily guidance or quick insight',
      icon: Star,
      cards: 1
    },
    {
      type: 'three-card' as ReadingType,
      name: 'Past, Present, Future',
      description: 'Three cards revealing the flow of time and energy',
      icon: Moon,
      cards: 3
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold cosmic-text mb-4">Choose Your Spread</h2>
        <p className="text-gold-200 text-lg">
          Select the type of reading that resonates with your intention
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {spreads.map((spread) => {
          const Icon = spread.icon;
          const isSelected = selectedSpread === spread.type;
          
          return (
            <Card
              key={spread.type}
              className={`cursor-pointer transition-all duration-300 p-6 ${
                isSelected
                  ? 'mystical-border ring-2 ring-gold-400/50 bg-gold-400/5'
                  : 'border-gold-400/20 hover:border-gold-400/40 bg-background/40'
              }`}
              onClick={() => onSpreadSelect(spread.type)}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-gold-400' : 'text-gold-300'}`} />
                </div>
                
                <h3 className={`text-xl font-semibold mb-2 ${
                  isSelected ? 'cosmic-text' : 'text-gold-200'
                }`}>
                  {spread.name}
                </h3>
                
                <p className="text-gold-300/80 mb-4 text-sm leading-relaxed">
                  {spread.description}
                </p>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  isSelected
                    ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30'
                    : 'bg-gold-400/10 text-gold-300 border border-gold-400/20'
                }`}>
                  {spread.cards} Card{spread.cards > 1 ? 's' : ''}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button
          onClick={onProceed}
          className="mystical-button text-mystical-dark font-semibold px-10 py-4 text-xl rounded-full"
        >
          <Sparkles className="w-6 h-6 mr-3" />
          Begin Reading
        </Button>
      </div>
    </div>
  );
});

SpreadSelector.displayName = 'SpreadSelector';

export default SpreadSelector;
