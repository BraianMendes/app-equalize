import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import type { IconName } from '../design-system/Icon';
import Icon from '../design-system/Icon';
import { colors } from '../theme/colors';

// Componente de ícone personalizado para identidade
const IdentityIcon = ({ color = colors.navText }: { color?: string }) => (
  <View style={[styles.customIcon, { borderColor: color }]}>
    <View style={[styles.face, { borderColor: color }]}>
      {/* Olhos */}
      <View style={styles.eyes}>
        <View style={[styles.eye, { backgroundColor: color }]} />
        <View style={[styles.eye, { backgroundColor: color }]} />
      </View>
      {/* Sorriso */}
      <View style={[styles.smile, { borderColor: color }]} />
    </View>
    {/* Cabelo */}
    <View style={[styles.hair, { borderColor: color }]} />
    {/* Pontos decorativos */}
    <View style={styles.leftDots}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={[styles.dot, { backgroundColor: color }]} />
    </View>
    <View style={styles.rightDots}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={[styles.dot, { backgroundColor: color }]} />
    </View>
  </View>
);

type NavItem = {
  key: string;
  label: string;
  icon?: IconName;
  imageSource?: ImageSourcePropType; // Para usar require() ou {uri: ''}
  customIcon?: 'identity'; // Para ícones customizados
  onPress?: () => void;
};

type Props = {
  items: NavItem[];
};

export default function BottomNavbar({ items }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {items.map((it) => (
          <TouchableRipple key={it.key} onPress={it.onPress} borderless style={styles.itemTouchable}>
            <View style={styles.item}>
              {it.customIcon === 'identity' ? (
                <IdentityIcon color={colors.navText} />
              ) : it.imageSource ? (
                <Image source={it.imageSource} style={styles.iconImage} />
              ) : (
                <Icon name={it.icon!} size={24} color={colors.navText} />
              )}
              <Text style={styles.label} numberOfLines={1} ellipsizeMode="clip" allowFontScaling={false}>
                {it.label}
              </Text>
            </View>
          </TouchableRipple>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: Platform.select({ ios: 20, android: 12, default: 12 }),
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  inner: {
    backgroundColor: colors.navBackground,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  itemTouchable: { flex: 1, borderRadius: 12 },
  item: { alignItems: 'center', justifyContent: 'center' },
  label: {
    color: colors.navText,
    marginTop: 4,
    fontSize: 9,
    lineHeight: 11,
    maxWidth: 64,
    textAlign: 'center',
  },
  iconImage: { width: 24, height: 24, tintColor: colors.navText },
  // Estilos para o ícone customizado de identidade
  customIcon: {
    width: 24,
    height: 24,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.2,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyes: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 1,
  },
  eye: {
    width: 2,
    height: 2,
    borderRadius: 1,
    marginHorizontal: 1.5,
  },
  smile: {
    width: 6,
    height: 3,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  hair: {
    position: 'absolute',
    top: -2,
    width: 16,
    height: 8,
    borderTopWidth: 1.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  leftDots: {
    position: 'absolute',
    left: 2,
    top: 6,
  },
  rightDots: {
    position: 'absolute',
    right: 2,
    top: 6,
  },
  dot: {
    width: 1.5,
    height: 1.5,
    borderRadius: 0.75,
    marginVertical: 1,
  },
});
