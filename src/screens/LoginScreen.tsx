import React from 'react';
import { View, StyleSheet, Platform, type TextStyle } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { BrandGradientTitle } from '../design-system/Typography';
import { PrimaryButton } from '../design-system/Buttons';
import { colors } from '../theme/colors';

type Props = {
  onEnter: () => void;
};

const titleFontWeight: TextStyle['fontWeight'] =
  Platform.select<TextStyle['fontWeight']>({ ios: '600', android: '700', default: '700' }) ?? '700';

export default function LoginScreen({ onEnter }: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.headerSpace} />
      <Text variant="headlineMedium" style={styles.jornada}>
        jornada
      </Text>
      <BrandGradientTitle accessibilityRole="header" style={styles.equalize}>
        EQUALIZE
      </BrandGradientTitle>

      <View style={styles.form}>
        <TextInput
          mode="flat"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.placeholder}
          style={styles.input}
          textColor={colors.inputText}
          underlineColor="transparent"
          selectionColor={colors.buttonBackground}
          contentStyle={styles.inputContent}
          theme={{ colors: { background: colors.inputBackground } }}
        />
        <TextInput
          mode="flat"
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
          style={[styles.input, { marginTop: 14 }]}
          textColor={colors.inputText}
          underlineColor="transparent"
          selectionColor={colors.buttonBackground}
          contentStyle={styles.inputContent}
          theme={{ colors: { background: colors.inputBackground } }}
        />

        <PrimaryButton onPress={onEnter} style={styles.button}>
          Entrar
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  headerSpace: {
    height: 96,
  },
  jornada: {
    color: colors.brandSoft,
    textAlign: 'center',
    letterSpacing: 1,
  },
  equalize: {
    fontSize: 48,
    fontWeight: titleFontWeight,
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: 8,
  },
  form: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 36,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
  },
  inputContent: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: colors.buttonBackground,
  },
});
