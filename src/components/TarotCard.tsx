
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface TarotCardProps {
  id: number;
  name: string;
  isFlipped: boolean;
  onFlip: (id: number) => void;
  disabled?: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({ id, name, isFlipped, onFlip, disabled = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (disabled || isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onFlip(id);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div 
      className={`tarot-card ${isAnimating ? 'animate-card-flip' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
    >
      <div className={`tarot-card-back ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-2 border border-gold-400/30 rounded-md">
            <div className="w-full h-full flex items-center justify-center">
              <Star className="w-8 h-8 text-gold-400 animate-pulse" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gold-shimmer animate-shimmer opacity-20"></div>
        </div>
      </div>
      
      <div className={`tarot-card-front ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <div className="text-center">
          <div className="text-lg font-bold mb-2 font-serif">{name}</div>
          <Star className="w-6 h-6 text-gold-600 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default TarotCard;
