const RANKS: { minLevel: number; title: string }[] = [
  { minLevel: 1, title: 'SEEDLING' },
  { minLevel: 3, title: 'SPROUT' },
  { minLevel: 5, title: 'RANGER' },
  { minLevel: 8, title: 'BUILDER' },
  { minLevel: 11, title: 'STRATEGIST' },
  { minLevel: 14, title: 'ARCHITECT' },
  { minLevel: 18, title: 'ORACLE' },
  { minLevel: 22, title: 'LEGEND' },
];

export const XP_PER_LEVEL = 100;

export function titleForLevel(level: number): string {
  let title = RANKS[0].title;
  for (const rank of RANKS) {
    if (level >= rank.minLevel) {
      title = rank.title;
    }
  }
  return title;
}

export function levelFromXp(xp: number): number {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}
