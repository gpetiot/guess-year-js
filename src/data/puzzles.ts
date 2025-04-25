import { Puzzle, TimeCard } from '../types';

export const puzzles: Puzzle[] = [
  {
    year: '1969',
    clues: [
      'A giant leap was taken on a dusty surface.',
      'Woodstock strummed its first chords.',
      'The internet whispered its first words.',
      'A cold war warmed with a lunar glow.',
    ],
  },
  {
    year: '1453',
    clues: [
      "A city's walls fell to cannon's roar.",
      'The East and West drew a sharper line.',
      "An empire's end birthed another's dawn.",
      'Books began their silent spread.',
    ],
  },
  {
    year: '1492',
    clues: [
      'A new world was claimed across the sea.',
      'Three ships sailed into history.',
      'Old maps were redrawn with new shores.',
      "A navigator's dream changed everything.",
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

/**
 * Gets the puzzle for today based on the current date.
 * The same puzzle will be returned for the entire day (ignoring hours, minutes, seconds).
 * The puzzle selection rotates through the available puzzles based on the days since epoch.
 */
export const getToday = (): Puzzle => {
  // Get the start of today in the user's timezone
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Convert to days since epoch (January 1, 1970)
  const daysSinceEpoch = Math.floor(startOfDay.getTime() / (1000 * 60 * 60 * 24));

  // Use the days since epoch to get a consistent index for today
  const todayIndex = daysSinceEpoch % puzzles.length;

  return puzzles[todayIndex];
};
