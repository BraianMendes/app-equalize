import React from 'react';
import type { TextProps, ColorValue } from 'react-native';
import { Text as RNText, StyleSheet, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

type Props = TextProps & {
  colors: Readonly<[ColorValue, ColorValue, ...ColorValue[]]>;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  children: React.ReactNode;
};

export default function GradientText({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  children,
  ...rest
}: Props) {
  return (
    <MaskedView
      maskElement={
        <RNText {...rest} style={[styles.maskText, style]}>
          {children}
        </RNText>
      }
    >
      <LinearGradient colors={colors} start={start} end={end} style={styles.gradient} />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  gradient: { width: '100%', height: '100%' },
  maskText: { color: 'black' },
});
