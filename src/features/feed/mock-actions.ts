export type ActionPost = {
  id: string;
  user: string;
  handle: string;
  initials: string;
  action: string;
  note: string;
  time: string;
  xp: number;
  streak: number;
  respects: number;
  comments: number;
};

export const MOCK_ACTIONS: ActionPost[] = [
  {
    id: 'action-1',
    user: 'Maya Chen',
    handle: '@mayamoves',
    initials: 'MC',
    action: 'Morning Anchor',
    note: 'Sunrise run before the city woke up. 5.2 km, no excuses.',
    time: '12 min',
    xp: 60,
    streak: 24,
    respects: 128,
    comments: 14,
  },
  {
    id: 'action-2',
    user: 'Noah Williams',
    handle: '@noahbuilds',
    initials: 'NW',
    action: 'Proof of Craft',
    note: 'Shipped the onboarding prototype and put it in front of three real users.',
    time: '34 min',
    xp: 80,
    streak: 11,
    respects: 93,
    comments: 8,
  },
  {
    id: 'action-3',
    user: 'Amara Okafor',
    handle: '@amaraacts',
    initials: 'AO',
    action: 'Deep Work Sprint',
    note: 'Ninety focused minutes. Draft complete, notifications stayed off.',
    time: '1 hr',
    xp: 75,
    streak: 37,
    respects: 211,
    comments: 22,
  },
];
