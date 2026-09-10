import { Pressable, Text, View } from 'react-native';

export type HomeView = 'tree' | 'feed';

type SegmentedControlProps = {
  value: HomeView;
  onChange: (value: HomeView) => void;
};

export function SegmentedControl({ value, onChange }: SegmentedControlProps) {
  return (
    <View className="mx-4 mt-4 flex-row rounded-xl border border-border bg-charcoal p-1">
      <Pressable
        onPress={() => onChange('tree')}
        className={`flex-1 items-center rounded-lg py-2.5 active:opacity-75 ${
          value === 'tree' ? 'bg-ink' : 'bg-transparent'
        }`}>
        <Text
          className={`text-xs font-extrabold tracking-[0.4px] ${
            value === 'tree' ? 'text-void' : 'text-muted'
          }`}>
          My Skill Tree
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('feed')}
        className={`flex-1 items-center rounded-lg py-2.5 active:opacity-75 ${
          value === 'feed' ? 'bg-ink' : 'bg-transparent'
        }`}>
        <Text
          className={`text-xs font-extrabold tracking-[0.4px] ${
            value === 'feed' ? 'text-void' : 'text-muted'
          }`}>
          Global Feed
        </Text>
      </Pressable>
    </View>
  );
}
