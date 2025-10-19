import React from 'react';
import { View, StyleSheet, ScrollView, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import MessagesSection from '../components/MessagesSection';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';
import AppHeader from '../components/AppHeader';
import BottomNavbar from '../components/BottomNavbar';
import { useRouter } from '../app/router/RouterProvider';

export default function MessagesScreen() {
  const { data } = useHomeViewModel();
  const { goBack, canGoBack, navigate } = useRouter();

  // Edge-swipe back (da esquerda para direita)
  const panResponder = React.useMemo(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder: (_: GestureResponderEvent, s: PanResponderGestureState) => {
        // gesto lateral com início na borda esquerda e movimento horizontal > vertical
        const edgeStart = s.moveX <= 24; // 24px da borda
        const horizontal = Math.abs(s.dx) > Math.abs(s.dy) && s.dx > 30;
        return edgeStart && horizontal;
      },
      onPanResponderRelease: () => {
        if (canGoBack) goBack();
      },
    }),
  [canGoBack, goBack]);
  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      <AppHeader
        greeting="Olá,"
        name="Usuário!"
        unreadCount={data?.unreadCount}
        onPressMessages={() => {}}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>Mensagens</Text>
        </View>
        {data?.messages?.length ? (
          <MessagesSection messages={data.messages} />
        ) : (
          <Text style={styles.empty}>Sem mensagens</Text>
        )}
      </ScrollView>
      <BottomNavbar
        items={[
          { key: 'home', label: 'Página Inicial', icon: 'home-outline', onPress: () => navigate('Main') },
          { key: 'identity', label: 'Identidade', customIcon: 'identity', onPress: () => navigate('Account') },
          { key: 'care', label: 'Cuidados', icon: 'molecule', onPress: () => navigate('Care') },
          { key: 'regen', label: 'Regeneração', icon: 'arrow-collapse-vertical' },
          { key: 'maint', label: 'Manutenção', icon: 'account-cog-outline', onPress: () => navigate('Maintenance') },
          { key: 'checks', label: 'Checkups', icon: 'clipboard-pulse-outline', onPress: () => navigate('Checkups') },
          { key: 'trail', label: 'Trilha', icon: 'map-marker-path', onPress: () => navigate('Trail') },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 80 },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 115,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  empty: { color: colors.textMuted, marginTop: 16, paddingHorizontal: 16 },
});
