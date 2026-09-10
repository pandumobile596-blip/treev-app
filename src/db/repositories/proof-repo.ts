import { desc } from 'drizzle-orm';

import { db } from '@/db/client';
import { proofs } from '@/db/schema';
import type { Proof } from '@/types/domain';

export async function insertProof(proof: Proof): Promise<void> {
  await db.insert(proofs).values({
    id: proof.id,
    nodeId: proof.nodeId,
    note: proof.note,
    createdAt: proof.createdAt,
  });
}

export async function listProofs(): Promise<Proof[]> {
  const rows = await db.select().from(proofs).orderBy(desc(proofs.createdAt));
  return rows.map((row) => ({
    id: row.id,
    nodeId: row.nodeId,
    note: row.note,
    createdAt: row.createdAt,
  }));
}
