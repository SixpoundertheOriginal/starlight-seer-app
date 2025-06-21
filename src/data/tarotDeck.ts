
import { TarotCard } from '@/types/tarot';

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'fool',
    name: 'The Fool',
    type: 'major',
    keywords: ['new beginnings', 'innocence', 'spontaneity', 'free spirit'],
    uprightMeaning: 'New beginnings, innocence, spontaneity, and a free spirit. The start of a journey with unlimited potential.',
    reversedMeaning: 'Recklessness, taken advantage of, inconsideration, and lack of direction.',
    description: 'A figure stands at the edge of a cliff, ready to embark on a new adventure with optimism and trust.'
  },
  {
    id: 'magician',
    name: 'The Magician',
    type: 'major',
    keywords: ['manifestation', 'resourcefulness', 'power', 'inspired action'],
    uprightMeaning: 'Manifestation, resourcefulness, power, and inspired action. You have the tools to make your dreams reality.',
    reversedMeaning: 'Manipulation, poor planning, latent talents, and unused potential.',
    description: 'A figure raises one hand to the sky and points down with the other, channeling divine energy.'
  },
  {
    id: 'high-priestess',
    name: 'The High Priestess',
    type: 'major',
    keywords: ['intuition', 'sacred knowledge', 'divine feminine', 'subconscious mind'],
    uprightMeaning: 'Intuition, sacred knowledge, divine feminine, and the subconscious mind. Trust your inner voice.',
    reversedMeaning: 'Secrets, disconnected from intuition, withdrawal, and silence.',
    description: 'A serene figure sits between two pillars, holding the scroll of divine knowledge.'
  },
  {
    id: 'empress',
    name: 'The Empress',
    type: 'major',
    keywords: ['femininity', 'beauty', 'nature', 'nurturing', 'abundance'],
    uprightMeaning: 'Femininity, beauty, nature, nurturing, and abundance. A time of growth and creativity.',
    reversedMeaning: 'Creative block, dependence on others, and lack of progress.',
    description: 'A maternal figure sits in a lush garden, representing fertility and natural abundance.'
  },
  {
    id: 'emperor',
    name: 'The Emperor',
    type: 'major',
    keywords: ['authority', 'structure', 'control', 'fatherhood'],
    uprightMeaning: 'Authority, structure, control, and fatherhood. Leadership through wisdom and experience.',
    reversedMeaning: 'Tyranny, rigidity, coldness, and loss of authority.',
    description: 'A powerful ruler sits on a throne, representing stability and paternal guidance.'
  },
  {
    id: 'hierophant',
    name: 'The Hierophant',
    type: 'major',
    keywords: ['spiritual wisdom', 'religious beliefs', 'conformity', 'tradition'],
    uprightMeaning: 'Spiritual wisdom, religious beliefs, conformity, and tradition. Seeking spiritual guidance.',
    reversedMeaning: 'Personal beliefs, freedom, challenging the status quo.',
    description: 'A religious figure sits between pillars, offering spiritual guidance and wisdom.'
  },
  {
    id: 'lovers',
    name: 'The Lovers',
    type: 'major',
    keywords: ['love', 'harmony', 'relationships', 'values alignment'],
    uprightMeaning: 'Love, harmony, relationships, and values alignment. Union and important choices.',
    reversedMeaning: 'Disharmony, imbalance, misalignment of values, and broken relationships.',
    description: 'Two figures stand beneath an angel, representing divine love and meaningful choices.'
  },
  {
    id: 'chariot',
    name: 'The Chariot',
    type: 'major',
    keywords: ['control', 'willpower', 'success', 'determination'],
    uprightMeaning: 'Control, willpower, success, and determination. Victory through focused effort.',
    reversedMeaning: 'Lack of control, lack of direction, and aggression.',
    description: 'A warrior rides a chariot pulled by opposing forces, showing mastery through balance.'
  },
  {
    id: 'strength',
    name: 'Strength',
    type: 'major',
    keywords: ['strength', 'courage', 'persuasion', 'influence', 'compassion'],
    uprightMeaning: 'Strength, courage, persuasion, influence, and compassion. Inner strength conquers all.',
    reversedMeaning: 'Self doubt, lack of confidence, and lack of self-control.',
    description: 'A gentle figure tames a lion with love and inner strength rather than force.'
  },
  {
    id: 'hermit',
    name: 'The Hermit',
    type: 'major',
    keywords: ['soul searching', 'seeking truth', 'inner guidance'],
    uprightMeaning: 'Soul searching, seeking truth, and inner guidance. A time for introspection and finding your path.',
    reversedMeaning: 'Isolation, loneliness, and withdrawal from others.',
    description: 'A wise figure holds a lantern, lighting the way through darkness and uncertainty.'
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    type: 'major',
    keywords: ['good luck', 'karma', 'life cycles', 'destiny', 'turning point'],
    uprightMeaning: 'Good luck, karma, life cycles, destiny, and a turning point. Change is coming.',
    reversedMeaning: 'Bad luck, lack of control, clinging to control, and unwelcome changes.',
    description: 'A great wheel turns in the sky, showing the cyclical nature of fortune and fate.'
  },
  {
    id: 'justice',
    name: 'Justice',
    type: 'major',
    keywords: ['justice', 'fairness', 'truth', 'cause and effect', 'law'],
    uprightMeaning: 'Justice, fairness, truth, cause and effect, and law. Balance will be restored.',
    reversedMeaning: 'Unfairness, lack of accountability, and dishonesty.',
    description: 'A figure holds scales and a sword, representing balanced judgment and truth.'
  },
  {
    id: 'hanged-man',
    name: 'The Hanged Man',
    type: 'major',
    keywords: ['suspension', 'restriction', 'letting go', 'sacrifice'],
    uprightMeaning: 'Suspension, restriction, letting go, and sacrifice. Sometimes we must pause to gain perspective.',
    reversedMeaning: 'Delays, resistance, stalling, and indecision.',
    description: 'A figure hangs peacefully upside down, showing surrender and new perspective.'
  },
  {
    id: 'death',
    name: 'Death',
    type: 'major',
    keywords: ['endings', 'beginnings', 'change', 'transformation'],
    uprightMeaning: 'Endings, beginnings, change, and transformation. The end of one phase and start of another.',
    reversedMeaning: 'Resistance to change, personal transformation, and inner purging.',
    description: 'A skeletal figure represents the natural cycle of death and rebirth.'
  },
  {
    id: 'temperance',
    name: 'Temperance',
    type: 'major',
    keywords: ['balance', 'moderation', 'patience', 'purpose'],
    uprightMeaning: 'Balance, moderation, patience, and purpose. Finding the middle way brings harmony.',
    reversedMeaning: 'Imbalance, excess, self-healing, and re-alignment.',
    description: 'An angel pours water between two cups, showing the art of perfect balance.'
  },
  {
    id: 'devil',
    name: 'The Devil',
    type: 'major',
    keywords: ['bondage', 'addiction', 'sexuality', 'materialism'],
    uprightMeaning: 'Bondage, addiction, sexuality, and materialism. Breaking free from limiting beliefs.',
    reversedMeaning: 'Releasing limiting beliefs, exploring dark thoughts, and detachment.',
    description: 'Chained figures before a horned deity represent self-imposed limitations and desires.'
  },
  {
    id: 'tower',
    name: 'The Tower',
    type: 'major',
    keywords: ['sudden change', 'upheaval', 'chaos', 'revelation', 'awakening'],
    uprightMeaning: 'Sudden change, upheaval, chaos, revelation, and awakening. Destruction leads to enlightenment.',
    reversedMeaning: 'Personal transformation, fear of change, and averting disaster.',
    description: 'Lightning strikes a tower, showing the sudden destruction of false foundations.'
  },
  {
    id: 'star',
    name: 'The Star',
    type: 'major',
    keywords: ['hope', 'faith', 'purpose', 'renewal', 'spirituality'],
    uprightMeaning: 'Hope, faith, purpose, renewal, and spirituality. A time of healing and renewed faith.',
    reversedMeaning: 'Lack of faith, despair, self-trust, and disconnection.',
    description: 'A figure pours water under a starlit sky, representing hope and spiritual guidance.'
  },
  {
    id: 'moon',
    name: 'The Moon',
    type: 'major',
    keywords: ['illusion', 'fear', 'anxiety', 'subconscious', 'intuition'],
    uprightMeaning: 'Illusion, fear, anxiety, subconscious, and intuition. Not everything is as it seems.',
    reversedMeaning: 'Release of fear, repressed emotion, and inner confusion.',
    description: 'A moon shines over a mysterious landscape, illuminating the path through uncertainty.'
  },
  {
    id: 'sun',
    name: 'The Sun',
    type: 'major',
    keywords: ['positivity', 'fun', 'warmth', 'success', 'vitality'],
    uprightMeaning: 'Positivity, fun, warmth, success, and vitality. Joy and abundance shine upon you.',
    reversedMeaning: 'Inner child, feeling down, and overly optimistic.',
    description: 'A bright sun shines over a joyful scene, representing happiness and life energy.'
  },
  {
    id: 'judgement',
    name: 'Judgement',
    type: 'major',
    keywords: ['judgement', 'rebirth', 'inner calling', 'absolution'],
    uprightMeaning: 'Judgement, rebirth, inner calling, and absolution. A time of spiritual awakening and renewal.',
    reversedMeaning: 'Self-doubt, inner critic, ignoring the call, and lack of self-awareness.',
    description: 'An angel calls souls to rise, representing spiritual awakening and second chances.'
  },
  {
    id: 'world',
    name: 'The World',
    type: 'major',
    keywords: ['completion', 'integration', 'accomplishment', 'travel'],
    uprightMeaning: 'Completion, integration, accomplishment, and travel. The end of a journey and fulfillment.',
    reversedMeaning: 'Seeking personal closure, stagnation, and lack of achievement.',
    description: 'A dancing figure surrounded by a wreath represents completion and cosmic consciousness.'
  }
];

export const MINOR_ARCANA: TarotCard[] = [
  // Cups (Water/Emotions)
  {
    id: 'ace-cups',
    name: 'Ace of Cups',
    suit: 'cups',
    number: 1,
    type: 'minor',
    keywords: ['love', 'new relationships', 'compassion', 'creativity'],
    uprightMeaning: 'New love, new relationships, compassion, and creativity. An overflow of positive emotions.',
    reversedMeaning: 'Self-love, intuition, and repressed emotions.',
    description: 'A chalice overflows with pure water, representing emotional and spiritual abundance.'
  },
  {
    id: 'two-cups',
    name: 'Two of Cups',
    suit: 'cups',
    number: 2,
    type: 'minor',
    keywords: ['unified love', 'partnership', 'mutual attraction'],
    uprightMeaning: 'Unified love, partnership, and mutual attraction. A harmonious relationship.',
    reversedMeaning: 'Break-ups, imbalance in relationship, and lack of harmony.',
    description: 'Two figures exchange cups in a gesture of unity and mutual respect.'
  },
  {
    id: 'three-cups',
    name: 'Three of Cups',
    suit: 'cups',
    number: 3,
    type: 'minor',
    keywords: ['celebration', 'friendship', 'creativity', 'community'],
    uprightMeaning: 'Celebration, friendship, creativity, and community. Joy shared with others.',
    reversedMeaning: 'Independence, alone time, and creative blocks.',
    description: 'Three friends raise their cups in celebration, representing joy and community.'
  },
  {
    id: 'four-cups',
    name: 'Four of Cups',
    suit: 'cups',
    number: 4,
    type: 'minor',
    keywords: ['meditation', 'contemplation', 'apathy', 'reevaluation'],
    uprightMeaning: 'Meditation, contemplation, apathy, and reevaluation. A time for introspection.',
    reversedMeaning: 'Retreat, withdrawal, and checking in with yourself.',
    description: 'A figure sits contemplating three cups while a fourth is offered from above.'
  },
  {
    id: 'five-cups',
    name: 'Five of Cups',
    suit: 'cups',
    number: 5,
    type: 'minor',
    keywords: ['regret', 'failure', 'disappointment', 'pessimism'],
    uprightMeaning: 'Regret, failure, disappointment, and pessimism. Focus on what remains, not what is lost.',
    reversedMeaning: 'Personal setbacks, self-forgiveness, and moving on.',
    description: 'A cloaked figure mourns over spilled cups while two remain standing behind.'
  },
  {
    id: 'six-cups',
    name: 'Six of Cups',
    suit: 'cups',
    number: 6,
    type: 'minor',
    keywords: ['revisiting the past', 'childhood memories', 'innocence', 'joy'],
    uprightMeaning: 'Revisiting the past, childhood memories, innocence, and joy. Happy reunions.',
    reversedMeaning: 'Living in the past, forgiveness, and lacking playfulness.',
    description: 'Children exchange cups filled with flowers, representing innocent joy and nostalgia.'
  },
  {
    id: 'seven-cups',
    name: 'Seven of Cups',
    suit: 'cups',
    number: 7,
    type: 'minor',
    keywords: ['opportunities', 'choices', 'wishful thinking', 'illusion'],
    uprightMeaning: 'Opportunities, choices, wishful thinking, and illusion. Too many options can be overwhelming.',
    reversedMeaning: 'Alignment, personal values, and overwhelmed by choices.',
    description: 'Seven cups float in clouds, each containing different symbols of desire and choice.'
  },
  {
    id: 'eight-cups',
    name: 'Eight of Cups',
    suit: 'cups',
    number: 8,
    type: 'minor',
    keywords: ['disappointment', 'abandonment', 'withdrawal', 'escapism'],
    uprightMeaning: 'Disappointment, abandonment, withdrawal, and escapism. Time to move on.',
    reversedMeaning: 'Trying one more time, indecision, and aimless drifting.',
    description: 'A figure walks away from eight cups, seeking something more meaningful.'
  },
  {
    id: 'nine-cups',
    name: 'Nine of Cups',
    suit: 'cups',
    number: 9,
    type: 'minor',
    keywords: ['contentment', 'satisfaction', 'gratitude', 'wish fulfillment'],
    uprightMeaning: 'Contentment, satisfaction, gratitude, and wish fulfillment. Your wishes come true.',
    reversedMeaning: 'Inner happiness, materialism, and dissatisfaction.',
    description: 'A satisfied figure sits before nine cups arranged in an arc, the wish card.'
  },
  {
    id: 'ten-cups',
    name: 'Ten of Cups',
    suit: 'cups',
    number: 10,
    type: 'minor',
    keywords: ['divine love', 'blissful relationships', 'harmony', 'alignment'],
    uprightMeaning: 'Divine love, blissful relationships, harmony, and alignment. Emotional fulfillment.',
    reversedMeaning: 'Disconnection, misaligned values, and struggling relationships.',
    description: 'A family celebrates under a rainbow of ten cups, representing perfect happiness.'
  },
  
  // Pentacles (Earth/Material)
  {
    id: 'ace-pentacles',
    name: 'Ace of Pentacles',
    suit: 'pentacles',
    number: 1,
    type: 'minor',
    keywords: ['manifestation', 'new financial opportunity', 'abundance'],
    uprightMeaning: 'Manifestation, new financial opportunity, and abundance. A seed of prosperity.',
    reversedMeaning: 'Lost opportunity, lack of planning, and poor financial judgment.',
    description: 'A hand emerges from clouds holding a golden pentacle, symbol of material manifestation.'
  },
  {
    id: 'two-pentacles',
    name: 'Two of Pentacles',
    suit: 'pentacles',
    number: 2,
    type: 'minor',
    keywords: ['multiple priorities', 'time management', 'prioritization', 'adaptability'],
    uprightMeaning: 'Multiple priorities, time management, prioritization, and adaptability. Juggling responsibilities.',
    reversedMeaning: 'Over-committed, disorganization, and reprioritization.',
    description: 'A figure juggles two pentacles, showing the balance needed in managing resources.'
  },
  {
    id: 'three-pentacles',
    name: 'Three of Pentacles',
    suit: 'pentacles',
    number: 3,
    type: 'minor',
    keywords: ['collaboration', 'learning', 'implementation'],
    uprightMeaning: 'Collaboration, learning, and implementation. Working together toward a common goal.',
    reversedMeaning: 'Disharmony, alignment issues, and lack of teamwork.',
    description: 'Craftsmen work together on a cathedral, representing collaborative mastery.'
  },
  {
    id: 'four-pentacles',
    name: 'Four of Pentacles',
    suit: 'pentacles',
    number: 4,
    type: 'minor',
    keywords: ['saving money', 'security', 'conservatism', 'scarcity', 'control'],
    uprightMeaning: 'Saving money, security, conservatism, scarcity, and control. Holding too tightly to possessions.',
    reversedMeaning: 'Over-spending, greed, and self-protection.',
    description: 'A figure clutches four pentacles possessively, representing attachment to material security.'
  },
  {
    id: 'five-pentacles',
    name: 'Five of Pentacles',
    suit: 'pentacles',
    number: 5,
    type: 'minor',
    keywords: ['financial loss', 'poverty', 'lack mindset', 'isolation', 'worry'],
    uprightMeaning: 'Financial loss, poverty, lack mindset, isolation, and worry. Hard times that will pass.',
    reversedMeaning: 'Recovery from financial loss, spiritual poverty.',
    description: 'Two figures walk in snow past a lit window, representing hardship and hope.'
  },
  {
    id: 'six-pentacles',
    name: 'Six of Pentacles',
    suit: 'pentacles',
    number: 6,
    type: 'minor',
    keywords: ['generosity', 'charity', 'community', 'material help', 'support'],
    uprightMeaning: 'Generosity, charity, community, material help, and support. Giving and receiving in balance.',
    reversedMeaning: 'Self-care, unpaid debts, and one-sided charity.',
    description: 'A merchant gives coins to beggars while weighing others, showing balanced generosity.'
  },
  {
    id: 'seven-pentacles',
    name: 'Seven of Pentacles',
    suit: 'pentacles',
    number: 7,
    type: 'minor',
    keywords: ['long-term view', 'sustainable results', 'perseverance', 'investment'],
    uprightMeaning: 'Long-term view, sustainable results, perseverance, and investment. Patience brings rewards.',
    reversedMeaning: 'Lack of long-term vision, limited success, and lack of reward.',
    description: 'A farmer rests on his hoe, contemplating his growing crop with patient wisdom.'
  },
  {
    id: 'eight-pentacles',
    name: 'Eight of Pentacles',
    suit: 'pentacles',
    number: 8,
    type: 'minor',
    keywords: ['apprenticeship', 'repetitive tasks', 'mastery', 'skill development'],
    uprightMeaning: 'Apprenticeship, repetitive tasks, mastery, and skill development. Dedication to craft.',
    reversedMeaning: 'Lack of focus, perfectionism, and misdirected activity.',
    description: 'A craftsman carefully carves pentacles, showing dedication to mastering his skill.'
  },
  {
    id: 'nine-pentacles',
    name: 'Nine of Pentacles',
    suit: 'pentacles',
    number: 9,
    type: 'minor',
    keywords: ['abundance', 'luxury', 'self-reliance', 'financial independence'],
    uprightMeaning: 'Abundance, luxury, self-reliance, and financial independence. Well-deserved success.',
    reversedMeaning: 'Self-worth, over-investment in work, and hustling.',
    description: 'An elegant figure enjoys their garden of pentacles, representing earned abundance.'
  },
  {
    id: 'ten-pentacles',
    name: 'Ten of Pentacles',
    suit: 'pentacles',
    number: 10,
    type: 'minor',
    keywords: ['legacy', 'culmination', 'inheritance', 'spiritual home'],
    uprightMeaning: 'Legacy, culmination, inheritance, and spiritual home. Generational wealth and wisdom.',
    reversedMeaning: 'The Gilded Cage, financial failure, and lack of long-term vision.',
    description: 'A family gathers under an archway of pentacles, representing lasting prosperity.'
  },

  // Swords (Air/Intellect) - Adding 10 cards
  {
    id: 'ace-swords',
    name: 'Ace of Swords',
    suit: 'swords',
    number: 1,
    type: 'minor',
    keywords: ['clarity', 'breakthrough', 'new ideas', 'mental clarity'],
    uprightMeaning: 'Clarity, breakthrough, new ideas, and mental clarity. A moment of clear insight.',
    reversedMeaning: 'Inner clarity, re-thinking an idea, and clouded judgment.',
    description: 'A hand emerges from clouds grasping a sword crowned with victory, representing mental breakthrough.'
  },
  {
    id: 'two-swords',
    name: 'Two of Swords',
    suit: 'swords',
    number: 2,
    type: 'minor',
    keywords: ['difficult decisions', 'weighing up options', 'indecision', 'blocked emotions'],
    uprightMeaning: 'Difficult decisions, weighing up options, indecision, and blocked emotions.',
    reversedMeaning: 'Indecision, confusion, and information overload.',
    description: 'A blindfolded figure holds two crossed swords, representing difficult choices.'
  },
  {
    id: 'three-swords',
    name: 'Three of Swords',
    suit: 'swords',
    number: 3,
    type: 'minor',
    keywords: ['heartbreak', 'emotional pain', 'sorrow', 'grief', 'loss'],
    uprightMeaning: 'Heartbreak, emotional pain, sorrow, grief, and loss. Necessary pain for growth.',
    reversedMeaning: 'Negative self-talk, releasing pain, and optimism.',
    description: 'Three swords pierce a heart beneath storm clouds, representing emotional pain.'
  },
  {
    id: 'four-swords',
    name: 'Four of Swords',
    suit: 'swords',
    number: 4,
    type: 'minor',
    keywords: ['rest', 'relaxation', 'meditation', 'contemplation', 'recuperation'],
    uprightMeaning: 'Rest, relaxation, meditation, contemplation, and recuperation. Time to recharge.',
    reversedMeaning: 'Exhaustion, burn-out, and deep contemplation.',
    description: 'A knight lies in peaceful repose, representing the need for mental rest.'
  },
  {
    id: 'five-swords',
    name: 'Five of Swords',
    suit: 'swords',
    number: 5,
    type: 'minor',
    keywords: ['conflict', 'dishonor', 'win at all costs', 'betrayal'],
    uprightMeaning: 'Conflict, dishonor, win at all costs, and betrayal. Victory with consequences.',
    reversedMeaning: 'Reconciliation, making amends, and past resentment.',
    description: 'A figure collects swords while others walk away defeated, showing hollow victory.'
  },
  {
    id: 'six-swords',
    name: 'Six of Swords',
    suit: 'swords',
    number: 6,
    type: 'minor',
    keywords: ['transition', 'change', 'rite of passage', 'releasing baggage'],
    uprightMeaning: 'Transition, change, rite of passage, and releasing baggage. Moving toward calmer waters.',
    reversedMeaning: 'Personal transition, resistance to change, and unfinished business.',
    description: 'Passengers cross calm waters with six swords, representing transition and hope.'
  },
  {
    id: 'seven-swords',
    name: 'Seven of Swords',
    suit: 'swords',
    number: 7,
    type: 'minor',
    keywords: ['betrayal', 'deception', 'getting away with something', 'strategic action'],
    uprightMeaning: 'Betrayal, deception, getting away with something, and strategic action.',
    reversedMeaning: 'Imposter syndrome, self-deceit, and keeping secrets.',
    description: 'A figure sneaks away with stolen swords, representing deception and cunning.'
  },
  {
    id: 'eight-swords',
    name: 'Eight of Swords',
    suit: 'swords',
    number: 8,
    type: 'minor',
    keywords: ['negative thinking', 'restricted freedom', 'imprisonment', 'victim mentality'],
    uprightMeaning: 'Negative thinking, restricted freedom, imprisonment, and victim mentality.',
    reversedMeaning: 'Self-limiting beliefs, inner critic, and releasing negative thoughts.',
    description: 'A bound figure surrounded by swords represents self-imposed mental limitations.'
  },
  {
    id: 'nine-swords',
    name: 'Nine of Swords',
    suit: 'swords',
    number: 9,
    type: 'minor',
    keywords: ['anxiety', 'worry', 'fear', 'depression', 'nightmares'],
    uprightMeaning: 'Anxiety, worry, fear, depression, and nightmares. Mental anguish and overthinking.',
    reversedMeaning: 'Inner turmoil, deep-seated fears, and secrets.',
    description: 'A figure sits up in bed with head in hands, nine swords hanging above.'
  },
  {
    id: 'ten-swords',
    name: 'Ten of Swords',
    suit: 'swords',
    number: 10,
    type: 'minor',
    keywords: ['painful endings', 'deep wounds', 'betrayal', 'loss', 'crisis'],
    uprightMeaning: 'Painful endings, deep wounds, betrayal, loss, and crisis. Rock bottom before rebirth.',
    reversedMeaning: 'Survival, regeneration, and resisting an inevitable end.',
    description: 'A figure lies with ten swords in their back as dawn approaches, showing endings and hope.'
  },

  // Wands (Fire/Action) - Adding 10 cards
  {
    id: 'ace-wands',
    name: 'Ace of Wands',
    suit: 'wands',
    number: 1,
    type: 'minor',
    keywords: ['inspiration', 'creative spark', 'new energy', 'spiritual energy'],
    uprightMeaning: 'Inspiration, creative spark, new energy, and spiritual energy. A burst of creative potential.',
    reversedMeaning: 'An emerging idea, lack of direction, and distractions.',
    description: 'A hand emerges from clouds holding a flowering wand, representing creative inspiration.'
  },
  {
    id: 'two-wands',
    name: 'Two of Wands',
    suit: 'wands',
    number: 2,
    type: 'minor',
    keywords: ['future planning', 'making decisions', 'leaving comfort zone'],
    uprightMeaning: 'Future planning, making decisions, and leaving comfort zone. Personal power and expansion.',
    reversedMeaning: 'Personal goals, inner alignment, and fear of unknown.',
    description: 'A figure holds a globe while looking out over their domain, planning future conquests.'
  },
  {
    id: 'three-wands',
    name: 'Three of Wands',
    suit: 'wands',
    number: 3,
    type: 'minor',
    keywords: ['expansion', 'foresight', 'overseas opportunities'],
    uprightMeaning: 'Expansion, foresight, and overseas opportunities. Looking ahead with confidence.',
    reversedMeaning: 'Playing small, lack of foresight, and unexpected delays.',
    description: 'A figure watches ships from a cliff, representing expansion and long-term vision.'
  },
  {
    id: 'four-wands',
    name: 'Four of Wands',
    suit: 'wands',
    number: 4,
    type: 'minor',
    keywords: ['celebration', 'joy', 'harmony', 'relaxation', 'homecoming'],
    uprightMeaning: 'Celebration, joy, harmony, relaxation, and homecoming. A time for celebration.',
    reversedMeaning: 'Personal celebration, inner harmony, and conflict with others.',
    description: 'Four wands create a canopy for celebration, representing joy and achievement.'
  },
  {
    id: 'five-wands',
    name: 'Five of Wands',
    suit: 'wands',
    number: 5,
    type: 'minor',
    keywords: ['disagreements', 'competition', 'tension', 'diversity'],
    uprightMeaning: 'Disagreements, competition, tension, and diversity. Conflict that leads to growth.',
    reversedMeaning: 'Inner conflict, conflict avoidance, and tension release.',
    description: 'Five figures clash with wands in mock battle, representing healthy competition.'
  },
  {
    id: 'six-wands',
    name: 'Six of Wands',
    suit: 'wands',
    number: 6,
    type: 'minor',
    keywords: ['success', 'public recognition', 'progress', 'self-confidence'],
    uprightMeaning: 'Success, public recognition, progress, and self-confidence. Victory and acclaim.',
    reversedMeaning: 'Private achievement, personal definition of success, and fall from grace.',
    description: 'A victorious rider returns with a wreathed wand, celebrated by the crowd.'
  },
  {
    id: 'seven-wands',
    name: 'Seven of Wands',
    suit: 'wands',
    number: 7,
    type: 'minor',
    keywords: ['challenge', 'competition', 'protection', 'perseverance'],
    uprightMeaning: 'Challenge, competition, protection, and perseverance. Standing your ground.',
    reversedMeaning: 'Exhaustion, giving up, and overwhelmed.',
    description: 'A figure defends their position against six attacking wands, showing determination.'
  },
  {
    id: 'eight-wands',
    name: 'Eight of Wands',
    suit: 'wands',
    number: 8,
    type: 'minor',
    keywords: ['movement', 'fast paced change', 'action', 'alignment', 'flying'],
    uprightMeaning: 'Movement, fast paced change, action, alignment, and flying. Swift progress.',
    reversedMeaning: 'Delays, frustration, and resisting change.',
    description: 'Eight wands fly through the air like arrows, representing swift movement and progress.'
  },
  {
    id: 'nine-wands',
    name: 'Nine of Wands',
    suit: 'wands',
    number: 9,
    type: 'minor',
    keywords: ['resilience', 'courage', 'persistence', 'test of faith', 'boundaries'],
    uprightMeaning: 'Resilience, courage, persistence, test of faith, and boundaries. Almost there.',
    reversedMeaning: 'Inner resources, struggle, and overwhelm.',
    description: 'A wounded figure guards eight wands while holding a ninth, showing resilient determination.'
  },
  {
    id: 'ten-wands',
    name: 'Ten of Wands',
    suit: 'wands',
    number: 10,
    type: 'minor',
    keywords: ['burden', 'extra responsibility', 'hard work', 'achievement'],
    uprightMeaning: 'Burden, extra responsibility, hard work, and achievement. Success with a heavy load.',
    reversedMeaning: 'Doing it all, carrying the burden, and delegation.',
    description: 'A figure carries ten heavy wands toward their destination, representing the burden of success.'
  }
];

export const FULL_TAROT_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export const getRandomCard = (): TarotCard => {
  const randomIndex = Math.floor(Math.random() * FULL_TAROT_DECK.length);
  return FULL_TAROT_DECK[randomIndex];
};

export const getRandomCards = (count: number): TarotCard[] => {
  const shuffled = [...FULL_TAROT_DECK].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCardById = (id: string): TarotCard | undefined => {
  return FULL_TAROT_DECK.find(card => card.id === id);
};
