
import React from 'react';
import { Card } from '@/components/ui/card';
import { TarotReading } from '@/types/tarot';
import { Sparkles, Star } from 'lucide-react';
import CardDisplay from './CardDisplay';

interface ReadingDisplayProps {
  reading: TarotReading;
}

const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ reading }) => {
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
        {reading.spread.id === 'single-card' ? (
          <div className="text-center">
            <CardDisplay
              card={reading.spread.positions[0].card!}
              position={reading.spread.positions[0].name}
              isReversed={reading.spread.positions[0].isReversed}
              isFlipped={true}
              className="mx-auto"
            />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {reading.spread.positions.map((position, index) => (
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
        )}
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
};

export default ReadingDisplay;
