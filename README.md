# Custom Bingo Card Web App

This is a web application for creating custom bingo cards where multiple people can play on one bingo card. Users can create a room with a bingo card that they can fully customize. They can choose between classic 5x5, 4x4, 3x3, or 2x2 bingo card layouts. Users can fill out each cell with any information they want and pick different colors to mark out the cells they have completed. The application is built using Next.js, React.js, Tailwind CSS, socket.io for WebSocket integration, and Supabase as the database for hosting the rooms and bingo history.

## Features

- **Room Creation**: Users can create a room with a custom bingo card.
- **Customizable Bingo Cards**: Users can choose between different bingo card layouts (5x5, 4x4, 3x3, or 2x2) and fill out each cell with their desired information.
- **Multiplayer Support**: Multiple users can play on one bingo card in real-time.
- **Color Customization**: Users can pick different colors to mark out the cells they have completed.
- **WebSocket Integration**: Real-time updates are provided using socket.io for WebSocket integration.
- **Database Integration**: Supabase is used as the database for hosting rooms and bingo history.

## Technologies Used

- **Next.js**: Next.js is a React framework that enables server-side rendering, static site generation, and other powerful features.
- **React.js**: React.js is a JavaScript library for building user interfaces.
- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework for quickly building custom designs.
- **socket.io**: socket.io is a JavaScript library for real-time web applications. It enables bidirectional communication between web clients and servers.
- **Supabase**: Supabase is an open-source Firebase alternative. It provides a suite of tools for building scalable web applications with PostgreSQL as the database.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/custom-bingo-card-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd custom-bingo-card-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Create a room by choosing the desired bingo card layout and filling out each cell with information.
2. Share the room link with other users who want to join the game.
3. Players can mark out cells on the bingo card in real-time as the game progresses.
4. The game host can customize game settings, monitor player progress, and manage the game session.
5. ⭐ No need to create a new lobby for a new bingo card! You can customize the bingo card and continue playing with the same room.⭐

## Contributing

Contributions are welcome! If you have any feature requests, bug reports, or suggestions, please open an issue or submit a pull request.
