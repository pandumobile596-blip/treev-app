import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  displayName: text('display_name').notNull(),
  level: integer('level').notNull(),
  title: text('title').notNull(),
  xp: integer('xp').notNull(),
  avatarUri: text('avatar_uri'),
});

export const skillNodes = sqliteTable('skill_nodes', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  order: integer('order').notNull(),
  state: text('state').notNull(),
  xpReward: integer('xp_reward').notNull(),
});

export const proofs = sqliteTable('proofs', {
  id: text('id').primaryKey(),
  nodeId: text('node_id')
    .notNull()
    .references(() => skillNodes.id),
  note: text('note').notNull(),
  createdAt: text('created_at').notNull(),
});

export const streaks = sqliteTable('streaks', {
  id: text('id').primaryKey(),
  currentDays: integer('current_days').notNull(),
  longestDays: integer('longest_days').notNull(),
  lastProofDate: text('last_proof_date'),
});

export const meta = sqliteTable('meta', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});
