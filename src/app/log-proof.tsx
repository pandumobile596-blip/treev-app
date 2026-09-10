import { router } from 'expo-router';
import { Camera, CheckCircle2, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { submitProofOfAction } from '@/features/proof/proof-service';
import { useTreeStore } from '@/store';
import { tokens } from '@/theme/tokens';

export default function LogProofScreen() {
  const active = useTreeStore(
    (s) => s.nodes.find((node) => node.state === 'active') ?? null,
  );
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const onSubmit = async () => {
    setBusy(true);
    setFeedback(null);
    try {
      const result = await submitProofOfAction(note);
      setFeedback(result.message);
      if (result.ok) {
        setNote('');
        setTimeout(() => router.back(), 650);
      }
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Failed to save proof');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 px-4 pt-5">
        <View className="rounded-2xl border border-border bg-charcoal p-4">
          <View className="flex-row items-center gap-2">
            <ShieldCheck size={16} color={tokens.mint} />
            <Text className="text-[10px] font-black tracking-[1.2px] text-mint">
              ACTIVE ACTION
            </Text>
          </View>
          <View className="mt-3 flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-xl font-black text-ink">
                {active?.title ?? 'No active node'}
              </Text>
              <Text className="mt-1 text-sm leading-5 text-muted">
                {active?.description ??
                  'Complete earlier nodes to unlock the next proof target.'}
              </Text>
            </View>
            <View className="rounded-full bg-gold/10 px-2.5 py-1">
              <Text className="text-xs font-black text-gold">+{active?.xpReward ?? 0} XP</Text>
            </View>
          </View>
        </View>

        <Text className="mb-2 mt-5 text-xs font-black tracking-[1px] text-muted">
          SHOW THE WORK
        </Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="What did you actually do?"
          placeholderTextColor={tokens.muted}
          multiline
          textAlignVertical="top"
          className="min-h-[120px] rounded-2xl border border-border bg-charcoal p-4 text-base leading-6 text-ink"
          editable={Boolean(active) && !busy}
        />

        <View className="mt-3 flex-row items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-charcoal py-5">
          <Camera size={20} color={tokens.muted} />
          <View>
            <Text className="text-sm font-black text-ink">Add photo or video</Text>
            <Text className="text-xs text-muted">Media capture arrives in Phase 2</Text>
          </View>
        </View>

        {feedback ? (
          <View className="mt-3 flex-row items-center gap-2">
            <CheckCircle2 size={16} color={tokens.mint} />
            <Text className="flex-1 text-sm text-mint">{feedback}</Text>
          </View>
        ) : null}

        <View className="mt-6 gap-3">
          <Button
            label={busy ? 'SAVING…' : 'SUBMIT PROOF'}
            onPress={onSubmit}
            disabled={!active || busy || !note.trim()}
          />
          <Button label="CANCEL" variant="ghost" onPress={() => router.back()} />
        </View>

        {busy ? (
          <View className="mt-4 items-center">
            <ActivityIndicator color={tokens.mint} />
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </Screen>
  );
}
