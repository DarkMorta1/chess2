# 📖 ChessHub - Command Reference

Quick reference for all important commands and operations.

## 🚀 Initial Setup

```bash
# Navigate to project directory
cd chess2

# Install all dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Firebase credentials
# (Use your preferred editor: code .env.local)
```

## 🎮 Development

```bash
# Start development server (http://localhost:5173)
npm run dev

# Start with specific port
npm run dev -- --port 5174

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

## 🔧 Firebase Setup Commands

```bash
# Install Firebase CLI globally (one-time)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in a new directory
firebase init

# Deploy to Firebase Hosting
firebase deploy

# View Firebase logs
firebase functions:log
```

## 🌐 Backend Setup

```bash
# Create backend directory
mkdir chess-backend
cd chess-backend

# Initialize Node project
npm init -y

# Install backend dependencies
npm install express socket.io cors dotenv nodemon

# Copy backend code from BACKEND_SETUP.js
# then run:

# Start backend in development mode
npm run dev

# Start backend in production
npm start
```

## 📦 Dependency Management

```bash
# Update all dependencies to latest
npm update

# Check for outdated packages
npm outdated

# Install specific package
npm install package-name

# Install specific package version
npm install package-name@1.2.3

# Remove package
npm uninstall package-name

# Clean install (removes node_modules, reinstalls)
rm -rf node_modules package-lock.json
npm install

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## 🧹 Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix

# Type check with TypeScript
npx tsc --noEmit

# Format code (if Prettier configured)
npm run format
```

## 🌍 Environment Configuration

### Development
```bash
VITE_SERVER_URL=http://localhost:3000
```

### Production
```bash
VITE_SERVER_URL=https://api.chesshub.com
```

### Firebase Config
```bash
VITE_FIREBASE_API_KEY=abc...
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123...
VITE_FIREBASE_APP_ID=1:123...
```

## 📚 Building & Deployment

```bash
# Build for production
npm run build

# Output is in dist/ directory

# Test production build locally
npm run preview

# Build and check size
npm run build
du -sh dist/

# Deploy to Vercel
vercel

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

## 🐛 Debugging

```bash
# Check if port 5173 is in use
netstat -ano | findstr :5173  # Windows
lsof -i :5173                  # Mac/Linux

# Kill process on port 5173
taskkill /PID 1234 /F  # Windows
kill -9 1234            # Mac/Linux

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version

# Check npm version
npm --version
```

## 📋 Git Commands

```bash
# Initialize git (first time)
git init

# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout main

# Merge branch
git merge feature-name
```

## 🔍 Troubleshooting Commands

```bash
# Check if npm is installed
npm --version

# Check if Node is installed
node --version

# Check if TypeScript is installed globally
tsc --version

# View npm logs
npm logs

# Debug with verbose output
npm run dev -- --debug

# Check what's in node_modules
du -sh node_modules/

# List installed packages
npm list

# View global packages
npm list -g
```

## 📊 Project Information

```bash
# Check project dependencies
npm list

# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Generate project size report
npm run build
npx webpack-bundle-analyzer dist/
```

## 🚢 Production Checklist

```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm install

# 2. Lint code
npm run lint

# 3. Type check
npx tsc --noEmit

# 4. Build
npm run build

# 5. Check build output
du -sh dist/
ls -la dist/

# 6. Preview
npm run preview

# 7. Check environment variables
cat .env.local

# 8. Deploy
npm run build && firebase deploy
```

## 💾 Database Commands

### Firebase Firestore

```bash
# Export Firestore data
firebase firestore:export ./data-export

# Import Firestore data
firebase firestore:import ./data-export

# View Firestore usage
firebase firestore:usage-report

# Delete collection
firebase firestore:delete collection-name
```

## 🔐 Environment Security

```bash
# Never commit .env.local!
echo ".env.local" >> .gitignore

# View environment variables (don't share output!)
cat .env.local

# Rotate Firebase keys (do in Firebase Console)
# Go to Project Settings → Service Accounts
```

## 📱 Testing Commands

```bash
# Run unit tests (if configured)
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch

# E2E tests (if configured)
npm run test:e2e
```

## 🎯 Quick Reference Card

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build prod | `npm run build` |
| Preview build | `npm run preview` |
| Lint code | `npm run lint` |
| Install deps | `npm install` |
| Update deps | `npm update` |
| Check security | `npm audit` |
| View logs | `npm logs` |

## 🆘 Emergency Commands

```bash
# Force stop all Node processes
killall node  # Mac/Linux
taskkill /F /IM node.exe  # Windows

# Clear all caches
npm cache clean --force

# Full reset
rm -rf node_modules package-lock.json
npm install

# Remove build artifacts
rm -rf dist/

# Start fresh
git clean -fd
npm install
npm run dev
```

## 💡 Pro Tips

```bash
# Use npm ci for reproducible installs (CI/CD)
npm ci

# Run background process
npm run dev > log.txt 2>&1 &

# View real-time logs
tail -f log.txt

# Split terminal output
npm run dev | tee output.log

# Run multiple commands
npm run lint && npm run build && npm run preview
```

## 📞 Getting Help

```bash
# npm help
npm help

# Help for specific command
npm help install

# Check latest npm version
npm view npm version

# Update npm
npm install -g npm@latest
```

## 🔗 Useful Links

- [npm Documentation](https://docs.npmjs.com)
- [Node.js Documentation](https://nodejs.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

---

**Last Updated**: November 2025
**Tested With**: Node 18+, npm 9+
