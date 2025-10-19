import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Animated } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { colors } from '../theme/colors';
import BottomNavbar from '../components/BottomNavbar';
import { useRouter } from '../app/router/RouterProvider';
import AppHeader from '../components/AppHeader';
import Icon from '../design-system/Icon';
import { RoundedCard } from '../components/Card';
import ListRow from '../components/ListRow';

export default function Cuidados() {
  const { navigate, goBack } = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  const openRecipeModal = () => {
    setModalVisible(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const downloadPDF = () => {
    // Função para download do PDF - implementar conforme necessário
    console.log('Download PDF');
  };
  return (
    <View style={styles.container}>
      <AppHeader
        greeting="Olá,"
        name="Monica!"
        onPressMessages={() => navigate('Messages')}
        onPressProfile={() => navigate('Account')}
        includeSpacer={true}
      />

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 140 }]}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Icon name="molecule" size={24} color={colors.textPrimary} />
          <Text style={styles.sectionTitle}>Cuidados</Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>A sua rotina diária de cuidados com a pele</Text>

        {/* Main Content */}
        <Text style={styles.mainText}>
          É meu papel como dermatologista orientar sobre os produtos e passos ideais para seu tipo de pele. A consistência é a chave para alcançar resultados duradouros, já que os efeitos dos cuidados diários são cumulativos e transformadores ao longo do tempo. Portanto, investir em uma rotina de cuidados com a pele em casa é tão importante quanto os tratamentos realizados no consultório. Essa combinação garante uma pele mais bonita, saudável e preparada para os desafios diários e os avanços estéticos proporcionados pela dermatologia. De uma forma geral a ordem e sempre: 1) higienizar com sabonetes, solução micelar, tônicos quando necessário - manhã e noite 2) creme ao redor dos olhos - manhã e noite 3) Ativos específicos para sua condição de pele (uma creme diurno e um noturno) 4) Hidratante - manhã e noite 5) Filtro solar pela manhã e reaplicar a tarde (ele não dura o dia todo). O ideal seria reaplicar mais de mais uma vez no meio do dia.
        </Text>

        {/* Rotina de Cuidados Section */}
        <View style={styles.routineSection}>
          <Text style={styles.routineTitle}>Rotina de Cuidados</Text>
        </View>

        {/* Receitas Manipuladas Cards */}
        <View style={styles.cardsSection}>
          <TouchableOpacity onPress={openRecipeModal}>
            <RoundedCard style={styles.recipeCard}>
              <ListRow
                title="Receita manipulados"
                subtitle="08 de agosto de 2025"
                right={
                  <View style={styles.iconContainer}>
                    <Icon name="calendar-outline" size={20} color={colors.textPrimary} />
                  </View>
                }
              />
            </RoundedCard>
          </TouchableOpacity>

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

      {/* Modal de Receita */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Receita manipulados</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
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
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button
                mode="contained"
                onPress={downloadPDF}
                style={styles.downloadButton}
                labelStyle={styles.downloadButtonText}
                icon={() => <Icon name="download" size={20} color="#FFFFFF" />}
              >
                Arquivo.pdf
              </Button>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <BottomNavbar
        items={[
          { key: 'home', label: 'Página Inicial', icon: 'home-outline', onPress: () => navigate('Main') },
          { key: 'identity', label: 'Identidade', customIcon: 'identity', onPress: () => navigate('Account') },
          { key: 'care', label: 'Cuidados', icon: 'molecule', onPress: () => navigate('Care') },
          { key: 'regen', label: 'Regeneração', icon: 'arrow-collapse-vertical', onPress: () => navigate('Next') },
          { key: 'maint', label: 'Manutenção', icon: 'account-cog-outline', onPress: () => navigate('Maintenance') },
          { key: 'checks', label: 'Checkups', icon: 'clipboard-pulse-outline', onPress: () => navigate('Checkups') },
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
    paddingTop: 16 
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
    maxHeight: 400,
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
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  downloadButton: {
    backgroundColor: colors.headerBackground,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
