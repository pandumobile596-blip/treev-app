export const tokens = {
  void: '#0A0A0C',
  charcoal: '#16161B',
  border: '#26262E',
  mint: '#10B981',
  gold: '#F59E0B',
  ink: '#F4F4F5',
  muted: '#A1A1AA',
  locked: '#3F3F46',
} as const;

export type TokenName = keyof typeof tokens;
