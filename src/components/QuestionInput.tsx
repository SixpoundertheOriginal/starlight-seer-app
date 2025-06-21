
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Sparkles, Moon } from 'lucide-react';

interface QuestionInputProps {
  onQuestionSubmit: (question: string) => void;
  onSkip: () => void;
  isLoading?: boolean;
}

const QuestionInput: React.FC<QuestionInputProps> = React.memo(({ 
  onQuestionSubmit, 
  onSkip, 
  isLoading = false 
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (question.trim()) {
      onQuestionSubmit(question.trim());
    } else {
      onSkip();
    }
  };

  return (
    <Card className="mystical-border p-8 mb-12 rounded-3xl max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Moon className="w-6 h-6 text-gold-400 mr-3" />
          <h2 className="text-2xl font-bold cosmic-text">Ask the Universe</h2>
          <Sparkles className="w-6 h-6 text-gold-400 ml-3" />
        </div>
        <p className="text-gold-200 text-lg">
          Focus your intention and ask a question that seeks guidance from the cosmic energies
        </p>
      </div>

      <div className="space-y-6">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What guidance do you seek? (Optional - you can also proceed without a specific question)"
          className="min-h-[120px] text-lg bg-cosmic-purple/20 border-gold-400/30 text-gold-100 placeholder-gold-300/60 resize-none focus:border-gold-400 focus:ring-gold-400/30"
          maxLength={300}
        />
        
        <div className="text-right text-sm text-gold-300/60">
          {question.length}/300 characters
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mystical-button text-mystical-dark font-semibold px-8 py-3 text-lg rounded-full"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {question.trim() ? 'Seek Guidance' : 'Draw Cards'}
          </Button>
          
          <Button
            onClick={onSkip}
            variant="outline"
            disabled={isLoading}
            className="border-gold-400/50 text-gold-200 hover:bg-gold-400/10 px-8 py-3 text-lg rounded-full backdrop-blur-sm"
          >
            Skip Question
          </Button>
        </div>
      </div>
    </Card>
  );
});

QuestionInput.displayName = 'QuestionInput';

export default QuestionInput;
