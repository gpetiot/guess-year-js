# guess-year-js

A React-based historical date guessing game where players guess the year based on cryptic clues about major historical events.

The game is live at [datyear.com](https://datyear.com).

**Game Rules**

1. **Objective**: Guess the historical year based on cryptic clues
2. **Attempts**: You have 6 attempts to guess correctly
3. **Feedback**: 
   - 🟩 Green: Correct digit in correct position
   - 🟨 Yellow: Correct digit in wrong position
   - 🟥 Red: Incorrect digit
4. **Scoring**: Points awarded based on remaining attempts and speed
5. **Daily**: New puzzle available every day

## Getting Started

### Prerequisites

- Node.js (>=20.0.0)
- npm (>=10.0.0)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gpetiot/guess-year-js.git
   cd guess-year-js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
```

The build files will be generated in the `dist/` directory.

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
