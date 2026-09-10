export type SkillNodeState = 'locked' | 'active' | 'completed';

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  order: number;
  state: SkillNodeState;
  xpReward: number;
}

export interface UserProfile {
  id: string;
  displayName: string;
  level: number;
  title: string;
  xp: number;
  avatarUri?: string | null;
}

export interface Streak {
  id: string;
  currentDays: number;
  longestDays: number;
  lastProofDate: string | null;
}

export interface Proof {
  id: string;
  nodeId: string;
  note: string;
  createdAt: string;
}
