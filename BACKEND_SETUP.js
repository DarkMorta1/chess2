// BACKEND SETUP GUIDE - Node.js + Express + Socket.io
// This is a starting template for the backend server

/*
INSTALLATION:
  1. Create a backend folder: mkdir chess-backend
  2. Initialize npm: npm init -y
  3. Install dependencies:
     npm install express socket.io cors dotenv nodemon jwt-simple
  
  4. Create .env file with:
     PORT=3000
     JWT_SECRET=your_secret_key
     NODE_ENV=development

  5. Create index.js and add the code below

  6. Update package.json scripts:
     "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
     }

  7. Run: npm run dev
*/

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Store active games and players
const games = new Map();
const players = new Map();

// Socket.io Events
io.on('connection', (socket) => {
  console.log('New player connected:', socket.id);

  // Handle player join
  socket.on('player_join', (data) => {
    players.set(socket.id, {
      id: socket.id,
      userId: data.userId,
      username: data.username,
      rating: data.rating,
    });
    console.log('Player joined:', data.username);
  });

  // Create new game
  socket.on('create_game', (data) => {
    const gameId = Math.random().toString(36).substring(7);
    const game = {
      id: gameId,
      roomCode: data.roomCode,
      whitePlayer: players.get(socket.id),
      blackPlayer: null,
      moves: [],
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      status: 'waiting',
      createdAt: Date.now(),
    };
    games.set(gameId, game);
    socket.join(gameId);
    io.to(gameId).emit('game_created', game);
    console.log('Game created:', gameId);
  });

  // Join existing game
  socket.on('join_game', (data) => {
    const roomCode = data.roomCode.toUpperCase();
    let gameId = null;

    // Find game by room code
    for (const [gId, game] of games.entries()) {
      if (game.roomCode === roomCode && game.status === 'waiting') {
        gameId = gId;
        break;
      }
    }

    if (gameId) {
      const game = games.get(gameId);
      game.blackPlayer = players.get(socket.id);
      game.status = 'active';
      socket.join(gameId);
      io.to(gameId).emit('game_started', game);
      console.log('Player joined game:', gameId);
    } else {
      socket.emit('error', { message: 'Game not found or already started' });
    }
  });

  // Handle move
  socket.on('move', (data) => {
    const { gameId, move } = data;
    const game = games.get(gameId);

    if (game) {
      game.moves.push(move);
      game.updatedAt = Date.now();
      io.to(gameId).emit('move_made', { gameId, move });
      console.log('Move made in game:', gameId);
    }
  });

  // Handle chat message
  socket.on('send_message', (data) => {
    const { gameId, message } = data;
    const player = players.get(socket.id);

    const chatMessage = {
      id: Math.random().toString(36).substring(7),
      senderId: player.id,
      senderName: player.username,
      gameId,
      message,
      timestamp: Date.now(),
    };

    io.to(gameId).emit('message_received', chatMessage);
  });

  // End game
  socket.on('end_game', (data) => {
    const { gameId, result } = data;
    const game = games.get(gameId);

    if (game) {
      game.status = 'completed';
      game.result = result;
      io.to(gameId).emit('game_ended', game);
      console.log('Game ended:', gameId);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    players.delete(socket.id);

    // Mark games as abandoned if player disconnects
    for (const [gameId, game] of games.entries()) {
      if (
        game.status === 'active' &&
        (game.whitePlayer?.id === socket.id || game.blackPlayer?.id === socket.id)
      ) {
        game.status = 'abandoned';
        io.to(gameId).emit('opponent_disconnected');
      }
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client should connect to: http://localhost:${PORT}`);
});
