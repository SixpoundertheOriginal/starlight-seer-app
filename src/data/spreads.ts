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

export const CELTIC_CROSS_SPREAD: TarotSpread = {
  id: 'celtic-cross',
  name: 'Celtic Cross',
  description: 'The most comprehensive 10-card spread revealing past, present, future, and deeper insights.',
  positions: [
    {
      id: 'present',
      name: 'Present Situation',
      description: 'The heart of the matter - your current circumstances'
    },
    {
      id: 'challenge',
      name: 'The Challenge',
      description: 'What crosses you - obstacles or opposing forces'
    },
    {
      id: 'distant-past',
      name: 'Distant Past',
      description: 'Past events that influence your current situation'
    },
    {
      id: 'recent-past',
      name: 'Recent Past',
      description: 'Recent events leading to your current state'
    },
    {
      id: 'possible-outcome',
      name: 'Possible Outcome',
      description: 'What may come to pass if current path continues'
    },
    {
      id: 'near-future',
      name: 'Near Future',
      description: 'What approaches in the immediate future'
    },
    {
      id: 'your-approach',
      name: 'Your Approach',
      description: 'How you approach the situation - your perspective'
    },
    {
      id: 'external-influences',
      name: 'External Influences',
      description: 'How others and environment affect your situation'
    },
    {
      id: 'hopes-fears',
      name: 'Hopes & Fears',
      description: 'Your innermost hopes and fears about the outcome'
    },
    {
      id: 'final-outcome',
      name: 'Final Outcome',
      description: 'The ultimate result - synthesis of all influences'
    }
  ]
};

export const RELATIONSHIP_SPREAD: TarotSpread = {
  id: 'relationship',
  name: 'Relationship Insight',
  description: 'A 5-card spread exploring the dynamics between two people or your relationship with yourself.',
  positions: [
    {
      id: 'you',
      name: 'You',
      description: 'Your role and energy in this relationship'
    },
    {
      id: 'them',
      name: 'Them/Other',
      description: 'Their role and energy, or your shadow self'
    },
    {
      id: 'connection',
      name: 'The Connection',
      description: 'The bond between you - what unites or divides'
    },
    {
      id: 'challenges',
      name: 'Challenges',
      description: 'Obstacles or lessons within this relationship'
    },
    {
      id: 'potential',
      name: 'Potential',
      description: 'Where this relationship can grow and flourish'
    }
  ]
};

export const SPREADS = {
  single: SINGLE_CARD_SPREAD,
  threeCard: THREE_CARD_SPREAD,
  celticCross: CELTIC_CROSS_SPREAD,
  relationship: RELATIONSHIP_SPREAD
};
