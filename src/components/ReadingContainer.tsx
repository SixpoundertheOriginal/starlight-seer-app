import React, { useCallback, useState } from 'react';
import { useReadingFlow } from '@/hooks/useReadingFlow';
import { useAIReadingGeneration } from '@/hooks/useAIReadingGeneration';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { useDeckSelection } from '@/hooks/useDeckSelection';
import ReadingHeader from './ReadingHeader';
import QuestionInput from './QuestionInput';
import SpreadSelector from './SpreadSelector';
import ReadingControls from './ReadingControls';
import ReadingDisplay from './ReadingDisplay';
import CardShuffleAnimation from './CardShuffleAnimation';
import ReadingHistory from './ReadingHistory';
import DeckSelector from './DeckSelector';
import { Button } from '@/components/ui/button';
import { History, Settings } from 'lucide-react';
import { TarotReading } from '@/types/tarot';

const ReadingContainer: React.FC = () => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDeckSelector, setShowDeckSelector] = useState(false);
  
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
  const { getDeckInfo } = useDeckSelection();

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

  // Updated card count logic to properly handle all spread types
  const getCardCount = (spreadType: ReadingType): number => {
    switch (spreadType) {
      case 'single':
        return 1;
      case 'three-card':
        return 3;
      case 'celtic-cross':
        return 10;
      case 'relationship':
        return 5;
      default:
        return 3;
    }
  };

  const cardCount = getCardCount(selectedSpread);
  const deckInfo = getDeckInfo();

  return (
    <div className="min-h-screen bg-cosmic-gradient py-12 px-4 relative">
      {/* Enhanced Background Effects */}
      <div className="constellation-bg"></div>
      <div className="floating-particles">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* Top Controls */}
      <div className="fixed top-6 right-6 z-40 flex gap-3">
        <Button
          onClick={() => setShowDeckSelector(true)}
          variant="outline"
          className="border-gold-400/50 text-gold-200 hover:bg-gold-400/10 backdrop-blur-sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          {deckInfo.name}
        </Button>
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

        {/* Deck Selector Modal */}
        {showDeckSelector && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-cosmic-gradient max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-8 relative">
              <Button
                onClick={() => setShowDeckSelector(false)}
                variant="ghost"
                className="absolute top-4 right-4 text-gold-300 hover:text-gold-100"
              >
                ✕
              </Button>
              <DeckSelector onDeckChange={() => setShowDeckSelector(false)} />
            </div>
          </div>
        )}

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

      {/* Shuffle Animation with correct card count */}
      <CardShuffleAnimation
        isShuffling={isShuffling}
        onShuffleComplete={handleShuffleComplete}
        cardCount={cardCount}
        spreadType={selectedSpread}
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
