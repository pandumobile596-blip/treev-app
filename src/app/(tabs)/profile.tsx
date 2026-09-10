import { Award, ChevronRight, Flame, Settings } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { useStreakStore, useUserStore } from '@/store';
import { tokens } from '@/theme/tokens';

export default function ProfileScreen() {
  const profile = useUserStore((s) => s.profile);
  const streak = useStreakStore((s) => s.streak);

  if (!profile) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted">No profile loaded</Text>
        </View>
      </Screen>
    );
  }

  const levelProgress = profile.xp % 100;

  return (
    <Screen>
      <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
        <Text className="text-xl font-black tracking-[-0.4px] text-ink">Profile</Text>
        <Pressable className="rounded-full p-2 active:bg-border">
          <Settings size={20} color={tokens.muted} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 130 }}>
        <Card className="items-center py-7">
          <Avatar name={profile.displayName} size={78} />
          <Text className="mt-3 text-xl font-black text-ink">{profile.displayName}</Text>
          <Text className="mt-1 text-sm text-muted">@treev_pilot</Text>
          <View className="mt-4 flex-row gap-2">
            <View className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1.5">
              <Text className="text-xs font-black text-mint">
                LVL {profile.level} · {profile.title}
              </Text>
            </View>
            <View className="flex-row items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5">
              <Flame size={13} color={tokens.gold} fill={tokens.gold} />
              <Text className="text-xs font-black text-gold">
                {streak?.currentDays ?? 0} DAYS
              </Text>
            </View>
          </View>
        </Card>

        <View className="mt-3 flex-row gap-3">
          <Card className="flex-1">
            <Text className="text-[10px] font-black tracking-[1px] text-muted">TOTAL XP</Text>
            <Text className="mt-1 text-2xl font-black text-gold">{profile.xp}</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-[10px] font-black tracking-[1px] text-muted">
              BEST STREAK
            </Text>
            <Text className="mt-1 text-2xl font-black text-ink">
              {streak?.longestDays ?? 0}
              <Text className="text-sm text-muted"> days</Text>
            </Text>
          </Card>
        </View>

        <Card className="mt-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Award size={18} color={tokens.mint} />
              <Text className="font-black text-ink">Next level</Text>
            </View>
            <Text className="text-xs font-bold text-muted">{levelProgress}/100 XP</Text>
          </View>
          <View className="mt-4 h-2 overflow-hidden rounded-full bg-border">
            <View className="h-full rounded-full bg-mint" style={{ width: `${levelProgress}%` }} />
          </View>
        </Card>

        <Card className="mt-3 p-0">
          {['Achievements', 'Activity settings', 'Privacy & safety'].map((label, index) => (
            <Pressable
              key={label}
              className={`flex-row items-center justify-between px-4 py-4 active:bg-border ${
                index < 2 ? 'border-b border-border' : ''
              }`}>
              <Text className="text-sm font-bold text-ink">{label}</Text>
              <ChevronRight size={17} color={tokens.muted} />
            </Pressable>
          ))}
        </Card>
      </ScrollView>
    </Screen>
  );
}
