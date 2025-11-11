# TODO: Fix ESLint Errors

## Steps to Complete

1. **Fix ChessBoard.tsx**
   - Remove unused eslint-disable directive on line 90.
   - Replace 'as any' with @ts-expect-error for type suppression on lines 98 and 98 (for chess.get and chess.moves).

2. **Create new AuthContext.ts file**
   - Move AuthContext and AuthContextType definitions from AuthContext.tsx to src/context/AuthContext.ts.

3. **Update AuthContext.tsx**
   - Remove AuthContext and AuthContextType exports.
   - Import AuthContext and AuthContextType from the new AuthContext.ts file.
   - Keep only the AuthProvider export.

4. **Update useAuth.ts**
   - Change import from '../context/AuthContext' to '../context/AuthContext.ts' for AuthContext and AuthContextType.

5. **Verify fixes**
   - Run `npm run lint` to ensure no errors remain.
