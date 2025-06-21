
import React, { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';

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
      <div className={`tarot-card-back ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-3 border border-gold-400/40 rounded-lg">
            <div className="w-full h-full flex items-center justify-center relative">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-gold-400 animate-pulse z-10" />
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold-300 absolute top-2 right-2 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gold-300 absolute bottom-2 left-2 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          {/* Mystical symbols */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-gold-400/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-6 right-6 w-1 h-1 bg-gold-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-gold-400/20 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-gold-300/30 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>
      
      <div className={`tarot-card-front ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        <div className="text-center h-full flex flex-col justify-center items-center">
          <div className="text-sm md:text-lg font-bold mb-3 font-serif text-mystical-dark leading-tight px-2">{name}</div>
          <Star className="w-5 h-5 md:w-6 md:h-6 text-gold-700 mx-auto" />
          <div className="absolute top-2 left-2 w-1 h-1 bg-gold-600/40 rounded-full"></div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-gold-600/40 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-gold-600/40 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-gold-600/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TarotCard;
