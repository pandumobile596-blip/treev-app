import { View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/theme/tokens';

type ScreenProps = ViewProps & {
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
};

export function Screen({ children, style, edges = ['top'], ...rest }: ScreenProps) {
  return (
    <SafeAreaView
      edges={edges}
      style={[{ flex: 1, backgroundColor: tokens.void }, style]}
      {...rest}>
      <View className="flex-1 bg-void">{children}</View>
    </SafeAreaView>
  );
}
