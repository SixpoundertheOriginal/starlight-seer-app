
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { ReadingType } from '@/types/tarot';

interface CardShuffleAnimationProps {
  isShuffling: boolean;
  onShuffleComplete: () => void;
  cardCount: number;
  spreadType: ReadingType;
}

const CardShuffleAnimation: React.FC<CardShuffleAnimationProps> = ({
  isShuffling,
  onShuffleComplete,
  cardCount,
  spreadType
}) => {
  const [shuffleStage, setShuffleStage] = useState<'idle' | 'shuffling' | 'dealing'>('idle');

  useEffect(() => {
    if (isShuffling) {
      setShuffleStage('shuffling');
      
      // Shuffle phase
      setTimeout(() => {
        setShuffleStage('dealing');
      }, 2000);
      
      // Complete after dealing
      setTimeout(() => {
        setShuffleStage('idle');
        onShuffleComplete();
      }, 3000);
    }
  }, [isShuffling, onShuffleComplete]);

  if (!isShuffling && shuffleStage === 'idle') return null;

  const getShuffleText = () => {
    switch (spreadType) {
      case 'celtic-cross':
        return 'Preparing your Celtic Cross reading...';
      case 'relationship':
        return 'Arranging your Relationship spread...';
      case 'three-card':
        return 'Drawing your three cards...';
      case 'single':
        return 'Selecting your card...';
      default:
        return 'Shuffling the cosmic deck...';
    }
  };

  const getDealingText = () => {
    switch (spreadType) {
      case 'celtic-cross':
        return 'The sacred cross has formed...';
      case 'relationship':
        return 'The connection reveals itself...';
      default:
        return 'The cards have chosen their positions...';
    }
  };

  const getCardLayout = () => {
    if (cardCount <= 3) {
      // Single row for 1-3 cards
      return Array.from({ length: cardCount }, (_, i) => ({
        x: (i - (cardCount - 1) / 2) * 100,
        y: 0,
        rotate: (i - (cardCount - 1) / 2) * 5,
        delay: i * 0.2
      }));
    } else if (cardCount === 5) {
      // Relationship spread layout
      return [
        { x: -120, y: -40, rotate: -10, delay: 0 },    // You
        { x: 120, y: -40, rotate: 10, delay: 0.2 },    // Them
        { x: 0, y: 0, rotate: 0, delay: 0.4 },         // Connection
        { x: -80, y: 60, rotate: -5, delay: 0.6 },     // Challenges
        { x: 80, y: 60, rotate: 5, delay: 0.8 }        // Potential
      ];
    } else {
      // Celtic Cross layout (10 cards)
      return [
        { x: 0, y: 0, rotate: 0, delay: 0 },           // Present
        { x: 0, y: 0, rotate: 90, delay: 0.1 },        // Challenge (crossed)
        { x: -100, y: 0, rotate: -5, delay: 0.2 },     // Distant Past
        { x: 0, y: 80, rotate: 5, delay: 0.3 },        // Recent Past
        { x: 0, y: -80, rotate: -5, delay: 0.4 },      // Possible Outcome
        { x: 100, y: 0, rotate: 5, delay: 0.5 },       // Near Future
        { x: 200, y: -60, rotate: 0, delay: 0.6 },     // Your Approach
        { x: 200, y: -20, rotate: 0, delay: 0.7 },     // External Influences
        { x: 200, y: 20, rotate: 0, delay: 0.8 },      // Hopes & Fears
        { x: 200, y: 60, rotate: 0, delay: 0.9 }       // Final Outcome
      ];
    }
  };

  const cardPositions = getCardLayout();

  return (
    <div className="fixed inset-0 bg-cosmic-gradient/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <AnimatePresence mode="wait">
          {shuffleStage === 'shuffling' && (
            <motion.div
              key="shuffling"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-8"
            >
              <div className="relative">
                {/* Animated card stack */}
                <div className="relative w-32 h-48 mx-auto">
                  {Array.from({ length: 5 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 tarot-card-back rounded-xl"
                      animate={{
                        rotate: [0, -15, 15, -10, 5, 0],
                        x: [0, -20, 20, -10, 5, 0],
                        y: [0, -10, 10, -5, 2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                      style={{ zIndex: 5 - i }}
                    />
                  ))}
                </div>
                
                {/* Mystical particles */}
                {Array.from({ length: 8 }, (_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos(i * Math.PI / 4) * 100],
                      y: [0, Math.sin(i * Math.PI / 4) * 100],
                      opacity: [1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-gold-400" />
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-gold-300 text-xl font-serif"
              >
                {getShuffleText()}
              </motion.div>
            </motion.div>
          )}
          
          {shuffleStage === 'dealing' && (
            <motion.div
              key="dealing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="relative flex justify-center items-center" style={{ minHeight: '200px', minWidth: '400px' }}>
                {cardPositions.map((position, i) => (
                  <motion.div
                    key={i}
                    className="absolute tarot-card-back rounded-lg"
                    style={{
                      width: cardCount > 5 ? '60px' : '80px',
                      height: cardCount > 5 ? '90px' : '120px'
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      rotate: 0,
                      scale: 0.8 
                    }}
                    animate={{ 
                      x: position.x,
                      y: position.y,
                      rotate: position.rotate,
                      scale: 1
                    }}
                    transition={{
                      delay: position.delay,
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-gold-300 text-xl font-serif"
              >
                {getDealingText()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardShuffleAnimation;
