import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import BottomNavbar from '../components/BottomNavbar';
import { useRouter } from '../app/router/RouterProvider';
import AppHeader from '../components/AppHeader';
import Icon from '../design-system/Icon';
import { Divider, RoundedCard } from '../components/Card';
import { LinearGradient } from 'expo-linear-gradient';

export default function NewsScreen() {
  const { navigate, goBack } = useRouter();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (cardIndex: number) => {
    setExpandedCard(expandedCard === cardIndex ? null : cardIndex);
  };

  const cardContents = [
    {
      title: 'Novidade na Equalize: Efeito Preenchimento Injetável',
      subtitle: 'A agenda está aberta para novo tratamento!',
      content:
        'Os preenchimentos injetáveis são uma excelente opção para quem busca rejuvenescimento facial de forma não cirúrgica. Este procedimento utiliza substâncias como ácido hialurônico para preencher rugas, sulcos e restaurar o volume perdido com o tempo. O resultado é imediato e natural, proporcionando uma aparência mais jovem e revitalizada. Na Equalize, utilizamos produtos de alta qualidade e técnicas avançadas para garantir os melhores resultados com total segurança.',
    },
    {
      title: 'Chegou nova onda de calor, como proceder',
      subtitle: 'Confira aqui 10 dicas de cuidados com seus procedimentos',
      content:
        'Durante períodos de alta temperatura, é fundamental redobrar os cuidados com a pele, especialmente após procedimentos estéticos. O calor excessivo pode causar irritações, inflamações e comprometer a cicatrização. Mantenha a área tratada sempre hidratada, evite exposição solar direta, use protetor solar com FPS alto e siga rigorosamente as orientações pós-procedimento. Em caso de qualquer alteração ou desconforto, entre em contato imediatamente com nossa equipe.',
    },
    {
      title: 'Novos tratamentos disponíveis',
      subtitle: 'Conheça as últimas novidades em procedimentos estéticos',
      content:
        'A Equalize está sempre se atualizando com as mais modernas técnicas e tecnologias do mercado estético. Nossos novos tratamentos incluem laser de última geração para rejuvenescimento, microagulhamento com drug delivery para maior penetração de ativos, e protocolos personalizados de skincare. Cada procedimento é desenvolvido especificamente para as necessidades individuais de cada paciente, garantindo resultados excepcionais e duradouros.',
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeader
        greeting="Olá,"
        name="Usuário!"
        onPressMessages={() => navigate('Messages')}
        onPressProfile={() => navigate('Account')}
        includeSpacer={true}
      />

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 140 }]}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Icon name="newspaper-variant-outline" size={24} color={colors.textPrimary} />
          <Text style={styles.sectionTitle}>Novidades</Text>
        </View>

        {/* Linha divisória branca */}
        <Divider style={{ backgroundColor: '#FFFFFF' }} />

        {/* Imagem com proporção maior */}
        <View style={styles.imageContainer}>
          <RoundedCard style={styles.newsCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=1200&q=60&auto=format&fit=crop',
              }}
              resizeMode="cover"
              style={styles.newsImage}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
            <View style={styles.overlay}>
              <Text style={styles.newsTitle}>Chegou nova onda de calor, como proceder</Text>
              <Text style={styles.newsSubtitle}>
                Confira aqui 10 dicas de cuidados com seus procedimentos
              </Text>
            </View>
          </RoundedCard>
        </View>

        {/* Conteúdo da notícia */}
        <View style={styles.articleContent}>
          <Text style={styles.articleTitle}>Chegou nova onda de calor, como proceder</Text>
          <Text style={styles.articleDate}>01 de agosto de 2025</Text>

          <Text style={styles.articleText}>
            Em dias muito quentes, a pele precisa de cuidados especiais para se manter saudável e protegida. A
            exposição prolongada ao sol pode causar queimaduras, envelhecimento precoce e até aumento o risco
            de câncer de pele. Por isso, o uso diário de protetor solar é essencial, mesmo em dias nublados.
            Opte! é escolher um produto com fator de proteção (FPS) adequado ao seu tipo de pele e
            reaplique-lo cada duas horas, especialmente após entrar na água ou transpirar.
          </Text>

          <Text style={styles.articleText}>
            Além do protetor solar, é importante manter a pele bem hidratada. O calor excessivo e a exposição
            ao sol podem ressecar a pele, deixando-a áspera e sensível. Beba bastante água ao longo do dia
            ajuda a manter a hidratação de dentro para fora. Já no cuidado externo, o uso de cremes e loções
            hidratantes leves, de preferência a base de água, pode ajudar a evitar o ressecamento e a
            descamação.
          </Text>

          <Text style={styles.articleText}>
            Outro ponto importante é evitar a exposição solar nos horários de maior intensidade, geralmente
            entre 10h e 16h. Nesse período, a radiação ultravioleta é mais forte e pode causar danos maiores à
            pele. Sempre que possível, busque locais com sombra e use acessórios como chapéus, bonés e óculos
            de sol com proteção UV. Roupas de manga compridas e tecidos com proteção solar também são aliadas.
          </Text>

          <Text style={styles.articleText}>
            Por fim, é fundamental observar a pele regularmente e ficar atento a qualquer alteração, como
            manchas, pintas ou feridas que não cicatrizam. Em caso de dúvida, o ideal é consultar um
            dermatologista. Cuidar da pele nos dias quentes é mais do que uma questão estética — é uma atitude
            de saúde e prevenção que deve fazer parte da rotina de todos.
          </Text>
        </View>

        {/* Cards de notícias adicionais */}
        <View style={styles.newsCardsSection}>
          {cardContents.map((card, index) => (
            <View key={index}>
              <TouchableOpacity onPress={() => toggleCard(index)} activeOpacity={0.8}>
                <RoundedCard style={styles.newsCard}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=1200&q=60&auto=format&fit=crop',
                    }}
                    style={styles.newsCardImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.newsCardGradient}
                  />
                  <View style={styles.newsCardOverlay}>
                    <Text style={styles.newsCardTitle}>{card.title}</Text>
                    <Text style={styles.newsCardSubtitle}>{card.subtitle}</Text>
                  </View>
                </RoundedCard>
              </TouchableOpacity>

              {expandedCard === index && (
                <View style={styles.expandedContent}>
                  <Text style={styles.expandedTitle}>{card.title}</Text>
                  <Text style={styles.expandedDate}>05 de outubro de 2025</Text>
                  <Text style={styles.expandedText}>{card.content}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Placeholder content - removido para dar espaço ao artigo */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  imageContainer: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  newsCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 220,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  overlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  newsTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  newsSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 18,
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 40,
  },

  // Estilos do artigo
  articleContent: {
    marginTop: 24,
    paddingHorizontal: 4,
  },

  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },

  articleDate: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
  },

  articleText: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify',
  },

  // Estilos dos cards de notícias
  newsCardsSection: {
    marginTop: 32,
    paddingHorizontal: 4,
    gap: 16,
  },

  newsCardImage: {
    width: '100%',
    height: 140,
  },

  newsCardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 80,
  },

  newsCardOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },

  newsCardTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },

  newsCardSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },

  // Estilos do conteúdo expandido
  expandedContent: {
    backgroundColor: colors.surface,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.headerBackground,
  },

  expandedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },

  expandedDate: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 16,
  },

  expandedText: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
    textAlign: 'justify',
  },
});
