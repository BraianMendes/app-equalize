import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import BottomNavbar from '../components/BottomNavbar';
import { useRouter } from '../app/router/RouterProvider';
import Icon from '../design-system/Icon';
import AppHeader from '../components/AppHeader';

export default function CheckUps() {
  const { navigate, goBack } = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        greeting="Olá,"
        name="Usuário!"
        onPressMessages={() => navigate('Messages')}
        onPressProfile={() => navigate('Account')}
        includeSpacer={false}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Título da seção */}
        <View style={styles.titleSection}>
          <Icon name="clipboard-pulse-outline" size={24} color={colors.textPrimary} />
          <Text style={styles.sectionTitle}>Checkups</Text>
        </View>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>Sua trilha de tratamentos a longo prazo</Text>

        {/* Texto principal */}
        <Text style={styles.mainText}>
          Os checkups são agendamentos feitos para checar a evolução dos tratamentos, para exame físico da
          pele para checar surgimento de alguma lesão e dar continuidade a sua trilha de cuidados em casa e na
          clínica.
        </Text>

        {/* Seção de procedimentos */}
        <Text style={styles.proceduresTitle}>Procedimentos / Ações</Text>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          {/* Linha vertical da timeline */}
          <View style={styles.timelineLine} />

          {/* Item 1 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              <Icon name="calendar-outline" size={20} color={colors.textMuted} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>08 de agosto de 2025</Text>
              <Text style={styles.timelineTitle}>Rever Programação</Text>
            </View>
          </View>

          {/* Item 2 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              <Icon name="check-circle-outline" size={20} color={colors.textMuted} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>17 de setembro de 2025</Text>
              <Text style={styles.timelineTitle}>Acompanhamento</Text>
            </View>
          </View>

          {/* Item 3 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              <Icon name="check-circle-outline" size={20} color={colors.textMuted} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>15 de setembro de 2025</Text>
              <Text style={styles.timelineTitle}>Acompanhamento</Text>
            </View>
          </View>

          {/* Item 4 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              <Icon name="check-circle-outline" size={20} color={colors.textMuted} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>15 de julho de 2025</Text>
              <Text style={styles.timelineTitle}>Acompanhamento</Text>
            </View>
          </View>

          {/* Item 5 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              <Icon name="check-circle-outline" size={20} color={colors.textMuted} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>29 de maio de 2025</Text>
              <Text style={styles.timelineTitle}>Acompanhamento</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavbar
        items={[
          { key: 'home', label: 'Página Inicial', icon: 'home-outline', onPress: () => navigate('Main') },
          {
            key: 'identity',
            label: 'Identidade',
            customIcon: 'identity',
            onPress: () => navigate('Account'),
          },
          { key: 'care', label: 'Cuidados', icon: 'molecule', onPress: () => navigate('Care') },
          {
            key: 'regen',
            label: 'Regeneração',
            icon: 'arrow-collapse-vertical',
            onPress: () => navigate('Regeneration'),
          },
          {
            key: 'maint',
            label: 'Manutenção',
            icon: 'account-cog-outline',
            onPress: () => navigate('Maintenance'),
          },
          {
            key: 'checks',
            label: 'Checkups',
            icon: 'clipboard-pulse-outline',
            onPress: () => navigate('Checkups'),
          },
          { key: 'trail', label: 'Trilha', icon: 'map-marker-path', onPress: () => navigate('Trail') },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 140, // leave space for bottom navbar
    paddingTop: 120,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    lineHeight: 24,
  },
  mainText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 32,
  },
  proceduresTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  timelineContainer: {
    marginTop: 8,
    paddingLeft: 20,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 39,
    top: 40,
    bottom: 20,
    width: 2,
    backgroundColor: colors.textMuted,
    opacity: 0.3,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    position: 'relative',
  },
  timelineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
    zIndex: 2,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineDate: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 4,
  },
  timelineTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
});
