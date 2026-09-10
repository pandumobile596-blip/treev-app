import { View } from 'react-native';

import { SkillNodeCard } from '@/components/skill-tree/SkillNode';
import type { SkillNode } from '@/types/domain';

type SkillTreeCanvasProps = {
  nodes: SkillNode[];
};

export function SkillTreeCanvas({ nodes }: SkillTreeCanvasProps) {
  const sorted = [...nodes].sort((a, b) => a.order - b.order);

  return (
    <View className="px-4 pt-4">
      {sorted.map((node, index) => (
        <SkillNodeCard
          key={node.id}
          node={node}
          isLast={index === sorted.length - 1}
        />
      ))}
    </View>
  );
}
