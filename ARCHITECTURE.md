# ChessHub - Architecture & Developer Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  React Router                                          │  │
│  │  ├─ /login          (LoginPage)                       │  │
│  │  ├─ /signup         (SignupPage)                      │  │
│  │  ├─ /              (HomePage)                         │  │
│  │  ├─ /game/online    (OnlineGamePage)                  │  │
│  │  ├─ /game/local     (LocalGamePage)                   │  │
│  │  ├─ /leaderboard    (LeaderboardPage)                 │  │
│  │  ├─ /history        (GameHistoryPage)                 │  │
│  │  └─ /settings       (SettingsPage)                    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         ↓                          ↓                    ↓
┌──────────────────┐  ┌─────────────────────┐  ┌────────────────┐
│  Socket.io       │  │   Firebase          │  │  Local State   │
│  (Real-time)     │  │   (Firestore Auth)  │  │  (LocalGame)   │
└──────────────────┘  └─────────────────────┘  └────────────────┘
         ↓                          ↓
┌──────────────────────────────────────────────────────────────┐
│                    Backend (Node + Express)                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Socket.io Server                                     │  │
│  │  ├─ Game Management                                  │  │
│  │  ├─ Player State                                     │  │
│  │  ├─ Real-time Sync                                  │  │
│  │  └─ Chat Relay                                       │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────────────────────┐
│              Firebase Firestore (Database)                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Collections:                                         │  │
│  │  ├─ users/      (User profiles)                      │  │
│  │  ├─ games/      (Game records)                       │  │
│  │  └─ messages/   (Chat messages)                      │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow:
```
User Input
    ↓
[AuthContext] (useAuth hook)
    ↓
[authService] (Firebase Auth)
    ↓
Firebase Authentication
    ↓
Token + User Data
    ↓
LocalStorage + Context State
    ↓
Socket.io Connect (with token)
```

### Game Flow (Online):
```
Player A                           Player B
    ↓                                 ↓
Create/Join Game
    ↓
Send to Socket.io ────────→ Backend (game.js)
    ↓                           ↓
Receive game_started      Broadcast to Player B
                                 ↓
                          Receive game_started
    ↓                                 ↓
Make Move ─────────────→ Backend ─────→ Forward to Player B
    ↓                                 ↓
Update Board          Update Board
    ↓                                 ↓
Render Component              Render Component
```

### Game Flow (Local):
```
Player A                          Player B
    ↓                               ↓
[LocalGamePage Component]
    ↓
Make Move
    ↓
Chess.js Validation
    ↓
Update Local State
    ↓
Rotate Board
    ↓
Render
    ↓
Player B's Turn
```

## Component Hierarchy

```
App
├── Router
│   ├── AuthProvider
│   │   ├── Navbar
│   │   └── Routes
│   │       ├── LoginPage
│   │       ├── SignupPage
│   │       ├── HomePage
│   │       │   └── Navigation Cards
│   │       ├── OnlineGamePage
│   │       │   ├── ChessBoard
│   │       │   └── ChatBox
│   │       ├── LocalGamePage
│   │       │   ├── ChessBoard
│   │       │   └── Move History
│   │       ├── LeaderboardPage
│   │       │   └── Player Table
│   │       ├── GameHistoryPage
│   │       └── SettingsPage
```

## State Management

### Global State (Context API):
- **AuthContext** - User authentication & profile
  - user (User object)
  - isLoading (boolean)
  - error (string)
  - Functions: signup, login, logout

### Local Component State:
- **OnlineGamePage** - Game instance, chat messages, room code
- **LocalGamePage** - Chess instance, move history, current player
- **HomePage** - User stats display
- **LeaderboardPage** - Player rankings

### Socket.io State (Backend):
- Active games map
- Player connections map
- Game move history

### Database State (Firestore):
- User documents
- Game documents
- Message documents (optional)

## Service Layer

### AuthService
```typescript
Methods:
- signup(email, password, username): Promise<{user, token}>
- login(email, password): Promise<{user, token}>
- logout(): Promise<void>
- getCurrentUser(): Promise<User>
- updateUserProfile(userId, updates): Promise<void>
- getTokenFromStorage(): string | null
- saveTokenToStorage(token): void
- removeTokenFromStorage(): void
```

### GameService
```typescript
Methods:
- createGame(...): Promise<GameState>
- getGame(gameId): Promise<GameState>
- updateGame(gameId, updates): Promise<void>
- makeMove(chess, move): string | null
- isCheckmate(chess): boolean
- isStalemate(chess): boolean
- isCheck(chess): boolean
- isGameOver(chess): boolean
- getGameResult(...): {winner?, result?}
- getPossibleMoves(chess, square): string[]
- getGameHistory(userId, limit): Promise<GameState[]>
- getPlayerStats(userId): Promise<{...}>
- generatePGN(moves, game): string
```

### SocketService
```typescript
Methods:
- connect(token): Promise<void>
- disconnect(): void
- isConnected(): boolean
- createGame(gameType): string
- joinGame(roomCode): void
- makeMove(gameId, move): void
- sendMessage(gameId, message): void
- onGameStarted(callback): void
- onMoveMade(callback): void
- onGameEnded(callback): void
- onMessageReceived(callback): void
- offGameStarted(): void
- offMoveMade(): void
- offGameEnded(): void
- offMessageReceived(): void
```

### FirebaseService
```typescript
Exports:
- db: Firestore instance
- auth: Auth instance
- app: Firebase app
```

## Type Definitions

```typescript
// User
interface User {
  id: string
  email: string
  username: string
  avatar?: string
  wins: number
  losses: number
  draws: number
  rating: number
}

// Game
interface GameState {
  id: string
  whitePlayer: User
  blackPlayer: User
  status: 'waiting' | 'active' | 'completed'
  pgn: string
  moves: GameMove[]
  fen: string
  result?: 'white' | 'black' | 'draw'
  createdAt: number
  updatedAt: number
  roomCode?: string
  timeControl?: {initial, increment}
}

// Move
interface GameMove {
  from: string
  to: string
  promotion?: string
  timestamp: number
}

// Chat
interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  gameId: string
  message: string
  timestamp: number
}

// Leaderboard
interface LeaderboardEntry extends User {
  rank: number
}
```

## API Endpoints (Backend)

```
GET /health
  Response: {status: string}

Socket Events:
  IN: player_join
    Data: {userId, username, rating}
  
  IN: create_game
    Data: {roomCode}
    OUT: game_created
  
  IN: join_game
    Data: {roomCode}
    OUT: game_started (both players)
  
  IN: move
    Data: {gameId, move}
    OUT: move_made (both players)
  
  IN: send_message
    Data: {gameId, message}
    OUT: message_received (both players)
  
  IN: end_game
    Data: {gameId, result}
    OUT: game_ended (both players)
  
  ON: disconnect
    OUT: opponent_disconnected
```

## Firestore Collection Schema

### users/{userId}
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "username": "username",
  "avatar": "https://...",
  "wins": 10,
  "losses": 5,
  "draws": 2,
  "rating": 1450,
  "createdAt": 1634567890000,
  "updatedAt": 1634567890000
}
```

### games/{gameId}
```json
{
  "id": "game-uuid",
  "whitePlayer": {...User},
  "blackPlayer": {...User},
  "status": "completed",
  "pgn": "1.e4 e5 2.Nf3...",
  "moves": [{from, to, promotion}, ...],
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "result": "white",
  "createdAt": 1634567890000,
  "updatedAt": 1634567890000,
  "roomCode": "ABC123"
}
```

## Error Handling

### Frontend:
- Try-catch blocks in async operations
- Error states in components
- User-friendly error messages
- Console error logging

### Backend:
- Express error middleware
- Socket error events
- Graceful disconnections
- Logging

### Database:
- Firestore security rules
- Field validation
- Transaction handling
- Rollback on errors

## Performance Optimizations

1. **Code Splitting** - Route-based lazy loading
2. **Memoization** - React.memo for components
3. **State Management** - Context API (minimal re-renders)
4. **Database Queries** - Indexed collections, pagination
5. **Socket Optimization** - Event deduplication
6. **CSS** - Tailwind CSS optimized build
7. **Images** - Optimized icon library (Lucide)

## Security Considerations

1. **Authentication** - JWT tokens, secure storage
2. **Authorization** - Firestore security rules
3. **Data Validation** - Server-side validation
4. **HTTPS** - Required in production
5. **CORS** - Properly configured
6. **Environment Variables** - Sensitive data never in code
7. **Input Sanitization** - Prevent XSS attacks

## Testing Strategy

### Unit Tests:
- Service functions
- Utility functions
- Type validation

### Integration Tests:
- Socket.io events
- Firebase operations
- Auth flow

### E2E Tests:
- Game creation/joining
- Move execution
- Chat functionality
- Leaderboard queries

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Build successful (npm run build)
- [ ] No console errors
- [ ] API endpoints verified
- [ ] Firestore rules updated
- [ ] CORS configured
- [ ] Database backups enabled
- [ ] Monitoring enabled
- [ ] Error tracking enabled
- [ ] CDN configured (optional)

## Contributing Guidelines

1. Fork the repository
2. Create feature branch from main
3. Write tests for new features
4. Follow TypeScript strict mode
5. Use Prettier for formatting
6. Submit PR with description

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Socket.io Guide](https://socket.io/docs)
- [Chess.js GitHub](https://github.com/jhlywa/chess.js)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Last Updated:** November 2025
