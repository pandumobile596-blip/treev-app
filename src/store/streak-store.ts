import { create } from 'zustand';

import type { Streak } from '@/types/domain';
import { applyProofToStreak } from '@/features/streak/streak-rules';

interface StreakState {
  streak: Streak | null;
  setStreak: (streak: Streak) => void;
  recordProofToday: () => Streak | null;
}

export const useStreakStore = create<StreakState>((set, get) => ({
  streak: null,
  setStreak: (streak) => set({ streak }),
  recordProofToday: () => {
    const current = get().streak;
    if (!current) return null;
    const next = applyProofToStreak(current);
    set({ streak: next });
    return next;
  },
}));
