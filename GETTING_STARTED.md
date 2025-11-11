# 🚀 ChessHub - Getting Started Guide

Welcome to ChessHub! This guide will help you get the project up and running.

## ✅ Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher
- **Git**
- **Firebase Account** (free tier available)
- **Code Editor** (VS Code recommended)

## 📋 Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Firebase
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project named "ChessHub"
3. Enable Authentication (Email/Password)
4. Create Firestore Database (Start in Test mode)
5. Copy your web config

### Step 3: Create .env.local
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_SERVER_URL=http://localhost:3000
```

### Step 4: Start Dev Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser! 🎉

## 🎮 Using the App

### Create an Account
1. Click "Sign Up" on the login page
2. Enter email, password, and username
3. Account created in Firebase!

### Play Locally
1. From home page, click "Local Two-Player"
2. Two players can play on same device
3. Click squares to move pieces
4. Green indicators show legal moves

### Play Online (requires backend)
1. Click "Online Multiplayer"
2. Create game (get room code) or join with code
3. Share code with friend
4. Play in real-time with chat

### View Leaderboard
1. Click "Leaderboard" from home
2. See top 50 players
3. View their stats and ratings

## 🛠️ Backend Setup (for Online Multiplayer)

### Create Backend Project
```bash
# Create new folder
mkdir chess-backend && cd chess-backend

# Initialize npm
npm init -y

# Install dependencies
npm install express socket.io cors dotenv nodemon
```

### Create Backend Files

**package.json** - Add to scripts:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

**Create .env:**
```
PORT=3000
JWT_SECRET=your_secret_key_12345
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Create index.js** - Copy from BACKEND_SETUP.js in this project

### Run Backend
```bash
npm run dev
```

Backend runs on `http://localhost:3000`

## 📚 Project Structure

```
chess2/
├── src/
│   ├── components/          # UI Components
│   │   ├── ChessBoard.tsx
│   │   ├── ChatBox.tsx
│   │   └── Navbar.tsx
│   ├── context/            # React Contexts
│   │   └── AuthContext.tsx
│   ├── hooks/              # Custom Hooks
│   │   └── useAuth.ts
│   ├── pages/              # Page Components
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
│   ├── types/              # TypeScript Definitions
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `App.tsx` | Main app with routing |
| `pages/*` | All page components |
| `services/auth.ts` | User authentication |
| `services/game.ts` | Chess game logic |
| `services/socket.ts` | Real-time communication |
| `services/firebase.ts` | Firebase config |
| `types/index.ts` | TypeScript types |

## 🎯 Features Breakdown

### 1. Authentication
- Email/password registration
- Firebase Auth integration
- JWT tokens
- Persistent sessions
- Logout functionality

### 2. Local Two-Player
- Interactive chessboard
- Full move history
- Check/checkmate detection
- Move notation display
- Board rotation

### 3. Online Multiplayer (with backend)
- Room codes for invites
- Real-time move sync
- In-game chat
- Opponent waiting screen
- Auto-reconnection

### 4. Leaderboard
- Top 50 players ranked
- Rating display
- Win/loss/draw stats
- Quick stats view

### 5. Game History
- Past games list
- Filter by result
- Detailed game info
- PGN notation (future)

### 6. Settings
- Board theme selection
- Piece theme selection
- Sound settings
- Notification preferences

## 💻 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code (if configured)
npm run format
```

## 🐛 Common Issues & Solutions

### Issue: Firebase connection error
**Solution:**
- Verify .env.local has correct Firebase credentials
- Check Firebase project is created
- Ensure Authentication is enabled

### Issue: Chessboard not showing
**Solution:**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check browser console for errors

### Issue: Backend connection fails
**Solution:**
- Ensure backend is running (npm run dev)
- Check VITE_SERVER_URL in .env.local
- Verify backend port is 3000

### Issue: Can't sign up
**Solution:**
- Check email format is valid
- Password must be 6+ characters
- Ensure email not already registered

## 📱 Browser Compatibility

✅ Chrome/Chromium (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm install -g vercel
vercel
```

### Frontend (Firebase Hosting)
```bash
firebase init hosting
npm run build
firebase deploy
```

### Backend (Render)
1. Connect GitHub repo to Render
2. Set environment variables
3. Deploy

## 📖 Additional Resources

- **Setup Guide**: See `SETUP_GUIDE.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Backend Code**: See `BACKEND_SETUP.js`
- **API Types**: See `src/types/index.ts`

## 🎓 Learning Path

1. Start with local two-player game
2. Try to understand the ChessBoard component
3. Explore the game service (chess logic)
4. Setup Firebase and try authentication
5. Setup backend and try online multiplayer
6. Customize themes and settings
7. Deploy to production

## 🤝 Contributing

Want to add features? Here's how:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Push to your fork
5. Submit a pull request

## ❓ FAQ

**Q: Do I need a backend for local play?**
A: No! Local two-player works without backend.

**Q: Can I play without Firebase?**
A: For local play, yes. For online/leaderboard, no.

**Q: Where's the AI opponent?**
A: Coming in v2.0! (See future enhancements)

**Q: Can I deploy for free?**
A: Yes! Frontend (Vercel/Firebase free), Backend (Render free tier)

**Q: How do I add new themes?**
A: Modify tailwind.config.js and add new color schemes

## 📞 Support

- 📧 Email: support@chesshub.dev
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

## 📄 License

MIT License - Feel free to use, modify, and distribute!

## 🎉 You're All Set!

You now have a fully functional chess application! 

**Next Steps:**
1. ✅ Run `npm run dev`
2. ✅ Create an account
3. ✅ Try local game
4. ✅ Setup backend for online play
5. ✅ Invite friends to play!

**Happy Chess Playing! ♟️**

---

For detailed information, see:
- SETUP_GUIDE.md - Complete setup instructions
- ARCHITECTURE.md - Technical architecture
- README.md - Full documentation
