import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import BottomNavbar from '../components/BottomNavbar';
import { useRouter } from '../app/router/RouterProvider';
import AppHeader from '../components/AppHeader';
import Icon from '../design-system/Icon';
import { RoundedCard } from '../components/Card';
import ListRow from '../components/ListRow';
import { ModalCard } from '../components/ModalCard';

export default function Cuidados() {
  const { navigate, goBack } = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);

  const openRecipeModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const downloadPDF = () => {
    // Função para download do PDF - implementar conforme necessário
    // Centralize in log util to avoid raw console logs

    const { log } = require('../utils/log');
    log.info('Download PDF');
  };
  return (
    <View style={styles.container}>
      <AppHeader
        greeting="Olá,"
        name="Monica!"
        onPressMessages={() => navigate('Messages')}
        onPressProfile={() => navigate('Account')}
        includeSpacer
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <Icon name="molecule" size={24} color={colors.textPrimary} />
          <Text style={styles.sectionTitle}>Cuidados</Text>
        </View>

        <View style={styles.cardsSection}>
          <TouchableOpacity onPress={openRecipeModal}>
            <RoundedCard style={styles.recipeCard}>
              <ListRow
                title="Receita manipulados"
                subtitle="08 de agosto de 2025"
                right={
                  <View style={styles.iconContainer}>
                    <Icon name="close-circle-outline" size={20} color={colors.textMuted} />
                  </View>
                }
              />
            </RoundedCard>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ModalCard
        visible={modalVisible}
        title="Receita manipulados"
        content={
          <>
            <Text style={styles.modalSubtitle}>Sheyla Cristina M de Oliveira</Text>
            <Text style={styles.modalText}>Uso oral:</Text>
            <Text style={styles.modalText}>
              1) Gluconolactona .......................4,0% Ac.{'\n'}
              Glicólico.................................. 4,0%{'\n'}
              Aloe Glucan...............................2,0%{'\n'}
              Ess. Butrit..................................0,3%{'\n'}
              Espuma de Limpeza Plus qsp.....100ml{'\n'}
              Lavar o rosto manhã e noite.
            </Text>
            <Text style={styles.modalText}>
              2) Neoxadiol sérum Aplicar na face manhã e noite após lavar o rosto.{'\n'}
              Dra= 1.......................................4,0%{'\n'}
              Peptídeo Peptride.......................2,0%{'\n'}
              NanoBTX......................................5,0% Omega{'\n'}
              Plus............................................2,0% Coffeesilm.....................3,0%{'\n'}
              Eyeseril.......................................3,0%{'\n'}
              Creme ADO Plus qsp...................150g{'\n'}
              Aplicar ao redor dos olhos manhã e noite.
            </Text>
          </>
        }
        onClose={closeModal}
        primaryAction={{ label: 'Arquivo.pdf', onPress: downloadPDF, icon: 'download' }}
      />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: 20,
    paddingTop: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    lineHeight: 22,
  },
  mainText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
  routineSection: {
    marginTop: 32,
  },
  routineTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  cardsSection: {
    marginTop: 20,
    gap: 12,
  },
  recipeCard: {
    borderWidth: 1,
    borderColor: colors.headerBackground,
    borderRadius: 16,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubtitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
});
