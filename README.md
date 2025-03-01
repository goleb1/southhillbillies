# Running Pace Calculator

A simple web application for calculating running paces across different distances based on a reference time and distance.

## Features

- Select from a variety of common running distances (sprints to ultra marathons)
- Input your time in hours, minutes, and seconds
- Calculate equivalent times for all distances based on your input
- View pace variations (5%, 10%, 25% faster/slower)
- Compare your times with world records for men and women
- Display speed in miles per hour and kilometers per hour

## Technology Stack

- Next.js 14 with App Router
- React
- TypeScript
- Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

The calculator uses a linear relationship between distance and time to estimate equivalent performances across different distances. This is a simplified model and actual performance may vary based on factors like terrain, weather, and fatigue.

## License

MIT