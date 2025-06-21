
import { TarotSpread } from '@/types/tarot';

export const SINGLE_CARD_SPREAD: TarotSpread = {
  id: 'single-card',
  name: 'Single Card Draw',
  description: 'A simple one-card reading for daily guidance or specific questions.',
  positions: [
    {
      id: 'guidance',
      name: 'Guidance',
      description: 'The universe\'s message for you today'
    }
  ]
};

export const THREE_CARD_SPREAD: TarotSpread = {
  id: 'three-card',
  name: 'Past, Present, Future',
  description: 'A three-card spread revealing the flow of time and energy in your situation.',
  positions: [
    {
      id: 'past',
      name: 'Past',
      description: 'Past influences and experiences that have shaped your current situation'
    },
    {
      id: 'present',
      name: 'Present',
      description: 'Current energies and circumstances surrounding your question'
    },
    {
      id: 'future',
      name: 'Future',
      description: 'Potential outcomes and future possibilities based on current path'
    }
  ]
};

export const SPREADS = {
  single: SINGLE_CARD_SPREAD,
  threeCard: THREE_CARD_SPREAD
};
