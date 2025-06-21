
import React, { useCallback } from 'react';
import { useReadingFlow } from '@/hooks/useReadingFlow';
import { useReadingGeneration } from '@/hooks/useReadingGeneration';
import ReadingHeader from './ReadingHeader';
import QuestionInput from './QuestionInput';
import SpreadSelector from './SpreadSelector';
import ReadingControls from './ReadingControls';
import ReadingDisplay from './ReadingDisplay';

const ReadingContainer: React.FC = () => {
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

  const { isGeneratingReading, generateReading } = useReadingGeneration();

  const handleGenerateReading = useCallback(() => {
    generateReading(selectedSpread, question, handleReadingComplete);
  }, [generateReading, selectedSpread, question, handleReadingComplete]);

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
        <ReadingHeader />

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
          <ReadingControls
            selectedSpread={selectedSpread}
            question={question}
            isGeneratingReading={isGeneratingReading}
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
              isGeneratingReading={isGeneratingReading}
              onGenerateReading={handleGenerateReading}
              onNewReading={resetReading}
              showNewReading={true}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReadingContainer;
