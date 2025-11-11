# ChessHub - Complete Setup & Deployment Guide

## 🚀 Quick Start

### 1. Frontend Setup (Current Project)

**Environment Setup:**
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Firebase credentials
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_SERVER_URL=http://localhost:3000
```

**Install & Run:**
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### 2. Backend Setup

**Create Backend Project:**
```bash
mkdir chess-backend
cd chess-backend
npm init -y
npm install express socket.io cors dotenv nodemon
```

**Create .env:**
```
PORT=3000
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Copy backend code from BACKEND_SETUP.js and create index.js**

**Run Backend:**
```bash
npx nodemon index.js
```

### 3. Firebase Setup

**Create Firebase Project:**
1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter project name "chess-hub"
4. Enable Google Analytics (optional)

**Setup Authentication:**
1. Go to Authentication → Sign-in method
2. Enable "Email/Password"

**Setup Firestore:**
1. Go to Firestore Database
2. Click "Create Database"
3. Start in "Test mode" (for development)
4. Choose region (e.g., us-central1)

**Get Credentials:**
1. Go to Project Settings (⚙️ icon)
2. Click "Service accounts" tab
3. Look for Web app configuration
4. Copy the config values to .env.local

**Firestore Security Rules (for development):**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /users/{userId} {
      allow read, write: if request.auth.uid != null;
    }
    match /games/{gameId} {
      allow read, write: if request.auth.uid != null;
    }
    match /messages/{messageId} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

## 📁 Project Structure

```
chess2/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ChessBoard.tsx
│   │   ├── ChatBox.tsx
│   │   └── Navbar.tsx
│   ├── context/            # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/              # Custom hooks
│   │   └── useAuth.ts
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── OnlineGamePage.tsx
│   │   ├── LocalGamePage.tsx
│   │   ├── LeaderboardPage.tsx
│   │   ├── GameHistoryPage.tsx
│   │   └── SettingsPage.tsx
│   ├── services/           # Services
│   │   ├── auth.ts
│   │   ├── firebase.ts
│   │   ├── game.ts
│   │   └── socket.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── package.json
```

## 🎯 Key Features Implementation

### Online Multiplayer Flow:
1. Player creates game → Gets room code
2. Shares room code with friend
3. Friend joins game
4. Socket.io synchronizes moves in real-time
5. Chat works over Socket.io connection

### Local Two-Player Flow:
1. No backend needed
2. State stored in component
3. Board rotates between moves
4. Full move history available

### Authentication Flow:
1. User signs up → Stored in Firebase Auth
2. User profile stored in Firestore
3. JWT token from Firebase
4. Token used for Socket.io authentication
5. Session persisted in localStorage

### Game Statistics Flow:
1. After game ends → Result stored in Firestore
2. User rating/stats updated
3. Leaderboard queries Firestore
4. Real-time leaderboard updates

## 🔧 Available Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend (chess-backend folder)
npm run dev          # Start with nodemon
npm start            # Start production
```

## 📦 Production Deployment

### Frontend (Vercel, Netlify, Firebase Hosting)

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

**Build Commands:**
- Build: `npm run build`
- Output: `dist/`

### Backend (Heroku, Railway, Render)

**Heroku:**
```bash
heroku login
heroku create chess-backend
git push heroku main
```

**Render:**
1. Connect GitHub repo
2. Set environment variables
3. Deploy

**Environment Variables (Production):**
```
NODE_ENV=production
PORT=3000
JWT_SECRET=strong_secret_key
CLIENT_URL=https://your-frontend-url.com
FIREBASE_PROJECT_ID=your_project
```

## 🐛 Troubleshooting

### Socket.io Connection Failed
- Ensure backend is running on correct port
- Check VITE_SERVER_URL in .env.local
- Verify CORS settings match frontend URL

### Firebase Authentication Error
- Verify Firebase credentials in .env.local
- Check authentication provider is enabled
- Confirm email/password provider is active

### Chessboard Not Displaying
- Clear browser cache
- Verify react-chessboard installation
- Check Tailwind CSS configuration

### Move Not Synchronizing
- Verify Socket.io events are emitted/listened correctly
- Check browser console for errors
- Ensure game room is correct

## 📚 File Documentation

### Services

**auth.ts** - Authentication service
- signup() - User registration
- login() - User authentication
- logout() - User logout
- getCurrentUser() - Get current user
- updateUserProfile() - Update user info

**game.ts** - Game logic
- createGame() - Initialize game
- getGame() - Fetch game
- updateGame() - Update game state
- makeMove() - Execute move
- getGameHistory() - User's games
- getPlayerStats() - User statistics

**socket.ts** - WebSocket communication
- connect() - Connect to server
- disconnect() - Disconnect from server
- createGame() - Create new game
- joinGame() - Join existing game
- makeMove() - Send move
- sendMessage() - Send chat message

**firebase.ts** - Firebase configuration
- Initializes Firebase
- Exports Firestore database
- Exports Auth service

### Components

**ChessBoard.tsx** - Interactive chess board
- Displays current position
- Handles square clicks
- Shows legal moves
- Emits move events

**ChatBox.tsx** - In-game chat
- Displays messages
- Input field
- Send button
- Auto-scroll to latest

**Navbar.tsx** - Navigation bar
- User profile display
- Rating display
- Logout button
- Navigation links

### Pages

**HomePage.tsx** - Main dashboard
- User stats display
- Quick action buttons
- Navigation to game modes

**LoginPage.tsx** - User login
- Email/password inputs
- Error handling
- Link to signup

**SignupPage.tsx** - User registration
- Email/password/username inputs
- Account creation
- Link to login

**OnlineGamePage.tsx** - Online multiplayer
- Room code creation/joining
- Real-time game board
- Chat interface
- Opponent waiting screen

**LocalGamePage.tsx** - Local two-player
- Interactive chess board
- Move history display
- Game status
- Reset game button

**LeaderboardPage.tsx** - Global rankings
- Top 50 players
- Rating display
- Win/loss/draw stats
- Search/filter (optional)

**GameHistoryPage.tsx** - Match history
- List of past games
- Filterable by result
- PGN notation (future)
- Game replay (future)

**SettingsPage.tsx** - Customization
- Board theme selector
- Piece theme selector
- Sound settings
- Notification settings

## 🎮 Game Rules Implemented

✅ Standard chess rules
✅ Check/checkmate detection
✅ Stalemate detection
✅ Castling (kingside & queenside)
✅ En passant
✅ Pawn promotion
✅ Move validation
✅ FEN notation support
✅ PGN generation

## 🚀 Future Enhancements

- [ ] ELO rating system
- [ ] Tournament brackets
- [ ] Game analysis with engine
- [ ] Video/audio chat
- [ ] Mobile app (React Native)
- [ ] AI opponent (Stockfish)
- [ ] Spectator mode
- [ ] Game replay/analysis
- [ ] Time controls
- [ ] Blitz/Rapid/Classical modes
- [ ] Friend list
- [ ] Achievements/badges
- [ ] Daily puzzles
- [ ] Opening explorer

## 📞 Support & Contact

For issues, feature requests, or questions:
- Open GitHub issue
- Email support
- Discord community

## 📄 License

MIT License - Free to use and modify

---

Happy playing! ♟️🎮
