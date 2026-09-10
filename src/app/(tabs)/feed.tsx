import { ScrollView } from 'react-native';

import { ActionFeed } from '@/components/feed/ActionFeed';
import { SocialHeader } from '@/components/header/SocialHeader';
import { Screen } from '@/components/ui/Screen';
import { useStreakStore, useUserStore } from '@/store';

export default function FeedScreen() {
  const profile = useUserStore((state) => state.profile);
  const streak = useStreakStore((state) => state.streak);

  return (
    <Screen>
      <SocialHeader
        displayName={profile?.displayName ?? 'Pilot'}
        level={profile?.level ?? 1}
        title={profile?.title ?? 'SEEDLING'}
        streakDays={streak?.currentDays ?? 0}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActionFeed />
      </ScrollView>
    </Screen>
  );
}
