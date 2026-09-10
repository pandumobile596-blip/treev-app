import { View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { LevelBadge } from '@/components/ui/LevelBadge';
import { StreakCounter } from '@/components/ui/StreakCounter';

type TreeHeaderProps = {
  displayName: string;
  level: number;
  title: string;
  streakDays: number;
};

export function TreeHeader({
  displayName,
  level,
  title,
  streakDays,
}: TreeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
      <View className="flex-row items-center gap-3">
        <Avatar name={displayName} />
        <LevelBadge level={level} title={title} />
      </View>
      <StreakCounter days={streakDays} />
    </View>
  );
}
