
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, RotateCcw } from 'lucide-react';
import { ReadingType } from '@/types/tarot';

interface ReadingControlsProps {
  selectedSpread: ReadingType;
  question: string;
  isGeneratingReading: boolean;
  onGenerateReading: () => void;
  onNewReading: () => void;
  showNewReading?: boolean;
}

const ReadingControls: React.FC<ReadingControlsProps> = React.memo(({
  selectedSpread,
  question,
  isGeneratingReading,
  onGenerateReading,
  onNewReading,
  showNewReading = false
}) => {
  if (showNewReading) {
    return (
      <div className="text-center mt-12">
        <Button
          onClick={onNewReading}
          variant="outline"
          className="border-gold-400/50 text-gold-200 hover:bg-gold-400/10 px-10 py-4 text-xl rounded-full backdrop-blur-sm"
        >
          <RotateCcw className="w-6 h-6 mr-3" />
          New Reading
        </Button>
      </div>
    );
  }

  return (
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
        onClick={onGenerateReading}
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
  );
});

ReadingControls.displayName = 'ReadingControls';

export default ReadingControls;
