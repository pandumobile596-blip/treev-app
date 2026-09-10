# Treev

Life-gamification and proof-of-action social platform. Built with Expo SDK 57 + TypeScript for full **Expo Go** compatibility.

## Stack

- Expo Router (file-based, `src/app`)
- NativeWind v4 + Tailwind 3.4 (Treev dark tactile tokens)
- Zustand
- expo-sqlite + Drizzle ORM (offline-first)
- Lucide React Native + Reanimated

## Run

```powershell
cd treev
npm install
npx expo start
```

Scan with Expo Go (SDK 57). Use `npx expo start --clear` if styles fail to load after config changes.

## Scripts

| Command | Purpose |
|---|---|
| `npm start` | Expo dev server |
| `npm run db:generate` | Generate Drizzle migrations |

## Phase status

- **Phase 0** — Tree shell UI (header, skill tree states, FAB, tabs)
- **Phase 1** — Local SQLite persistence, proof logging, XP / streak logic
- **Phase 2** — Supabase sync & social feed (not implemented yet)
