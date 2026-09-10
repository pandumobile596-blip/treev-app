import { router } from 'expo-router';
import { Check, ChevronRight, Lock, Zap } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { mintGlowPulse } from '@/theme/animations';
import { tokens } from '@/theme/tokens';
import type { SkillNode } from '@/types/domain';

type SkillNodeProps = {
  node: SkillNode;
  isLast?: boolean;
};

export function SkillNodeCard({ node, isLast }: SkillNodeProps) {
  const glow = useSharedValue(0.5);

  useEffect(() => {
    if (node.state === 'active') {
      glow.value = mintGlowPulse();
    } else {
      glow.value = 0;
    }
  }, [glow, node.state]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: node.state === 'active' ? glow.value : 0,
  }));

  const isLocked = node.state === 'locked';
  const isCompleted = node.state === 'completed';
  const isActive = node.state === 'active';

  return (
    <View className="flex-row" style={{ opacity: isLocked ? 0.55 : 1 }}>
      <View className="mr-4 w-10 items-center">
        <View className="relative">
          {isActive ? (
            <Animated.View
              pointerEvents="none"
              style={[
                {
                  position: 'absolute',
                  top: -8,
                  left: -8,
                  right: -8,
                  bottom: -8,
                  borderRadius: 999,
                  backgroundColor: tokens.mint,
                },
                glowStyle,
              ]}
            />
          ) : null}
          <View
            className={`z-10 h-10 w-10 items-center justify-center rounded-full border ${
              isCompleted
                ? 'border-mint bg-mint'
                : isActive
                  ? 'border-mint bg-charcoal'
                  : 'border-border bg-charcoal'
            }`}>
            {isCompleted ? (
              <Check size={18} color={tokens.void} strokeWidth={3} />
            ) : isActive ? (
              <Zap size={18} color={tokens.mint} />
            ) : (
              <Lock size={16} color={tokens.locked} />
            )}
          </View>
        </View>
        {!isLast ? (
          <View
            className="mt-1 w-0.5 flex-1"
            style={{
              minHeight: 28,
              backgroundColor: isCompleted ? tokens.mint : tokens.border,
            }}
          />
        ) : null}
      </View>

      <Pressable
        disabled={!isActive}
        onPress={() => router.push('/log-proof')}
        className={`mb-4 flex-1 rounded-2xl border bg-charcoal p-4 ${
          isActive ? 'border-mint' : 'border-border'
        } ${isActive ? 'active:scale-[0.98] active:opacity-90' : ''}`}>
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="flex-1 text-base font-black text-ink">{node.title}</Text>
          <Text className="text-xs font-bold tracking-badge text-gold">
            +{node.xpReward} XP
          </Text>
        </View>
        <Text className="text-sm leading-5 text-muted">{node.description}</Text>
        <View className="mt-3 flex-row items-center justify-between">
          <View
            className={`self-start rounded-full px-2.5 py-1 ${
              isCompleted ? 'bg-mint/10' : isActive ? 'bg-mint/10' : 'bg-border'
            }`}>
            <Text
              className={`text-[9px] font-black tracking-[1px] ${
                isCompleted || isActive ? 'text-mint' : 'text-muted'
              }`}>
              {node.state.toUpperCase()}
            </Text>
          </View>
          {isActive ? (
            <View className="flex-row items-center gap-1">
              <Text className="text-xs font-black text-mint">Log action</Text>
              <ChevronRight size={15} color={tokens.mint} />
            </View>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}
