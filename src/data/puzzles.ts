import { Puzzle } from '../types';

export const puzzles: Puzzle[] = [
  {
    date: '2024-04-09',
    clues: [
      'A giant leap was taken on a dusty surface.',
      'Woodstock strummed its first chords.',
      'The internet whispered its first words.',
      'A cold war warmed with a lunar glow.',
    ],
    answer: 1969,
  },
  {
    date: '2024-04-10',
    clues: [
      'A city\'s walls fell to cannon\'s roar.',
      'The East and West drew a sharper line.',
      'An empire\'s end birthed another\'s dawn.',
      'Books began their silent spread.',
    ],
    answer: 1453,
  },
  {
    date: '2024-04-11',
    clues: [
      'A new world was claimed across the sea.',
      'Three ships sailed into history.',
      'Old maps were redrawn with new shores.',
      'A navigator\'s dream changed everything.',
    ],
    answer: 1492,
  },
];

export const getToday = (): Puzzle => {
  const today = new Date().toISOString().split('T')[0];
  return puzzles.find(puzzle => puzzle.date === today) || puzzles[0];
}; 