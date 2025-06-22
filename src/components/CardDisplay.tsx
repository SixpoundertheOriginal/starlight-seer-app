
import React, { useState } from 'react';
import { TarotCard } from '@/types/tarot';
import { Star, Sparkles, RotateCcw, Image } from 'lucide-react';

interface CardDisplayProps {
  card: TarotCard;
  position?: string;
  isReversed?: boolean;
  isFlipped: boolean;
  onFlip?: () => void;
  disabled?: boolean;
  className?: string;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  position,
  isReversed = false,
  isFlipped,
  onFlip,
  disabled = false,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (disabled || isAnimating || !onFlip) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onFlip();
      setIsAnimating(false);
    }, 400);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {position && (
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold cosmic-text">{position}</h3>
        </div>
      )}
      
      <div 
        className={`tarot-card ${isAnimating ? 'animate-card-flip' : ''} ${
          disabled ? 'opacity-50 cursor-not-allowed' : onFlip ? 'cursor-pointer' : ''
        } ${isReversed ? 'transform rotate-180' : ''}`}
        onClick={handleClick}
        role={onFlip ? "button" : undefined}
        tabIndex={onFlip && !disabled ? 0 : undefined}
        onKeyDown={(e) => {
          if (onFlip && !disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={onFlip ? `Flip card ${card.name}` : `Tarot card: ${card.name}`}
      >
        {/* Card Back */}
        <div className={`tarot-card-back ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-3 border border-gold-400/40 rounded-lg">
              <div className="w-full h-full flex items-center justify-center relative">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-gold-400 animate-pulse z-10" />
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold-300 absolute top-2 right-2 animate-pulse" 
                  style={{ animationDelay: '0.5s' }} />
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gold-300 absolute bottom-2 left-2 animate-pulse" 
                  style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Mystical symbols */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-gold-400/30 rounded-full animate-pulse" 
              style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-6 right-6 w-1 h-1 bg-gold-300/40 rounded-full animate-pulse" 
              style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-gold-400/20 rounded-full animate-pulse" 
              style={{ animationDelay: '2.5s' }}></div>
            <div className="absolute bottom-6 left-6 w-1 h-1 bg-gold-300/30 rounded-full animate-pulse" 
              style={{ animationDelay: '3s' }}></div>
          </div>
        </div>
        
        {/* Card Front */}
        <div className={`tarot-card-front ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          <div className="text-center h-full flex flex-col justify-center items-center relative">
            {/* Custom Image or Default Layout */}
            {card.imageUrl && !imageError ? (
              <div className="w-full h-full relative rounded-lg overflow-hidden">
                <img 
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
                
                {/* Image overlay with card info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30">
                  <div className="absolute top-2 left-2 right-2">
                    <div className="text-xs font-bold text-white/90 uppercase tracking-wide text-center">
                      {card.suit && `${card.suit} • `}{card.type === 'major' ? 'Major Arcana' : 'Minor Arcana'}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-sm font-bold font-serif text-white text-center mb-1">
                      {card.name}
                    </div>
                    <div className="text-xs text-white/80 text-center leading-tight">
                      {card.keywords.slice(0, 3).join(' • ')}
                    </div>
                  </div>
                </div>
                
                {/* Reversed indicator for image cards */}
                {isReversed && (
                  <div className="absolute top-2 right-2">
                    <RotateCcw className="w-3 h-3 text-white/80" />
                  </div>
                )}
              </div>
            ) : (
              // Default text-based layout for cards without images
              <>
                {/* Card name and suit info */}
                <div className="text-xs md:text-sm font-bold mb-2 text-mystical-dark/70 uppercase tracking-wide">
                  {card.suit && `${card.suit} • `}{card.type === 'major' ? 'Major Arcana' : 'Minor Arcana'}
                </div>
                
                <div className="text-sm md:text-lg font-bold mb-3 font-serif text-mystical-dark leading-tight px-2 text-center">
                  {card.name}
                </div>
                
                {/* Card symbol */}
                <div className="mb-3 flex items-center justify-center">
                  {card.suit === 'cups' && <div className="text-2xl">♱</div>}
                  {card.suit === 'pentacles' && <div className="text-2xl">⬟</div>}
                  {card.suit === 'swords' && <div className="text-2xl">⚔</div>}
                  {card.suit === 'wands' && <div className="text-2xl">⚡</div>}
                  {card.type === 'major' && !card.imageUrl && <Star className="w-5 h-5 md:w-6 md:h-6 text-gold-700" />}
                  {card.type === 'major' && card.imageUrl && imageError && <Image className="w-5 h-5 md:w-6 md:h-6 text-gold-700" />}
                </div>
                
                {/* Keywords */}
                <div className="text-xs text-mystical-dark/60 text-center px-2 leading-tight">
                  {card.keywords.slice(0, 3).join(' • ')}
                </div>
                
                {/* Reversed indicator */}
                {isReversed && (
                  <div className="absolute top-2 right-2">
                    <RotateCcw className="w-3 h-3 text-gold-600/60" />
                  </div>
                )}
                
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-1 h-1 bg-gold-600/40 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-gold-600/40 rounded-full"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-gold-600/40 rounded-full"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;
