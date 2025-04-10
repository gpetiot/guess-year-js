import { Puzzle, TimeCard } from '../types';

export const puzzles: Puzzle[] = [
  {
    date: '2024-04-11',
    year: '1969',
    clues: [
      'A giant leap was taken on a dusty surface.',
      'Woodstock strummed its first chords.',
      'The internet whispered its first words.',
      'A cold war warmed with a lunar glow.',
    ],
  },
  {
    date: '2024-04-12',
    year: '1453',
    clues: [
      'A city\'s walls fell to cannon\'s roar.',
      'The East and West drew a sharper line.',
      'An empire\'s end birthed another\'s dawn.',
      'Books began their silent spread.',
    ],
  },
  {
    date: '2024-04-13',
    year: '1492',
    clues: [
      'A new world was claimed across the sea.',
      'Three ships sailed into history.',
      'Old maps were redrawn with new shores.',
      'A navigator\'s dream changed everything.',
    ],
  },
];

export const timeCards: TimeCard[] = [
  {
    id: 'ancient-scribe',
    name: 'Ancient Scribe',
    description: 'Solve 5 puzzles',
    requirement: {
      type: 'solves',
      count: 5,
    },
    unlocked: false,
  },
  {
    id: 'time-traveler',
    name: 'Time Traveler',
    description: 'Achieve a 10-day solve streak',
    requirement: {
      type: 'streak',
      count: 10,
    },
    unlocked: false,
  },
  {
    id: 'oracle',
    name: 'Oracle',
    description: 'Solve a puzzle in 1 guess',
    requirement: {
      type: 'perfect',
      count: 1,
    },
    unlocked: false,
  },
  {
    id: 'historian',
    name: 'Historian',
    description: 'Solve 25 historical puzzles (before 1900)',
    requirement: {
      type: 'historical',
      count: 25,
    },
    unlocked: false,
  },
  {
    id: 'futurist',
    name: 'Futurist',
    description: 'Solve 10 futuristic puzzles (after 2024)',
    requirement: {
      type: 'futuristic',
      count: 10,
    },
    unlocked: false,
  },
];

export const getToday = (): Puzzle => {
  const today = new Date().toISOString().split('T')[0];
  return puzzles.find(puzzle => puzzle.date === today) || puzzles[0];
}; 