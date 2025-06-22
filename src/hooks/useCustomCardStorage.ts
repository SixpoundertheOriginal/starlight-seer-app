
import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';
import { TarotCard } from '@/types/tarot';
import { customCards } from '@/data/customCards';

const CUSTOM_CARDS_KEY = 'tarot_custom_cards';
const DECK_SELECTION_KEY = 'tarot_deck_selection';

export type DeckType = 'traditional' | 'custom' | 'mixed';

interface CustomCardStorage {
  cards: TarotCard[];
  deckType: DeckType;
  isLoading: boolean;
  saveCustomCards: (cards: TarotCard[]) => Promise<void>;
  resetToDefault: () => Promise<void>;
  setDeckType: (type: DeckType) => Promise<void>;
  exportCards: () => string;
  importCards: (jsonData: string) => Promise<boolean>;
}

export const useCustomCardStorage = (): CustomCardStorage => {
  const [cards, setCards] = useState<TarotCard[]>(customCards);
  const [deckType, setDeckTypeState] = useState<DeckType>('custom');
  const [isLoading, setIsLoading] = useState(true);

  // Load stored data on mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        // Load custom cards
        const storedCards = await localforage.getItem<TarotCard[]>(CUSTOM_CARDS_KEY);
        if (storedCards && storedCards.length > 0) {
          setCards(storedCards);
        }

        // Load deck selection
        const storedDeckType = await localforage.getItem<DeckType>(DECK_SELECTION_KEY);
        if (storedDeckType) {
          setDeckTypeState(storedDeckType);
        }
      } catch (error) {
        console.error('Failed to load custom card data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const saveCustomCards = useCallback(async (newCards: TarotCard[]) => {
    try {
      await localforage.setItem(CUSTOM_CARDS_KEY, newCards);
      setCards(newCards);
    } catch (error) {
      console.error('Failed to save custom cards:', error);
      throw error;
    }
  }, []);

  const resetToDefault = useCallback(async () => {
    try {
      await localforage.setItem(CUSTOM_CARDS_KEY, customCards);
      setCards(customCards);
    } catch (error) {
      console.error('Failed to reset to default cards:', error);
      throw error;
    }
  }, []);

  const setDeckType = useCallback(async (type: DeckType) => {
    try {
      await localforage.setItem(DECK_SELECTION_KEY, type);
      setDeckTypeState(type);
    } catch (error) {
      console.error('Failed to save deck type:', error);
      throw error;
    }
  }, []);

  const exportCards = useCallback(() => {
    return JSON.stringify({
      cards,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }, null, 2);
  }, [cards]);

  const importCards = useCallback(async (jsonData: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.cards && Array.isArray(parsed.cards)) {
        // Validate card structure
        const validCards = parsed.cards.filter((card: any) => 
          card.id && card.name && card.type && card.keywords && 
          card.uprightMeaning && card.reversedMeaning
        );
        
        if (validCards.length > 0) {
          await saveCustomCards(validCards);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Failed to import cards:', error);
      return false;
    }
  }, [saveCustomCards]);

  return {
    cards,
    deckType,
    isLoading,
    saveCustomCards,
    resetToDefault,
    setDeckType,
    exportCards,
    importCards
  };
};
