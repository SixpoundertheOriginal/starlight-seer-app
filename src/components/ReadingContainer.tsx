
import React, { useCallback, useState } from 'react';
import { useReadingFlow } from '@/hooks/useReadingFlow';
import { useAIReadingGeneration } from '@/hooks/useAIReadingGeneration';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import ReadingHeader from './ReadingHeader';
import QuestionInput from './QuestionInput';
import SpreadSelector from './SpreadSelector';
import ReadingControls from './ReadingControls';
import ReadingDisplay from './ReadingDisplay';
import CardShuffleAnimation from './CardShuffleAnimation';
import ReadingHistory from './ReadingHistory';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { TarotReading } from '@/types/tarot';

const ReadingContainer: React.FC = () => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const {
    currentStep,
    question,
    selectedSpread,
    currentReading,
    setSelectedSpread,
    handleQuestionSubmit,
    handleSpreadSelection,
    handleReadingComplete,
    resetReading
  } = useReadingFlow();

  const { isGeneratingReading, generateReading } = useAIReadingGeneration();
  const { saveReading } = useReadingHistory();

  const handleGenerateReading = useCallback(() => {
    setIsShuffling(true);
  }, []);

  const handleShuffleComplete = useCallback(() => {
    setIsShuffling(false);
    generateReading(selectedSpread, question, (reading) => {
      handleReadingComplete(reading);
      saveReading(reading);
    });
  }, [generateReading, selectedSpread, question, handleReadingComplete, saveReading]);

  const handleSelectHistoryReading = useCallback((reading: TarotReading) => {
    handleReadingComplete(reading);
    setShowHistory(false);
  }, [handleReadingComplete]);

  const cardCount = selectedSpread === 'single' ? 1 : 3;

  return (
    <div className="min-h-screen bg-cosmic-gradient py-12 px-4 relative">
      {/* Enhanced Background Effects */}
      <div className="constellation-bg"></div>
      <div className="floating-particles">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* History Button */}
      <div className="fixed top-6 right-6 z-40">
        <Button
          onClick={() => setShowHistory(true)}
          variant="outline"
          className="border-gold-400/50 text-gold-200 hover:bg-gold-400/10 backdrop-blur-sm"
        >
          <History className="w-4 h-4 mr-2" />
          History
        </Button>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ReadingHeader />

        {/* Step Content */}
        {currentStep === 'question' && (
          <QuestionInput
            onQuestionSubmit={handleQuestionSubmit}
            onSkip={() => handleQuestionSubmit('')}
            isLoading={isGeneratingReading || isShuffling}
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
          <ReadingControls
            selectedSpread={selectedSpread}
            question={question}
            isGeneratingReading={isGeneratingReading || isShuffling}
            onGenerateReading={handleGenerateReading}
            onNewReading={resetReading}
          />
        )}

        {currentStep === 'result' && currentReading && (
          <>
            <ReadingDisplay reading={currentReading} />
            <ReadingControls
              selectedSpread={selectedSpread}
              question={question}
              isGeneratingReading={isGeneratingReading || isShuffling}
              onGenerateReading={handleGenerateReading}
              onNewReading={resetReading}
              showNewReading={true}
            />
          </>
        )}
      </div>

      {/* Shuffle Animation */}
      <CardShuffleAnimation
        isShuffling={isShuffling}
        onShuffleComplete={handleShuffleComplete}
        cardCount={cardCount}
      />

      {/* Reading History */}
      <ReadingHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectReading={handleSelectHistoryReading}
      />
    </div>
  );
};

export default ReadingContainer;
