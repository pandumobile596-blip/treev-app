import type { Streak } from '@/types/domain';

/** Local calendar day key YYYY-MM-DD */
export function localDayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function daysBetween(a: string, b: string): number {
  const aDate = new Date(`${a}T00:00:00`);
  const bDate = new Date(`${b}T00:00:00`);
  const ms = bDate.getTime() - aDate.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

/**
 * Same local day → no double increment.
 * Consecutive day → +1.
 * Miss ≥ 1 day → reset to 1.
 */
export function applyProofToStreak(streak: Streak, today = localDayKey()): Streak {
  if (streak.lastProofDate === today) {
    return streak;
  }

  let currentDays = 1;
  if (streak.lastProofDate) {
    const gap = daysBetween(streak.lastProofDate, today);
    if (gap === 1) {
      currentDays = streak.currentDays + 1;
    } else if (gap === 0) {
      return streak;
    }
  }

  return {
    ...streak,
    currentDays,
    longestDays: Math.max(streak.longestDays, currentDays),
    lastProofDate: today,
  };
}
