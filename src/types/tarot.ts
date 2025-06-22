export interface TarotCard {
  id: string;
  name: string;
  suit?: 'cups' | 'pentacles' | 'swords' | 'wands';
  number?: number;
  type: 'major' | 'minor';
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
  imageUrl?: string;
}

export interface CardPosition {
  id: string;
  name: string;
  description: string;
  card?: TarotCard;
  isReversed?: boolean;
}

export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  positions: CardPosition[];
}

export interface TarotReading {
  id: string;
  question?: string;
  spread: TarotSpread;
  timestamp: Date;
  interpretation: string;
}

export type ReadingType = 'single' | 'three-card' | 'celtic-cross' | 'relationship';
