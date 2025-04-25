import { Puzzle, TimeCard } from '../types';

export const puzzles: Puzzle[] = [
  // 11th Century
  {
    year: '1066',
    clues: [
      'An arrow reached for the sky, a crown fell in autumn.',
      'Normans danced on English soil.',
      'A tapestry began its long tale.',
      'The last Saxon star faded in the north.',
    ],
  },
  // 13th Century
  {
    year: '1215',
    clues: [
      'Kings bowed to parchment by the river.',
      'Liberty found its first written home.',
      'Barons spoke, a monarch listened.',
      'Rights were inked at Runnymede.',
    ],
  },
  {
    year: '1271',
    clues: [
      'A young merchant set out from Venice.',
      'Silk roads beckoned with eastern promises.',
      'A journey of paper and spice began.',
      'The Khan would soon meet his scribe.',
    ],
  },
  // 14th Century
  {
    year: '1347',
    clues: [
      'Ships carried invisible death to golden ports.',
      'Rats whispered secrets in the dark.',
      'Rings of roses bloomed across Europe.',
      'A third of the world held its breath.',
    ],
  },
  // 15th Century
  {
    year: '1453',
    clues: [
      'Bronze dragons roared at ancient walls.',
      'Two seas met in one city.',
      'A crescent rose where crosses stood.',
      'A thousand years of purple ended.',
    ],
  },
  {
    year: '1492',
    clues: [
      'Three sisters sailed west into legend.',
      'An ocean of dreams found new shores.',
      'Gold whispered from beyond the horizon.',
      'A world grew twice its size.',
    ],
  },
  // 16th Century
  {
    year: '1517',
    clues: [
      'A hammer struck 95 times.',
      'A monk challenged Rome.',
      'Latin lost its monopoly on faith.',
      'German presses worked overtime.',
    ],
  },
  // 17th Century
  {
    year: '1644',
    clues: [
      'Dragons fell silent in the Forbidden City.',
      'A great wall changed hands.',
      'Manchu horses galloped south.',
      'The last Ming light faded.',
    ],
  },
  // 18th Century
  {
    year: '1776',
    clues: [
      'Liberty bells rang in summer.',
      'Thirteen stars aligned.',
      'Tea stained harbor waters still.',
      'A declaration changed the world.',
    ],
  },
  {
    year: '1789',
    clues: [
      'Bread prices sparked a fire in Paris.',
      'A prison fell, chains shattered.',
      'Madame Guillotine prepared her debut.',
      'Royalty lost its head.',
    ],
  },
  // 19th Century
  {
    year: '1815',
    clues: [
      'Rain soaked the fields of destiny.',
      'An eagle met its Waterloo.',
      'Europe redrew its borders.',
      'A tiny island gained a resident.',
    ],
  },
  {
    year: '1867',
    clues: [
      'A northern nation was born in peace.',
      'Maple leaves united.',
      'Two languages found one voice.',
      'A dominion stretched sea to sea.',
    ],
  },
  {
    year: '1868',
    clues: [
      'Samurai swords were laid to rest.',
      'The sun rose on a new Japan.',
      'Western winds swept through ancient halls.',
      'An emperor emerged from shadows.',
    ],
  },
  // 20th Century Early
  {
    year: '1912',
    clues: [
      'Ice claimed an unsinkable dream.',
      'Orchestra played as waters rose.',
      'Luxury sank into legend.',
      'A maiden voyage ended in depths.',
    ],
  },
  {
    year: '1929',
    clues: [
      'Wall Street whispered then screamed.',
      'Paper fortunes turned to dust.',
      'Banks closed their doors forever.',
      'The mighty fell on Black Tuesday.',
    ],
  },
  {
    year: '1945',
    clues: [
      'Two suns rose in the east.',
      'Peace came at atomic cost.',
      'Victory spelled relief and regret.',
      'The world entered a new age.',
    ],
  },
  {
    year: '1947',
    clues: [
      'A jewel was split in two.',
      'Midnight struck, nations were born.',
      'Lines drawn in haste lasted decades.',
      'Gandhi walked his final steps.',
    ],
  },
  // 20th Century Mid
  {
    year: '1955',
    clues: [
      'A tired seamstress kept her seat.',
      'Buses changed routes in Alabama.',
      'Justice stirred in Montgomery.',
      'A movement found its quiet hero.',
    ],
  },
  {
    year: '1969',
    clues: [
      'Footprints marked a pale desert.',
      'Peace signs bloomed in summer mud.',
      'Eagles landed, giants leaped.',
      'Music made history at a farm.',
    ],
  },
  // 20th Century Late
  {
    year: '1989',
    clues: [
      'Concrete walls crumbled in autumn.',
      "Hammers struck Berlin's divide.",
      'Iron curtains rusted away.',
      'Europe breathed as one again.',
    ],
  },
  {
    year: '1991',
    clues: [
      'A red flag lowered one last time.',
      'Fifteen stars split from their center.',
      'The cold war thawed completely.',
      'An empire dissolved into history.',
    ],
  },
  // 21st Century
  {
    year: '2001',
    clues: [
      'Steel giants fell from blue skies.',
      'The world held its breath on Tuesday.',
      'Innocence ended in September.',
      'Everything changed before noon.',
    ],
  },
  {
    year: '2008',
    clues: [
      'Lehman Brothers said goodnight.',
      'Housing dreams turned to bubbles.',
      'Markets tumbled like dominoes.',
      'The economy needed intensive care.',
    ],
  },
  {
    year: '2011',
    clues: [
      'Earth shook, waves climbed mountains.',
      'Nuclear hearts skipped beats.',
      'Cherry blossoms fell early.',
      'Japan faced its darkest spring.',
    ],
  },
  {
    year: '2020',
    clues: [
      'The world went home and stayed there.',
      'Masks became fashion statements.',
      'Streets emptied, screens filled.',
      'Distance became social.',
    ],
  },
  {
    year: '2022',
    clues: [
      'Bears and eagles clashed in winter.',
      'Sunflowers watched tanks roll by.',
      'Europe united against aggression.',
      'Kiev stood defiant.',
    ],
  },
  {
    year: '2023',
    clues: [
      'Silicon Valley Bank closed its doors.',
      'AI whispered human-like thoughts.',
      'Twitter became X marks the spot.',
      'Hollywood went silent in summer.',
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
