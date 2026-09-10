import { Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

import type { SkillNode } from '@/types/domain';

export function TreeProgress({ nodes }: { nodes: SkillNode[] }) {
  const completed = nodes.filter((node) => node.state === 'completed').length;
  const percentage = nodes.length ? Math.round((completed / nodes.length) * 100) : 0;

  return (
    <View className="mx-4 mt-4 rounded-2xl border border-border bg-charcoal p-4">
      <View className="flex-row items-end justify-between">
        <View>
          <Text className="text-[10px] font-black tracking-[1.4px] text-muted">
            CURRENT PATH
          </Text>
          <Text className="mt-1 text-lg font-black text-ink">Foundation Protocol</Text>
        </View>
        <Text className="text-2xl font-black text-mint">{percentage}%</Text>
      </View>
      <View className="mt-4 h-2 overflow-hidden rounded-full bg-border">
        <Animated.View
          entering={FadeInRight.duration(600)}
          className="h-full rounded-full bg-mint"
          style={{ width: `${percentage}%` }}
        />
      </View>
      <Text className="mt-2 text-xs text-muted">
        {completed} of {nodes.length} actions verified
      </Text>
    </View>
  );
}
