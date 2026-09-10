import { View, type ViewProps } from 'react-native';

export function Card({ children, className, ...rest }: ViewProps & { className?: string }) {
  return (
    <View
      className={`rounded-2xl border border-border bg-charcoal p-4 ${className ?? ''}`}
      {...rest}>
      {children}
    </View>
  );
}
