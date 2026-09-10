import { Pressable, Text, type PressableProps } from 'react-native';

type ButtonProps = PressableProps & {
  label: string;
  variant?: 'mint' | 'ghost' | 'charcoal';
};

export function Button({
  label,
  variant = 'mint',
  disabled,
  className,
  ...rest
}: ButtonProps & { className?: string }) {
  const base =
    'items-center justify-center rounded-xl border px-4 py-3.5 active:scale-[0.98] active:opacity-85';
  const variants = {
    mint: 'border-mint bg-mint',
    ghost: 'border-border bg-transparent',
    charcoal: 'border-border bg-charcoal',
  } as const;
  const textColor =
    variant === 'mint' ? 'text-void' : variant === 'ghost' ? 'text-muted' : 'text-ink';

  return (
    <Pressable
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-40' : ''} ${className ?? ''}`}
      {...rest}>
      <Text className={`text-sm font-black tracking-[0.4px] ${textColor}`}>{label}</Text>
    </Pressable>
  );
}
