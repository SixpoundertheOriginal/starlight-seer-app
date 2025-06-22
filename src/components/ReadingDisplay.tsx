
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { TarotReading } from '@/types/tarot';
import { Sparkles, Star } from 'lucide-react';
import CardDisplay from './CardDisplay';
import { useSpreadAnimations } from '@/hooks/useSpreadAnimations';

interface ReadingDisplayProps {
  reading: TarotReading;
}

const ReadingDisplay: React.FC<ReadingDisplayProps> = React.memo(({ reading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { getCardAnimation, getConnectionGlow } = useSpreadAnimations(
    reading.spread.id as any, 
    isVisible
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const renderCardLayout = () => {
    const { spread } = reading;
    
    if (spread.id === 'single-card') {
      return (
        <div className="text-center">
          <CardDisplay
            card={spread.positions[0].card!}
            position={spread.positions[0].name}
            isReversed={spread.positions[0].isReversed}
            isFlipped={true}
            className="mx-auto"
          />
        </div>
      );
    }
    
    if (spread.id === 'three-card') {
      return (
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {spread.positions.map((position) => (
            <div key={position.id} className="text-center">
              <CardDisplay
                card={position.card!}
                position={position.name}
                isReversed={position.isReversed}
                isFlipped={true}
              />
            </div>
          ))}
        </div>
      );
    }
    
    if (spread.id === 'relationship') {
      return (
        <div className="max-w-4xl mx-auto relative">
          {/* Connection Glow Effect */}
          <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent ${getConnectionGlow()}`}></div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className={getCardAnimation(0)}>
              <CardDisplay
                card={spread.positions[0].card!}
                position={spread.positions[0].name}
                isReversed={spread.positions[0].isReversed}
                isFlipped={true}
              />
            </div>
            <div className={getCardAnimation(1)}>
              <CardDisplay
                card={spread.positions[1].card!}
                position={spread.positions[1].name}
                isReversed={spread.positions[1].isReversed}
                isFlipped={true}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {spread.positions.slice(2).map((position, index) => (
              <div key={position.id} className={`text-center ${getCardAnimation(index + 2)}`}>
                <CardDisplay
                  card={position.card!}
                  position={position.name}
                  isReversed={position.isReversed}
                  isFlipped={true}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (spread.id === 'celtic-cross') {
      const positions = spread.positions;
      return (
        <div className="max-w-6xl mx-auto">
          {/* Celtic Cross Layout */}
          <div className="relative">
            {/* Cross Formation */}
            <div className="grid grid-cols-3 gap-4 mb-8" style={{ gridTemplateRows: 'auto auto auto auto auto' }}>
              {/* Top */}
              <div></div>
              <div className="flex justify-center">
                <div className={getCardAnimation(4)}>
                  <CardDisplay
                    card={positions[2].card!}
                    position={positions[2].name}
                    isReversed={positions[2].isReversed}
                    isFlipped={true}
                  />
                </div>
              </div>
              <div></div>
              
              {/* Middle Row */}
              <div className="flex justify-center">
                <div className={getCardAnimation(2)}>
                  <CardDisplay
                    card={positions[6].card!}
                    position={positions[6].name}
                    isReversed={positions[6].isReversed}
                    isFlipped={true}
                  />
                </div>
              </div>
              <div className="relative flex justify-center">
                <div className={getCardAnimation(0)}>
                  <CardDisplay
                    card={positions[0].card!}
                    position={positions[0].name}
                    isReversed={positions[0].isReversed}
                    isFlipped={true}
                  />
                </div>
                <div className={`absolute inset-0 flex items-center justify-center z-10 ${getCardAnimation(1)}`}>
                  <CardDisplay
                    card={positions[1].card!}
                    position={positions[1].name}
                    isReversed={positions[1].isReversed}
                    isFlipped={true}
                    className="transform rotate-90 scale-75 opacity-90"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className={getCardAnimation(5)}>
                  <CardDisplay
                    card={positions[7].card!}
                    position={positions[7].name}
                    isReversed={positions[7].isReversed}
                    isFlipped={true}
                  />
                </div>
              </div>
              
              {/* Bottom */}
              <div></div>
              <div className="flex justify-center">
                <div className={getCardAnimation(3)}>
                  <CardDisplay
                    card={positions[3].card!}
                    position={positions[3].name}
                    isReversed={positions[3].isReversed}
                    isFlipped={true}
                  />
                </div>
              </div>
              <div></div>
            </div>
            
            {/* Staff Cards */}
            <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[4, 5, 8, 9].map((posIndex, staffIndex) => (
                <div key={positions[posIndex].id} className={getCardAnimation(staffIndex + 6)}>
                  <CardDisplay
                    card={positions[posIndex].card!}
                    position={positions[posIndex].name}
                    isReversed={positions[posIndex].isReversed}
                    isFlipped={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    // Default grid layout for other spreads
    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {spread.positions.map((position) => (
          <div key={position.id} className="text-center">
            <CardDisplay
              card={position.card!}
              position={position.name}
              isReversed={position.isReversed}
              isFlipped={true}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Question Display */}
      {reading.question && (
        <Card className="mystical-border p-6 rounded-2xl">
          <div className="text-center">
            <h3 className="text-xl font-semibold cosmic-text mb-3">Your Question</h3>
            <p className="text-gold-200 text-lg italic leading-relaxed">
              "{reading.question}"
            </p>
          </div>
        </Card>
      )}

      {/* Cards Display */}
      <div className="grid gap-8 justify-items-center">
        {renderCardLayout()}
      </div>

      {/* Reading Interpretation */}
      <Card className="reading-container p-8 md:p-12 rounded-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold cosmic-text mb-4">
            Your Cosmic Reading
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
            <Sparkles className="w-6 h-6 text-gold-400" />
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <div className="text-gold-100 leading-relaxed whitespace-pre-line text-lg md:text-xl reading-text">
            {reading.interpretation}
          </div>
        </div>

        {/* Card Meanings */}
        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-semibold cosmic-text text-center mb-6">
            Card Meanings
          </h3>
          
          {reading.spread.positions.map((position) => (
            <div key={position.id} className="border-t border-gold-400/20 pt-6">
              <div className="flex items-start gap-4">
                <Star className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gold-300 mb-2">
                    {position.name}: {position.card!.name}
                    {position.isReversed && (
                      <span className="text-sm text-gold-400/70 ml-2">(Reversed)</span>
                    )}
                  </h4>
                  <p className="text-gold-200 leading-relaxed">
                    {position.isReversed 
                      ? position.card!.reversedMeaning 
                      : position.card!.uprightMeaning
                    }
                  </p>
                  <div className="mt-2 text-sm text-gold-300/70">
                    <strong>Keywords:</strong> {position.card!.keywords.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';

export default ReadingDisplay;
