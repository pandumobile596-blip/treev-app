import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { users } from '@/db/schema';
import type { UserProfile } from '@/types/domain';

export async function getUser(): Promise<UserProfile | null> {
  const rows = await db.select().from(users).limit(1);
  const row = rows[0];
  if (!row) return null;
  return {
    id: row.id,
    displayName: row.displayName,
    level: row.level,
    title: row.title,
    xp: row.xp,
    avatarUri: row.avatarUri,
  };
}

export async function upsertUser(profile: UserProfile): Promise<void> {
  await db
    .insert(users)
    .values({
      id: profile.id,
      displayName: profile.displayName,
      level: profile.level,
      title: profile.title,
      xp: profile.xp,
      avatarUri: profile.avatarUri ?? null,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        displayName: profile.displayName,
        level: profile.level,
        title: profile.title,
        xp: profile.xp,
        avatarUri: profile.avatarUri ?? null,
      },
    });
}

export async function updateUser(profile: UserProfile): Promise<void> {
  await db
    .update(users)
    .set({
      displayName: profile.displayName,
      level: profile.level,
      title: profile.title,
      xp: profile.xp,
      avatarUri: profile.avatarUri ?? null,
    })
    .where(eq(users.id, profile.id));
}
