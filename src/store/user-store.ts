import { create } from 'zustand';

import type { UserProfile } from '@/types/domain';
import { levelFromXp, titleForLevel } from '@/constants/ranks';

interface UserState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  awardXp: (amount: number) => UserProfile | null;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  awardXp: (amount) => {
    const current = get().profile;
    if (!current) return null;
    const xp = current.xp + amount;
    const level = levelFromXp(xp);
    const next: UserProfile = {
      ...current,
      xp,
      level,
      title: titleForLevel(level),
    };
    set({ profile: next });
    return next;
  },
}));
