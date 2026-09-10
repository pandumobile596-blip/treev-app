import { Text, View } from 'react-native';

type AvatarProps = {
  name: string;
  size?: number;
};

export function Avatar({ name, size = 44 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View
      className="items-center justify-center rounded-full border border-border bg-charcoal"
      style={{ width: size, height: size }}>
      <Text className="text-sm font-bold tracking-badge text-ink">{initials}</Text>
    </View>
  );
}
