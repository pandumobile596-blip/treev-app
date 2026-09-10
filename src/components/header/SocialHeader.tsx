import { Flame, Leaf } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { tokens } from '@/theme/tokens';

type SocialHeaderProps = {
  displayName: string;
  level: number;
  title: string;
  streakDays: number;
};

export function SocialHeader({
  displayName,
  level,
  title,
  streakDays,
}: SocialHeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-border bg-void px-4 py-3">
      <View className="flex-row items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-xl border border-mint/30 bg-mint/10">
          <Leaf size={19} color={tokens.mint} strokeWidth={2.5} />
        </View>
        <View>
          <Text className="text-xl font-black tracking-[-0.6px] text-ink">treev</Text>
          <Text className="text-[9px] font-bold tracking-[1.7px] text-muted">
            PROOF OVER PROMISE
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        <View className="rounded-full border border-border bg-charcoal px-2.5 py-1.5">
          <Text className="text-[10px] font-extrabold tracking-[0.8px] text-ink">
            LVL {level} · {title}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${streakDays} day streak`}
          className="flex-row items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1.5 active:scale-95 active:opacity-80">
          <Flame size={14} color={tokens.gold} fill={tokens.gold} />
          <Text className="text-xs font-black text-gold">{streakDays}</Text>
        </Pressable>
        <Avatar name={displayName} size={34} />
      </View>
    </View>
  );
}
