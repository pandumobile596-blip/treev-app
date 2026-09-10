import '@/global.css';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/db/client';
import { seedIfNeeded } from '@/db/seed';
import { hydrateStoresFromDb } from '@/features/proof/proof-service';
import { tokens } from '@/theme/tokens';
import migrations from '../../drizzle/migrations';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  const [ready, setReady] = useState(false);
  const [bootError, setBootError] = useState<string | null>(null);

  useEffect(() => {
    if (!success) return;

    let cancelled = false;
    (async () => {
      try {
        await seedIfNeeded();
        await hydrateStoresFromDb();
        if (!cancelled) setReady(true);
      } catch (err) {
        if (!cancelled) {
          setBootError(err instanceof Error ? err.message : 'Failed to boot database');
        }
      } finally {
        await SplashScreen.hideAsync();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [success]);

  if (error || bootError) {
    return (
      <View className="flex-1 items-center justify-center bg-void px-6">
        <Text className="mb-2 text-base font-bold text-ink">Boot error</Text>
        <Text className="text-center text-sm text-muted">
          {error?.message ?? bootError}
        </Text>
      </View>
    );
  }

  if (!success || !ready) {
    return (
      <View className="flex-1 items-center justify-center bg-void">
        <ActivityIndicator color={tokens.mint} size="large" />
        <Text className="mt-3 text-xs font-bold tracking-badge text-muted">
          GROWING TREEV…
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: tokens.void }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: tokens.void },
          headerTintColor: tokens.ink,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: tokens.void },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="log-proof"
          options={{
            presentation: 'modal',
            title: 'Log Proof',
            headerStyle: { backgroundColor: tokens.charcoal },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
