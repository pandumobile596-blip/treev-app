import {
  Easing,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export function mintGlowPulse() {
  return withRepeat(
    withSequence(
      withTiming(0.35, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
      withTiming(0.85, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
    ),
    -1,
    false,
  );
}
