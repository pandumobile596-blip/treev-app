import { getAllNodes, replaceAllNodeStates } from '@/db/repositories/node-repo';
import { insertProof } from '@/db/repositories/proof-repo';
import { getStreak, updateStreak } from '@/db/repositories/streak-repo';
import { getUser, updateUser } from '@/db/repositories/user-repo';
import { applyProofToStreak } from '@/features/streak/streak-rules';
import { useStreakStore, useTreeStore, useUserStore } from '@/store';
import { levelFromXp, titleForLevel } from '@/constants/ranks';

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function hydrateStoresFromDb(): Promise<void> {
  const [user, nodes, streak] = await Promise.all([
    getUser(),
    getAllNodes(),
    getStreak(),
  ]);

  if (user) useUserStore.getState().setProfile(user);
  if (nodes.length) useTreeStore.getState().setNodes(nodes);
  if (streak) useStreakStore.getState().setStreak(streak);
}

export async function submitProofOfAction(note: string): Promise<{
  ok: boolean;
  message: string;
}> {
  const active = useTreeStore.getState().getActiveNode();
  if (!active) {
    return { ok: false, message: 'No active skill node to prove.' };
  }

  const trimmed = note.trim();
  if (!trimmed) {
    return { ok: false, message: 'Write a short proof note first.' };
  }

  const completed = useTreeStore.getState().completeActiveNode();
  if (!completed) {
    return { ok: false, message: 'Could not complete the active node.' };
  }

  const updatedNodes = useTreeStore.getState().nodes;
  await replaceAllNodeStates(updatedNodes);

  const proof = {
    id: createId('proof'),
    nodeId: completed.id,
    note: trimmed,
    createdAt: new Date().toISOString(),
  };
  await insertProof(proof);

  const profile = useUserStore.getState().profile;
  if (profile) {
    const xp = profile.xp + completed.xpReward;
    const level = levelFromXp(xp);
    const nextProfile = {
      ...profile,
      xp,
      level,
      title: titleForLevel(level),
    };
    useUserStore.getState().setProfile(nextProfile);
    await updateUser(nextProfile);
  }

  const streak = (await getStreak()) ?? useStreakStore.getState().streak;
  if (streak) {
    const nextStreak = applyProofToStreak(streak);
    useStreakStore.getState().setStreak(nextStreak);
    await updateStreak(nextStreak);
  }

  return {
    ok: true,
    message: `Logged proof for ${completed.title} (+${completed.xpReward} XP)`,
  };
}
