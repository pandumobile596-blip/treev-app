import { Text, View } from 'react-native';

import { ActionCard } from '@/components/feed/ActionCard';
import { MOCK_ACTIONS } from '@/features/feed/mock-actions';

export function ActionFeed() {
  return (
    <View className="gap-4 px-4 pb-32 pt-4">
      <View className="flex-row items-end justify-between">
        <View>
          <Text className="text-xl font-black tracking-[-0.4px] text-ink">Actions, not claims.</Text>
          <Text className="mt-1 text-sm text-muted">Fresh proof from people you follow.</Text>
        </View>
        <View className="h-2 w-2 rounded-full bg-mint" />
      </View>
      {MOCK_ACTIONS.map((post) => (
        <ActionCard key={post.id} post={post} />
      ))}
    </View>
  );
}
