import type { MD3Theme } from 'react-native-paper';
import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { colors } from './colors';
import { typography } from './typography';

const fontConfig = {
  displayLarge: { fontFamily: 'System', fontWeight: '700', fontSize: typography.xxl, letterSpacing: 0.2 },
  headlineMedium: { fontFamily: 'System', fontWeight: '700', fontSize: typography.xl, letterSpacing: 0.2 },
  titleMedium: { fontFamily: 'System', fontWeight: '700', fontSize: typography.lg, letterSpacing: 0.3 },
  bodyLarge: { fontFamily: 'System', fontWeight: '400', fontSize: typography.md, letterSpacing: 0.1 },
  labelSmall: { fontFamily: 'System', fontWeight: '600', fontSize: typography.xs, letterSpacing: 0.2 },
} as const;

export const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  isV3: true,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.buttonBackground,
    onPrimary: colors.buttonText,
    background: colors.background,
    surface: colors.surface,
    onSurface: colors.textPrimary,
    outline: colors.placeholder,
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 12,
};
