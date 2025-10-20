import React from 'react';
import type { LayoutChangeEvent, ViewProps } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import { RoundedCard, Divider } from './Card';
import SectionHeader from './SectionHeader';
import ListRow from './ListRow';
import Icon from '../design-system/Icon';

type Props = ViewProps & {
  title?: string;
  dateLabel?: string;
  name?: string;
  onMeasured?: (h: number) => void;
  hideIcon?: boolean;
  hideMoreInfo?: boolean;
  customLayout?: boolean;
};

export default function NextProcedureSection({
  title = 'Próximo procedimento:',
  dateLabel = '—',
  name = '',
  onMeasured,
  style,
  hideIcon = false,
  hideMoreInfo = false,
  customLayout = false,
  ...rest
}: Props) {
  return (
    <View style={[styles.wrapper, style]} {...rest}>
      <RoundedCard
        style={styles.card}
        onLayout={(e: LayoutChangeEvent) => onMeasured?.(e.nativeEvent.layout.height)}
        accessibilityRole="summary"
        accessibilityLabel="Próximo procedimento"
      >
        {customLayout ? (
          <View style={styles.customLayoutContainer}>
            <View style={styles.customLayoutHeader}>
              <Text style={styles.customHeaderTitle}>{title}</Text>
              <Text style={styles.customHeaderDate}>{dateLabel}</Text>
            </View>
            <Text style={styles.customSubtitle}>{name}</Text>
          </View>
        ) : (
          <>
            <SectionHeader title={title} style={styles.sectionHeader} />
            <ListRow
              left={hideIcon ? undefined : <Icon name="calendar-month-outline" size={28} />}
              title={dateLabel}
              subtitle={name}
              right={
                hideMoreInfo ? undefined : (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: colors.textMuted, fontSize: 16 }}>Mais informações</Text>
                    <Text style={{ color: colors.textMuted, marginLeft: 4, fontSize: 18 }}>›</Text>
                  </View>
                )
              }
            />
          </>
        )}
      </RoundedCard>

      {/* Linha divisória branca no container do background translúcido */}
      <View style={styles.dividerContainer}>
        <Divider style={styles.whiteDivider} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // wrapper sem padding horizontal para que o cartão interno possa preencher até as laterais
  wrapper: {
    paddingHorizontal: 0,
    position: 'relative', // para permitir posicionamento absoluto da linha
  },
  card: {
    // tornar o cartão mais escuro e fosco
    backgroundColor: 'rgba(0,0,0,0.50)',
    borderRadius: 0,
    // borda visível, suave
    borderWidth: 1,
    // borda escura sutil
    borderColor: 'rgba(0,0,0,0.35)',
    overflow: 'hidden',
    paddingTop: 8, // espaço interno adicionado equivalente ao gap removido
    paddingBottom: 8, // valor original
    // deixar um pequeno padding interno nas laterais para o conteúdo não encostar na borda
    paddingHorizontal: 14,
    // sombra para dar profundidade ao cartão
    shadowColor: '#000',
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    // reduzir o marginLeft do título interno
    // o SectionHeader usa marginLeft via styles.title (spacing.sm)
    // aqui reduzimos o padding horizontal geral para aproximar o título da esquerda
  },
  dividerContainer: {
    position: 'absolute',
    bottom: 0.1, // 0,1px de distância da borda inferior do wrapper
    left: 2, // 2px de distância da borda esquerda
    right: 2, // 2px de distância da borda direita
  },
  whiteDivider: {
    backgroundColor: '#FFFFFF',
  },
  customLayoutContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  customLayoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customHeaderTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  customHeaderDate: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'right',
  },
  customLayoutContent: {
    alignItems: 'flex-end',
    width: '100%',
  },
  customTitle: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  customSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
});
