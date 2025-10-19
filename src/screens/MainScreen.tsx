import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, useWindowDimensions, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Badge, IconButton, Button } from 'react-native-paper';
import { colors } from '../theme/colors';
import { RoundedCard, Divider } from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import ListRow from '../components/ListRow';
import PromoBanner from '../components/PromoBanner';
import Icon from '../design-system/Icon';
import ResultCard from '../components/ResultCard';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';
import BottomNavbar from '../components/BottomNavbar';
import MediaHero from '../components/MediaHero';
import ProcedureSection from '../components/ProcedureSection';
import { layout } from '../theme/layout';
import { easeNextLayout } from '../utils/animations';
import MessagesSection from '../components/MessagesSection';
import { useRouter } from '../app/router/RouterProvider';
import AppHeader from '../components/AppHeader';
import NextProcedureSection from '../components/NextProcedureSection';

export default function MainScreen() {
  const { data: state } = useHomeViewModel();
  const { navigate } = useRouter();
  const [current, setCurrent] = React.useState(0);
  const [floatH, setFloatH] = React.useState(0);
  const [headerH, setHeaderH] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({ title: '', content: '' });
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  
  const ITEM_WIDTH = 160; // Tamanho aumentado em 1/3 das imagens de resultados
  const SEPARATOR = layout.carouselSeparator;
  const SIDE_SPACING = layout.carouselSeparator;
  const listRef = React.useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const inset = Math.max(SIDE_SPACING, (width - ITEM_WIDTH) / 2);

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
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

  // Posiciona o card flutuante abaixo do header (sem gap externo)
  const floatTop = React.useMemo(() => {
    const GAP = 0;
    if (headerH) return headerH + GAP;
    return GAP;
  }, [headerH]);

  // **Novo**: calculamos um spacerHeight simples (evita fallback arbitrário)
  const spacerHeight = React.useMemo(() => Math.max(0, headerH + floatH), [headerH, floatH]);

  // Debug — remova se não quiser logs
  React.useEffect(() => {
    console.log('[MainScreen] headerH=', headerH, ' floatH=', floatH, ' spacerHeight=', spacerHeight);
  }, [headerH, floatH, spacerHeight]);

  return (
    <View style={styles.container}>
      <AppHeader
        greeting="Olá,"
        name="Monica!"
        unreadCount={state?.unreadCount}
        onPressMessages={() => navigate('Messages')}
        onPressProfile={() => navigate('Account')}
        onLayout={(e) => { easeNextLayout(); setHeaderH(e.nativeEvent.layout.height); }}
        includeSpacer={true}
      />

      {/* Section flutuante: Próximo procedimento (fora do Header) */}
      <View
        style={[styles.floatingCard, { top: floatTop }]}
        onLayout={(e) => {
          // Medimos o wrapper absoluto do cartão para obter altura confiável
          const h = e.nativeEvent.layout.height;
          easeNextLayout();
          setFloatH(h);
        }}
      >
        <NextProcedureSection
          dateLabel={state?.upcoming.dateLabel}
          name={state?.upcoming.name}
          // Removi onMeasured para evitar medidas duplicadas (o wrapper já mede)
        />
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: 0 }]}>
        {/* spacer reduzido para "Novidades para você!" ficar mais próximo do topo */}
        <View style={{ height: Math.max(0, spacerHeight - 130) }} />

        {/* Mensagens ficam apenas na tela dedicada de Mensagens */}
        <SectionHeader 
          title="Novidades para você!" 
          style={{ paddingHorizontal: 0 }}
          action={
            <TouchableOpacity onPress={() => navigate('News')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text accessibilityRole="button" style={styles.actionLink}>Ver mais</Text>
                <Text style={[styles.actionLink, { marginLeft: 4, fontSize: 18 }]}>›</Text>
              </View>
            </TouchableOpacity>
          } 
        />
        <View style={{ marginTop: 12 }}>
          <PromoBanner onPress={() => navigate('News')} />
        </View>
        
        {/* Linha divisória branca entre a imagem "Novidades" e a box do vídeo */}
        <Divider style={{ backgroundColor: '#FFFFFF' }} />
        
        {/* Box de vídeo dentro da seção "Novidades para você!" */}
        <View style={styles.heroWrapper}>
          <MediaHero
            uri={(state?.results?.[0]?.imageUrl) ?? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop'}
            videoUri={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
            loop
            muted
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <SectionHeader 
            title="Resultados" 
            icon={<Icon name="stethoscope" />} 
            style={{ paddingHorizontal: 0 }}
          />
        </View>
        <View style={{ marginTop: 12 }}>
          <FlatList
            ref={listRef}
            data={state?.results ?? []}
          keyExtractor={(_, i) => `res-${i}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          renderItem={({ item }) => (
            <ResultCard 
              uri={item.imageUrl} 
              dateLabel={item.dateLabel} 
              style={styles.thumb}
              onPress={() => navigate('Results')}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
          ListHeaderComponent={<View style={{ width: 0 }} />}
          ListFooterComponent={<View style={{ width: inset }} />}
          snapToInterval={ITEM_WIDTH + SEPARATOR}
          snapToAlignment="center"
          decelerationRate="fast"
          disableIntervalMomentum
          onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const x = e.nativeEvent.contentOffset.x;
            const effective = Math.max(0, x - inset);
            const idx = Math.round(effective / (ITEM_WIDTH + SEPARATOR));
            setCurrent(idx);
          }}
        />
        </View>

        {!!state && (
          <View style={{ marginTop: 24 }}>
            <ProcedureSection 
              title="Cuidados" 
              iconName="molecule" 
              items={state.care} 
              onItemPress={(item) => openModal(item.title, `Detalhes sobre: ${item.title}\n\nData: ${item.dateLabel}\nStatus: ${item.status}\n\nEste é um exemplo de conteúdo detalhado para o procedimento de cuidados. Aqui você pode incluir instruções específicas, recomendações médicas, e outras informações relevantes sobre este tratamento.`)}
            />
            <ProcedureSection 
              title="Regeneração" 
              iconName="arrow-collapse-vertical" 
              items={state.regeneration}
              onItemPress={(item) => openModal(item.title, `Detalhes sobre: ${item.title}\n\nData: ${item.dateLabel}\nStatus: ${item.status}\n\nEste é um exemplo de conteúdo detalhado para o procedimento de regeneração. Aqui você pode incluir informações sobre o processo de regeneração, tempo de recuperação, cuidados pós-procedimento e resultados esperados.`)}
            />
            <ProcedureSection 
              title="Manutenção" 
              iconName="account-cog-outline" 
              items={state.maintenance}
              onItemPress={(item) => openModal(item.title, `Detalhes sobre: ${item.title}\n\nData: ${item.dateLabel}\nStatus: ${item.status}\n\nEste é um exemplo de conteúdo detalhado para o procedimento de manutenção. Aqui você pode incluir informações sobre a frequência recomendada, benefícios do tratamento de manutenção e como ele se integra ao seu plano de cuidados geral.`)}
            />
          </View>
        )}
      </ScrollView>

      {/* Modal de Procedimentos */}
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
              <Text style={styles.modalTitle}>{modalContent.title}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalText}>{modalContent.content}</Text>
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button
                mode="contained"
                onPress={() => console.log('Download PDF')}
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
          { key: 'home', label: 'Página Inicial', icon: 'home-outline' },
          { key: 'identity', label: 'Identidade', customIcon: 'identity', onPress: () => navigate('Account') },
          { key: 'care', label: 'Cuidados', icon: 'molecule', onPress: () => navigate('Care') },
          { key: 'regen', label: 'Regeneração', icon: 'arrow-collapse-vertical' },
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
  header: {
    paddingTop: layout.headerTopPadding,
    paddingHorizontal: layout.floatingHorizontal,
    paddingBottom: layout.headerBottomPadding,
    backgroundColor: colors.headerBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hello: { color: colors.textPrimary, fontSize: 18, opacity: 0.95 },
  name: { color: colors.textPrimary, fontSize: 26, fontWeight: '700', letterSpacing: 0.2, marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  badge: { position: 'absolute', top: 4, right: 4, backgroundColor: '#D96F6F' },
  scroll: { paddingHorizontal: layout.screenPadding, paddingBottom: 120 },
  cardBlock: { paddingBottom: 16 },
  actionLink: { color: colors.textMuted },
  carousel: { paddingHorizontal: 0, paddingBottom: 8, paddingTop: 8 },
  thumb: { width: 160, height: 213 },
  heroWrapper: { 
    paddingHorizontal: 0, 
    marginTop: 12, 
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.headerBackground,
    borderRadius: 16,
  },
  floatingCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: layout.floatingCardRadius,
    backgroundColor: 'transparent',
    borderWidth: 0,
    overflow: 'visible',
    paddingBottom: 0,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
    zIndex: 20,
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
  modalText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
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