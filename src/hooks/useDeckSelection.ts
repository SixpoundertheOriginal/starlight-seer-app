
import { useCallback } from 'react';
import { TarotCard } from '@/types/tarot';
import { getRandomCards } from '@/data/tarotDeck';
import { getRandomCustomCards } from '@/data/customCards';
import { useCustomCardStorage, DeckType } from './useCustomCardStorage';

export const useDeckSelection = () => {
  const { cards: customCards, deckType, setDeckType } = useCustomCardStorage();

  const getCardsFromSelectedDeck = useCallback((count: number): TarotCard[] => {
    switch (deckType) {
      case 'traditional':
        return getRandomCards(count);
      
      case 'custom':
        return getRandomCustomCards(count);
      
      case 'mixed':
        // Mix of both decks - roughly 50/50 split
        const halfCount = Math.ceil(count / 2);
        const traditionalCards = getRandomCards(halfCount);
        const customCardsSelected = getRandomCustomCards(count - halfCount);
        const mixed = [...traditionalCards, ...customCardsSelected];
        return mixed.sort(() => Math.random() - 0.5).slice(0, count);
      
      default:
        return getRandomCustomCards(count);
    }
  }, [deckType]);

  const getDeckInfo = useCallback(() => {
    switch (deckType) {
      case 'traditional':
        return {
          name: 'Traditional Tarot',
          description: 'Classic 78-card Rider-Waite-Smith deck',
          cardCount: 78
        };
      
      case 'custom':
        return {
          name: 'Custom Deck',
          description: 'Your personalized 15-card mystical deck',
          cardCount: customCards.length
        };
      
      case 'mixed':
        return {
          name: 'Mixed Deck',
          description: 'Combination of traditional and custom cards',
          cardCount: 78 + customCards.length
        };
      
      default:
        return {
          name: 'Custom Deck',
          description: 'Your personalized mystical deck',
          cardCount: customCards.length
        };
    }
  }, [deckType, customCards.length]);

  return {
    deckType,
    setDeckType,
    getCardsFromSelectedDeck,
    getDeckInfo,
    customCards
  };
};
