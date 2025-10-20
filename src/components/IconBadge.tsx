import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';

export function IconBadge({ children }: { children: React.ReactNode }) {
  return <View style={styles.badge}>{children}</View>;
}

export function RightChevron() {
  return <Text style={styles.chev}>›</Text>;
}

const styles = StyleSheet.create({
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chev: { fontSize: 22, color: colors.textMuted },
});
