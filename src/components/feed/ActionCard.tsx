import { Flame, Heart, MessageCircle, MoreHorizontal, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import type { ActionPost } from '@/features/feed/mock-actions';
import { tokens } from '@/theme/tokens';

export function ActionCard({ post }: { post: ActionPost }) {
  const [respected, setRespected] = useState(false);

  return (
    <View className="overflow-hidden rounded-2xl border border-border bg-charcoal">
      <View className="flex-row items-center px-4 py-3">
        <Avatar name={post.initials} size={38} />
        <View className="ml-3 flex-1">
          <Text className="text-sm font-extrabold text-ink">{post.user}</Text>
          <Text className="text-xs text-muted">
            {post.handle} · {post.time}
          </Text>
        </View>
        <View className="mr-2 flex-row items-center gap-1 rounded-full bg-gold/10 px-2 py-1">
          <Flame size={11} color={tokens.gold} fill={tokens.gold} />
          <Text className="text-[10px] font-black text-gold">{post.streak}</Text>
        </View>
        <MoreHorizontal size={19} color={tokens.muted} />
      </View>

      <View className="mx-3 rounded-xl border border-border bg-void p-4">
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <ShieldCheck size={16} color={tokens.mint} />
            <Text className="text-xs font-black tracking-[0.7px] text-mint">
              {post.action.toUpperCase()}
            </Text>
          </View>
          <Text className="text-xs font-black text-gold">+{post.xp} XP</Text>
        </View>
        <Text className="text-[15px] leading-6 text-ink">{post.note}</Text>
        <View className="mt-4 h-24 items-center justify-center rounded-lg border border-dashed border-border bg-charcoal">
          <Text className="text-[10px] font-bold tracking-[1.5px] text-muted">
            VERIFIED ACTION MEDIA
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-1 px-3 py-2">
        <Pressable
          onPress={() => setRespected((value) => !value)}
          className="flex-row items-center gap-2 rounded-xl px-3 py-2.5 active:scale-95 active:bg-border">
          <Heart
            size={19}
            color={respected ? tokens.mint : tokens.muted}
            fill={respected ? tokens.mint : 'transparent'}
          />
          <Text className={`text-xs font-bold ${respected ? 'text-mint' : 'text-muted'}`}>
            Respect · {post.respects + (respected ? 1 : 0)}
          </Text>
        </Pressable>
        <Pressable className="flex-row items-center gap-2 rounded-xl px-3 py-2.5 active:scale-95 active:bg-border">
          <MessageCircle size={19} color={tokens.muted} />
          <Text className="text-xs font-bold text-muted">Comments · {post.comments}</Text>
        </Pressable>
      </View>
    </View>
  );
}
