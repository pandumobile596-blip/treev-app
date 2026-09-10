import { Flame } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

type StreakCounterProps = {
  days: number;
};

export function StreakCounter({ days }: StreakCounterProps) {
  return (
    <View className="flex-row items-center gap-1.5 rounded-full border border-border bg-charcoal px-3 py-1.5">
      <Flame size={14} color={tokens.gold} fill={tokens.gold} />
      <Text className="text-xs font-bold tracking-badge text-gold">{days} Days</Text>
    </View>
  );
}
