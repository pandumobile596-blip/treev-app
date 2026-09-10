import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { meta } from '@/db/schema';
import { upsertNodes } from '@/db/repositories/node-repo';
import { upsertStreak } from '@/db/repositories/streak-repo';
import { upsertUser } from '@/db/repositories/user-repo';
import { MOCK_NODES } from '@/features/tree/mock-nodes';
import { titleForLevel } from '@/constants/ranks';

const SEED_KEY = 'seeded';

export async function seedIfNeeded(): Promise<void> {
  const existing = await db.select().from(meta).where(eq(meta.key, SEED_KEY));
  if (existing.length > 0) return;

  const level = 14;
  await upsertUser({
    id: 'user-local',
    displayName: 'Treev Pilot',
    level,
    title: titleForLevel(level),
    xp: (level - 1) * 100 + 40,
    avatarUri: null,
  });

  await upsertNodes(MOCK_NODES);

  await upsertStreak({
    id: 'streak-local',
    currentDays: 18,
    longestDays: 18,
    lastProofDate: null,
  });

  await db.insert(meta).values({ key: SEED_KEY, value: '1' });
}
