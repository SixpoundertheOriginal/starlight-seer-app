
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';

interface CardShuffleAnimationProps {
  isShuffling: boolean;
  onShuffleComplete: () => void;
  cardCount: number;
}

const CardShuffleAnimation: React.FC<CardShuffleAnimationProps> = ({
  isShuffling,
  onShuffleComplete,
  cardCount
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
                Shuffling the cosmic deck...
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
              <div className="flex justify-center space-x-4">
                {Array.from({ length: cardCount }, (_, i) => (
                  <motion.div
                    key={i}
                    className="tarot-card-back w-20 h-32 rounded-lg"
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      rotate: 0,
                      scale: 0.8 
                    }}
                    animate={{ 
                      x: (i - (cardCount - 1) / 2) * 100,
                      y: 0,
                      rotate: (i - (cardCount - 1) / 2) * 5,
                      scale: 1
                    }}
                    transition={{
                      delay: i * 0.2,
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
                The cards have chosen their positions...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardShuffleAnimation;
