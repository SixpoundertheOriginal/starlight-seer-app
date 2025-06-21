
import { useState, useCallback } from 'react';
import { ReadingType, TarotReading } from '@/types/tarot';

export type ReadingStep = 'question' | 'spread' | 'reading' | 'result';

export const useReadingFlow = () => {
  const [currentStep, setCurrentStep] = useState<ReadingStep>('question');
  const [question, setQuestion] = useState<string>('');
  const [selectedSpread, setSelectedSpread] = useState<ReadingType>('single');
  const [currentReading, setCurrentReading] = useState<TarotReading | null>(null);

  const handleQuestionSubmit = useCallback((userQuestion: string) => {
    setQuestion(userQuestion);
    setCurrentStep('spread');
  }, []);

  const handleSpreadSelection = useCallback(() => {
    setCurrentStep('reading');
  }, []);

  const handleReadingComplete = useCallback((reading: TarotReading) => {
    setCurrentReading(reading);
    setCurrentStep('result');
  }, []);

  const resetReading = useCallback(() => {
    setCurrentStep('question');
    setQuestion('');
    setSelectedSpread('single');
    setCurrentReading(null);
  }, []);

  return {
    currentStep,
    question,
    selectedSpread,
    currentReading,
    setSelectedSpread,
    handleQuestionSubmit,
    handleSpreadSelection,
    handleReadingComplete,
    resetReading
  };
};
