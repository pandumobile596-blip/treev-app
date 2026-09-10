import { Tabs } from 'expo-router';
import { FileCheck2, Home, TreePine, User } from 'lucide-react-native';
import { View } from 'react-native';

import { ProofFab } from '@/components/fab/ProofFab';
import { tokens } from '@/theme/tokens';

function TabIcon({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <View className="items-center gap-1">
      {children}
      <View className={`h-1 w-1 rounded-full ${focused ? 'bg-mint' : 'bg-transparent'}`} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <View className="flex-1 bg-void">
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: tokens.void },
          tabBarStyle: {
            height: 64,
            paddingTop: 7,
            paddingBottom: 5,
            backgroundColor: tokens.charcoal,
            borderTopColor: tokens.border,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: tokens.mint,
          tabBarInactiveTintColor: tokens.muted,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarItemStyle: { paddingVertical: 1 },
        }}>
        <Tabs.Screen
          name="tree"
          options={{
            title: 'Tree',
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon focused={focused}>
                <TreePine color={color} size={size - 2} strokeWidth={focused ? 2.5 : 2} />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="feed"
          options={{
            title: 'Feed',
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon focused={focused}>
                <Home color={color} size={size - 2} strokeWidth={focused ? 2.5 : 2} />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="proofs"
          options={{
            title: 'Proofs',
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon focused={focused}>
                <FileCheck2 color={color} size={size - 2} strokeWidth={focused ? 2.5 : 2} />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon focused={focused}>
                <User color={color} size={size - 2} strokeWidth={focused ? 2.5 : 2} />
              </TabIcon>
            ),
          }}
        />
      </Tabs>
      <ProofFab />
    </View>
  );
}
