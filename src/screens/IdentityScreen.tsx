import React from 'react';
import { View, StyleSheet, ScrollView, Image, FlatList, Dimensions, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, IconButton } from 'react-native-paper';
import { colors } from '../theme/colors';
import Icon from '../design-system/Icon';
import { layout } from '../theme/layout';
import { useRouter } from '../app/router/RouterProvider';
import BottomNavbar from '../components/BottomNavbar';
import AppHeader from '../components/AppHeader';

export default function IdentityScreen() {
  const { goBack, navigate } = useRouter();
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(null);

  const showTooltip = (id: string) => {
    setActiveTooltip(id);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
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
        {/* Identity Section */}
        <View style={styles.identitySection}>
          <View style={styles.titleSection}>
            <Icon name="account-circle-outline" size={24} color={colors.textPrimary} />
            <Text style={styles.sectionTitle}>Minha Identidade</Text>
          </View>
          
          <View style={styles.photoContainer}>
            <FlatList
              data={[
                { id: '1', uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop' },
                { id: '2', uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop' }
              ]}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.carouselContainer}
              decelerationRate="fast"
              onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
                const x = e.nativeEvent.contentOffset.x;
                const screenWidth = Dimensions.get('window').width;
                const newIndex = Math.round(x / screenWidth);
                setActiveImageIndex(newIndex);
              }}
              renderItem={({ item }) => (
                <View style={styles.carouselItem}>
                  <View style={styles.photoFrame}>
                    <Image 
                      source={{ uri: item.uri }}
                      style={styles.facePhoto}
                      resizeMode="cover"
                    />
                    
                    {/* Overlay dots for facial mapping */}
                    <Pressable 
                      style={[styles.touchArea, { top: 25, left: '50%', marginLeft: -21 }]}
                      onPressIn={() => showTooltip('testa')}
                      onPressOut={hideTooltip}
                    >
                      <View style={[styles.dot, { top: 15, left: 15 }]} />
                    </Pressable>
                    
                    <Pressable 
                      style={[styles.touchArea, { top: 65, left: '30%', marginLeft: -21 }]}
                      onPressIn={() => showTooltip('sobrancelha')}
                      onPressOut={hideTooltip}
                    >
                      <View style={[styles.dot, { top: 15, left: 15 }]} />
                    </Pressable>
                    
                    <Pressable 
                      style={[styles.touchArea, { top: 165, left: '50%', marginLeft: -21 }]}
                      onPressIn={() => showTooltip('boca')}
                      onPressOut={hideTooltip}
                    >
                      <View style={[styles.dot, { top: 15, left: 15 }]} />
                    </Pressable>
                    
                    <Pressable 
                      style={[styles.touchArea, { top: 225, left: '50%', marginLeft: -21 }]}
                      onPressIn={() => showTooltip('queixo')}
                      onPressOut={hideTooltip}
                    >
                      <View style={[styles.dot, { top: 15, left: 15 }]} />
                    </Pressable>
                    
                    <Pressable 
                      style={[styles.touchArea, { top: 305, left: '50%', marginLeft: -21 }]}
                      onPressIn={() => showTooltip('pescoco')}
                      onPressOut={hideTooltip}
                    >
                      <View style={[styles.dot, { top: 15, left: 15 }]} />
                    </Pressable>
                    
                    {/* Date overlay at bottom of image */}
                    <View style={styles.dateOverlay}>
                      <Text style={styles.dateOverlayText}>05 de fevereiro de 2023</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          
          {/* Tooltips renderizados fora do container da imagem */}
          {activeTooltip === 'testa' && (
            <>
              <View style={styles.tooltipOverlay} />
              <View style={[styles.tooltip, { top: 220, left: '50%', marginLeft: -75 }]}>
                <Text style={styles.tooltipText}>Testa</Text>
                <Text style={styles.tooltipSubtext}>Linhas de expressão</Text>
              </View>
            </>
          )}
          
          {activeTooltip === 'sobrancelha' && (
            <>
              <View style={styles.tooltipOverlay} />
              <View style={[styles.tooltip, { top: 250, left: '30%', marginLeft: -100 }]}>
                <Text style={styles.tooltipText}>Pálpebra</Text>
                <Text style={styles.tooltipSubtext}>Pálpebras superiores{'\n'}com leve flacidez</Text>
              </View>
            </>
          )}
          
          {activeTooltip === 'boca' && (
            <>
              <View style={styles.tooltipOverlay} />
              <View style={[styles.tooltip, { top: 350, left: '50%', marginLeft: -75 }]}>
                <Text style={styles.tooltipText}>Boca</Text>
                <Text style={styles.tooltipSubtext}>Região perioral</Text>
              </View>
            </>
          )}
          
          {activeTooltip === 'queixo' && (
            <>
              <View style={styles.tooltipOverlay} />
              <View style={[styles.tooltip, { top: 410, left: '50%', marginLeft: -75 }]}>
                <Text style={styles.tooltipText}>Queixo</Text>
                <Text style={styles.tooltipSubtext}>Contorno facial</Text>
              </View>
            </>
          )}
          
          {activeTooltip === 'pescoco' && (
            <>
              <View style={styles.tooltipOverlay} />
              <View style={[styles.tooltip, { top: 490, left: '50%', marginLeft: -75 }]}>
                <Text style={styles.tooltipText}>Pescoço</Text>
                <Text style={styles.tooltipSubtext}>Região cervical</Text>
              </View>
            </>
          )}
          
          {/* Navigation dots */}
          <View style={styles.navigationDotsContainer}>
            <View style={styles.navigationDots}>
              <View style={[styles.navDot, activeImageIndex === 0 && styles.navDotActive]} />
              <View style={[styles.navDot, activeImageIndex === 1 && styles.navDotActive]} />
            </View>
          </View>
        </View>

        {/* Text Content Sections */}
        <View style={styles.textSection}>
          <Text style={styles.questionTitle}>Quem sou eu?</Text>
          <Text style={styles.answerText}>
            Paciente do sexo feminino, 55 anos, super ativa. Deseja viver de forma intensa, feliz e com qualidade todas as fases da sua vida e está comprometida em se preparar para isso cuidando da sua saúde de forma preventiva. Busca apoio especializada com todas as informações, conhecimento, ciência e técnicas e tecnologia que há no mercado.
          </Text>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.questionTitle}>O que te motivou a procurar o Equalize (suas queixas)?</Text>
          <Text style={styles.answerText}>
            Deseja "equalizar" a sua imagem com seu espírito ativo e jovial. Tratar os sinais de flacidez de pele, tecido e vícios com procedimentos que de fato farão diferença trazendo resultado com segurança e naturalidade. Ter um aspecto saudável na pele. Também deseja se organizar melhor em aos agendamentos de acordo com os intervalos indicados para cada procedimento.
          </Text>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.questionTitle}>Quais as suas expectativas?</Text>
          <Text style={styles.answerText}>
            Manter a saúde da pele, estimular firmeza e minimizar sinais de flacidez com naturalidade.
          </Text>
        </View>

        {/* Photos Section */}
        <View style={styles.photosSection}>
          <Text style={styles.photosTitle}>Fotos</Text>
          <View style={styles.photosContainer}>
            <View style={styles.photoItem}>
              <View style={styles.photoWrapper}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop' }}
                  style={styles.sidePhoto}
                  resizeMode="cover"
                />
                <View style={styles.captionOverlay}>
                  <Text style={styles.photoCaption}>Lateral esquerda</Text>
                </View>
              </View>
            </View>
            <View style={styles.photoItem}>
              <View style={styles.photoWrapper}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop' }}
                  style={styles.sidePhoto}
                  resizeMode="cover"
                />
                <View style={styles.captionOverlay}>
                  <Text style={styles.photoCaption}>Perfil esquerdo</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 3D Section - Duplicate of Photos */}
        <View style={styles.photosSection}>
          <Text style={styles.photosTitle}>3D</Text>
          <View style={[styles.photosContainer, { marginTop: 8 }]}>
            <View style={styles.photoItem}>
              <View style={styles.photoWrapper}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop' }}
                  style={styles.sidePhoto}
                  resizeMode="cover"
                />
                <View style={styles.captionOverlay}>
                  <Text style={styles.photoCaption}>Volumetria</Text>
                </View>
              </View>
            </View>
            <View style={styles.photoItem}>
              <View style={styles.photoWrapper}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop' }}
                  style={styles.sidePhoto}
                  resizeMode="cover"
                />
                <View style={styles.captionOverlay}>
                  <Text style={styles.photoCaption}>Perfil esquerdo</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Objetivos e metas Section */}
        <View style={styles.textSection}>
          <Text style={styles.sectionTitle}>Objetivos e metas</Text>
          
          <View style={styles.questionSection}>
            <Text style={styles.questionTitle}>Expectativas?</Text>
            <Text style={styles.questionText}>
              Manter a saúde da pele, estimular firmeza e minimizar sinais de flacidez com naturalidade.
            </Text>
          </View>

          <View style={styles.questionSection}>
            <Text style={styles.questionTitle}>Na visão do médico quais os pontos fortes?</Text>
            <Text style={styles.questionText}>
              Boa qualidade de pele.
            </Text>
          </View>

          <View style={styles.questionSection}>
            <Text style={styles.questionTitle}>Na visão do médico quais os pontos fracos?</Text>
            <Text style={styles.questionText}>
              Perda de volume e sustentação.
            </Text>
          </View>

          <View style={styles.questionSection}>
            <Text style={styles.questionTitle}>O que mais gosta em você?</Text>
            <Text style={styles.questionText}>
              Olha e gosta do conjunto.
            </Text>
          </View>

          <View style={styles.questionSection}>
            <Text style={styles.questionTitle}>O que menos gosta em você?</Text>
            <Text style={styles.questionText}>
              Flacidez de pele principalmente na região do terço inferior.
            </Text>
          </View>
        </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: layout.screenPadding, paddingTop: 16 },
  identitySection: {
    paddingVertical: 40,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 8,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  carouselContainer: {
    paddingHorizontal: 0,
  },
  carouselItem: {
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  photoFrame: {
    position: 'relative',
    width: 320,
    height: 400,
    backgroundColor: colors.surface,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  facePhoto: {
    width: '100%',
    height: '100%',
  },
  dot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
  },
  
  // Área de toque aumentada
  touchArea: {
    width: 42,
    height: 42,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
  dateOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dateOverlayText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  navigationDotsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  navigationDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
  },
  navDotActive: {
    backgroundColor: colors.headerBackground,
  },
  textSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  questionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 24,
  },
  answerText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
  photosSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 40,
  },
  photosTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  photosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  photoItem: {
    flex: 1,
    alignItems: 'center',
  },
  photoWrapper: {
    position: 'relative',
    width: '100%',
  },
  sidePhoto: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  photoCaption: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  questionSection: {
    marginBottom: 20,
  },
  questionText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Estilos do tooltip
  tooltipOverlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    width: 5000,
    height: 5000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    minWidth: 150,
    borderWidth: 2,
    borderColor: colors.headerBackground,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 15,
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  tooltipSubtext: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
    opacity: 0.9,
  },
});
