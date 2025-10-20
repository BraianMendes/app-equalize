import React from 'react';
import type { ViewProps } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { shadow } from '../theme/elevation';
import { spacing } from '../theme/spacing';

export function RoundedCard({ style, ...rest }: ViewProps) {
  return <View style={[styles.card, style]} {...rest} />;
}

export function Divider({ style }: { style?: object }) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardOutline,
    overflow: 'hidden',
    ...shadow.card,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.divider, marginVertical: spacing.lg },
});
