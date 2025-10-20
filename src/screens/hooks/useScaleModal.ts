import React from 'react';
import { Animated } from 'react-native';

export function useScaleModal() {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  const open = React.useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [scaleAnim]);

  const close = React.useCallback(() => {
    Animated.timing(scaleAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start();
  }, [scaleAnim]);

  return { scaleAnim, open, close } as const;
}
