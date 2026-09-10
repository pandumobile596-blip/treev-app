import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { streaks } from '@/db/schema';
import type { Streak } from '@/types/domain';

export async function getStreak(): Promise<Streak | null> {
  const rows = await db.select().from(streaks).limit(1);
  const row = rows[0];
  if (!row) return null;
  return {
    id: row.id,
    currentDays: row.currentDays,
    longestDays: row.longestDays,
    lastProofDate: row.lastProofDate,
  };
}

export async function upsertStreak(streak: Streak): Promise<void> {
  await db
    .insert(streaks)
    .values({
      id: streak.id,
      currentDays: streak.currentDays,
      longestDays: streak.longestDays,
      lastProofDate: streak.lastProofDate,
    })
    .onConflictDoUpdate({
      target: streaks.id,
      set: {
        currentDays: streak.currentDays,
        longestDays: streak.longestDays,
        lastProofDate: streak.lastProofDate,
      },
    });
}

export async function updateStreak(streak: Streak): Promise<void> {
  await db
    .update(streaks)
    .set({
      currentDays: streak.currentDays,
      longestDays: streak.longestDays,
      lastProofDate: streak.lastProofDate,
    })
    .where(eq(streaks.id, streak.id));
}
