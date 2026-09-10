import { router } from 'expo-router';
import { Camera } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

export function ProofFab() {
  return (
    <View
      pointerEvents="box-none"
      className="absolute bottom-[64px] left-0 right-0 items-center">
      <View
        pointerEvents="none"
        className="absolute bottom-0 h-14 w-44 rounded-full bg-mint/20"
        style={{
          shadowColor: tokens.mint,
          shadowOpacity: 0.4,
          shadowRadius: 18,
          elevation: 12,
        }}
      />
      <Pressable
        onPress={() => router.push('/log-proof')}
        accessibilityRole="button"
        accessibilityLabel="Log proof of action"
        className="flex-row items-center justify-center gap-2 rounded-full border border-mint bg-mint px-6 py-3.5 active:scale-95 active:opacity-90">
        <Camera size={18} color={tokens.void} strokeWidth={2.7} />
        <Text className="text-sm font-black tracking-[0.3px] text-void">Log Proof</Text>
      </Pressable>
    </View>
  );
}
