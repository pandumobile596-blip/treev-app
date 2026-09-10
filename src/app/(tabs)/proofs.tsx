import { useFocusEffect } from 'expo-router';
import { CheckCircle2, Clock3 } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { SocialHeader } from '@/components/header/SocialHeader';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { listProofs } from '@/db/repositories/proof-repo';
import { useStreakStore, useTreeStore, useUserStore } from '@/store';
import { tokens } from '@/theme/tokens';
import type { Proof } from '@/types/domain';

export default function ProofsScreen() {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const profile = useUserStore((state) => state.profile);
  const streak = useStreakStore((state) => state.streak);
  const nodes = useTreeStore((state) => state.nodes);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      listProofs().then((items) => {
        if (active) setProofs(items);
      });
      return () => {
        active = false;
      };
    }, []),
  );

  return (
    <Screen>
      <SocialHeader
        displayName={profile?.displayName ?? 'Pilot'}
        level={profile?.level ?? 1}
        title={profile?.title ?? 'SEEDLING'}
        streakDays={streak?.currentDays ?? 0}
      />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 130 }}>
        <Text className="text-2xl font-black tracking-[-0.5px] text-ink">Your proofs</Text>
        <Text className="mb-5 mt-1 text-sm text-muted">
          A private ledger of actions you actually completed.
        </Text>

        {proofs.length === 0 ? (
          <Card className="items-center px-7 py-10">
            <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-mint/10">
              <CheckCircle2 size={27} color={tokens.mint} />
            </View>
            <Text className="text-base font-black text-ink">Your ledger is ready</Text>
            <Text className="mt-2 text-center text-sm leading-5 text-muted">
              Log your first proof and it will appear here with its action and timestamp.
            </Text>
          </Card>
        ) : (
          <View className="gap-3">
            {proofs.map((proof) => {
              const node = nodes.find((item) => item.id === proof.nodeId);
              return (
                <Card key={proof.id}>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <CheckCircle2 size={17} color={tokens.mint} />
                      <Text className="text-xs font-black tracking-[0.6px] text-mint">
                        {(node?.title ?? 'ACTION').toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Clock3 size={12} color={tokens.muted} />
                      <Text className="text-[10px] text-muted">
                        {new Date(proof.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <Text className="mt-3 text-[15px] leading-6 text-ink">{proof.note}</Text>
                  <View className="mt-4 self-start rounded-full bg-gold/10 px-2.5 py-1">
                    <Text className="text-[10px] font-black text-gold">
                      +{node?.xpReward ?? 0} XP EARNED
                    </Text>
                  </View>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
