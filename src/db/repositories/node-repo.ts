import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { skillNodes } from '@/db/schema';
import type { SkillNode, SkillNodeState } from '@/types/domain';

function mapNode(row: typeof skillNodes.$inferSelect): SkillNode {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    order: row.order,
    state: row.state as SkillNodeState,
    xpReward: row.xpReward,
  };
}

export async function getAllNodes(): Promise<SkillNode[]> {
  const rows = await db.select().from(skillNodes);
  return rows.map(mapNode).sort((a, b) => a.order - b.order);
}

export async function upsertNodes(nodes: SkillNode[]): Promise<void> {
  for (const node of nodes) {
    await db
      .insert(skillNodes)
      .values({
        id: node.id,
        title: node.title,
        description: node.description,
        order: node.order,
        state: node.state,
        xpReward: node.xpReward,
      })
      .onConflictDoUpdate({
        target: skillNodes.id,
        set: {
          title: node.title,
          description: node.description,
          order: node.order,
          state: node.state,
          xpReward: node.xpReward,
        },
      });
  }
}

export async function updateNodeState(
  id: string,
  state: SkillNodeState,
): Promise<void> {
  await db.update(skillNodes).set({ state }).where(eq(skillNodes.id, id));
}

export async function replaceAllNodeStates(nodes: SkillNode[]): Promise<void> {
  for (const node of nodes) {
    await db
      .update(skillNodes)
      .set({ state: node.state })
      .where(eq(skillNodes.id, node.id));
  }
}
