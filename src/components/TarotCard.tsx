
import React from 'react';
import CardDisplay from './CardDisplay';
import { TarotCard as TarotCardType } from '@/types/tarot';

interface TarotCardProps {
  id: number;
  name: string;
  isFlipped: boolean;
  onFlip: (id: number) => void;
  disabled?: boolean;
}

// Legacy wrapper component for backward compatibility
const TarotCard: React.FC<TarotCardProps> = ({ id, name, isFlipped, onFlip, disabled = false }) => {
  const legacyCard: TarotCardType = {
    id: id.toString(),
    name: name,
    type: 'major',
    keywords: ['mystery', 'guidance'],
    uprightMeaning: 'This card brings guidance and wisdom to your path.',
    reversedMeaning: 'Look within for the answers you seek.',
    description: 'A mystical card from the tarot deck.'
  };

  return (
    <CardDisplay
      card={legacyCard}
      isFlipped={isFlipped}
      onFlip={() => onFlip(id)}
      disabled={disabled}
    />
  );
};

export default TarotCard;
