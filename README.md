# Chronos Code

A daily historical date guessing game inspired by Wordle. Challenge yourself to decode historical dates through cryptic clues!

## Features

- Daily puzzles with unique historical dates
- Cryptic clues that blend historical events, cultural references, and scientific milestones
- Wordle-style feedback system with colored hints
- Score tracking and streaks
- Unlockable Time Cards for achievements
- Social sharing functionality

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## How to Play

1. Each day, you'll get a new set of 4-5 cryptic clues about a specific year in history
2. You have 6 attempts to guess the correct year
3. After each guess:
   - Green: Correct digit in the right position
   - Yellow: Correct digit in the wrong position
   - Gray: Incorrect digit
4. Score points based on:
   - Number of remaining attempts (100 points each)
   - Speed bonus (+50 points if solved within 5 minutes)
   - Daily streaks (+25 points per consecutive day)

## Built With

- React
- TypeScript
- Vite
- Chakra UI
- date-fns
