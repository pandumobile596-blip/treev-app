import { create } from 'zustand';

import type { SkillNode, SkillNodeState } from '@/types/domain';

interface TreeState {
  nodes: SkillNode[];
  setNodes: (nodes: SkillNode[]) => void;
  setNodeState: (id: string, state: SkillNodeState) => void;
  completeActiveNode: () => SkillNode | null;
  getActiveNode: () => SkillNode | null;
}

export const useTreeStore = create<TreeState>((set, get) => ({
  nodes: [],
  setNodes: (nodes) => set({ nodes }),
  setNodeState: (id, state) =>
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, state } : node,
      ),
    }),
  getActiveNode: () => get().nodes.find((n) => n.state === 'active') ?? null,
  completeActiveNode: () => {
    const nodes = [...get().nodes].sort((a, b) => a.order - b.order);
    const activeIndex = nodes.findIndex((n) => n.state === 'active');
    if (activeIndex < 0) return null;

    const completed = { ...nodes[activeIndex], state: 'completed' as const };
    nodes[activeIndex] = completed;

    const nextIndex = activeIndex + 1;
    if (nextIndex < nodes.length && nodes[nextIndex].state === 'locked') {
      nodes[nextIndex] = { ...nodes[nextIndex], state: 'active' };
    }

    set({ nodes });
    return completed;
  },
}));
