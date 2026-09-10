import { Text, View } from 'react-native';

type LevelBadgeProps = {
  level: number;
  title: string;
};

export function LevelBadge({ level, title }: LevelBadgeProps) {
  return (
    <View className="rounded-full border border-border bg-charcoal px-3 py-1.5">
      <Text className="text-xs font-bold tracking-badge text-ink">
        LVL {level} {title}
      </Text>
    </View>
  );
}
