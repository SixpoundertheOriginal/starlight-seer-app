
import { useState, useEffect } from 'react';
import { ReadingType } from '@/types/tarot';

interface AnimationState {
  [key: string]: boolean;
}

export const useSpreadAnimations = (spreadType: ReadingType, isVisible: boolean) => {
  const [animationState, setAnimationState] = useState<AnimationState>({});

  useEffect(() => {
    if (!isVisible) return;

    const animations: { [key: string]: number[] } = {
      'celtic-cross': [
        0,    // Present (center)
        300,  // Challenge (cross)
        600,  // Distant Past (left)
        900,  // Recent Past (bottom)
        1200, // Possible Outcome (top)
        1500, // Near Future (right)
        1800, // Staff card 1
        1900, // Staff card 2
        2000, // Staff card 3
        2100, // Staff card 4
      ],
      'relationship': [
        0,    // You (left)
        200,  // Them (right)
        400,  // Connection glow
        800,  // Connection (center)
        1200, // Challenges (bottom left)
        1600, // Potential (bottom right)
      ],
    };

    const spreadAnimations = animations[spreadType];
    if (!spreadAnimations) return;

    const timeouts: NodeJS.Timeout[] = [];

    spreadAnimations.forEach((delay, index) => {
      const timeout = setTimeout(() => {
        setAnimationState(prev => ({
          ...prev,
          [index]: true
        }));
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [spreadType, isVisible]);

  const getCardAnimation = (index: number): string => {
    if (!animationState[index]) return 'opacity-0';

    if (spreadType === 'celtic-cross') {
      switch (index) {
        case 0: return 'celtic-center-reveal celtic-cross-glow';
        case 1: return 'celtic-cross-rotate';
        case 2: return 'celtic-slide-left';
        case 3: return 'celtic-slide-bottom';
        case 4: return 'celtic-slide-top';
        case 5: return 'celtic-slide-right';
        case 6:
        case 7:
        case 8:
        case 9: return 'celtic-staff-rise';
        default: return 'celtic-center-reveal';
      }
    }

    if (spreadType === 'relationship') {
      switch (index) {
        case 0: return 'relationship-slide-left';
        case 1: return 'relationship-slide-right';
        case 2: return 'relationship-center-bloom relationship-sparkle';
        case 3:
        case 4: return 'relationship-foundation-rise';
        default: return 'relationship-center-bloom';
      }
    }

    return 'animate-fade-in';
  };

  const getConnectionGlow = (): string => {
    if (spreadType === 'relationship' && animationState[2]) {
      return 'relationship-connection-glow';
    }
    return '';
  };

  return {
    getCardAnimation,
    getConnectionGlow,
    isAnimationComplete: Object.keys(animationState).length > 0
  };
};
