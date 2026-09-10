import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { ActionFeed } from '@/components/feed/ActionFeed';
import { SocialHeader } from '@/components/header/SocialHeader';
import { SkillTreeCanvas } from '@/components/skill-tree/SkillTreeCanvas';
import { TreeProgress } from '@/components/skill-tree/TreeProgress';
import { Screen } from '@/components/ui/Screen';
import { type HomeView, SegmentedControl } from '@/components/ui/SegmentedControl';
import { useStreakStore, useTreeStore, useUserStore } from '@/store';

export default function TreeScreen() {
  const [view, setView] = useState<HomeView>('tree');
  const profile = useUserStore((s) => s.profile);
  const streak = useStreakStore((s) => s.streak);
  const nodes = useTreeStore((s) => s.nodes);

  return (
    <Screen edges={['top']}>
      <SocialHeader
        displayName={profile?.displayName ?? 'Pilot'}
        level={profile?.level ?? 1}
        title={profile?.title ?? 'SEEDLING'}
        streakDays={streak?.currentDays ?? 0}
      />
      <View className="flex-1">
        <SegmentedControl value={view} onChange={setView} />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 130 }}
          showsVerticalScrollIndicator={false}>
          {view === 'tree' ? (
            <>
              <TreeProgress nodes={nodes} />
              <SkillTreeCanvas nodes={nodes} />
            </>
          ) : (
            <ActionFeed />
          )}
        </ScrollView>
      </View>
    </Screen>
  );
}
