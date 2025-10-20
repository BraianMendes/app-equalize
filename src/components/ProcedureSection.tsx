import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import SectionHeader from './SectionHeader';
import { RoundedCard } from './Card';
import ListRow from './ListRow';
import Icon from '../design-system/Icon';
import { colors } from '../theme/colors';
import type { ProcedureItem } from '../domain/home/types';
import type { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultStatusIconStrategy } from './status/StatusIcon';
import { strings } from '../app/strings';

export type ProcedureSectionProps = {
  title: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  items: ProcedureItem[];
  onItemPress?: (item: ProcedureItem) => void;
  onPressSeeAll?: () => void;
};

const statusStrategy = new DefaultStatusIconStrategy();

function StatusBadge({ status }: { status: ProcedureItem['status'] }) {
  return (
    <View style={styles.badge} accessibilityLabel={`Status: ${status}`} accessibilityRole="image">
      {statusStrategy.render(status)}
    </View>
  );
}

export default function ProcedureSection({
  title,
  iconName,
  items,
  onItemPress,
  onPressSeeAll,
}: ProcedureSectionProps) {
  return (
    <View style={styles.section}>
      <SectionHeader
        title={title}
        icon={<Icon name={iconName} color={colors.brandSoft} size={18} />}
        action={
          <Text style={styles.viewAll} onPress={onPressSeeAll} accessibilityRole="button">
            {strings.seeMore} {strings.seeMoreArrow}
          </Text>
        }
        style={{ paddingHorizontal: 0 }}
      />
      <View style={[styles.list, { marginTop: 20, paddingHorizontal: 0 }]}>
        {items.map((it, idx) => (
          <TouchableOpacity key={`${title}-${idx}`} onPress={() => onItemPress?.(it)}>
            <RoundedCard style={styles.cardItem}>
              <ListRow title={it.title} subtitle={it.dateLabel} right={<StatusBadge status={it.status} />} />
            </RoundedCard>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 0, marginTop: 10, marginBottom: 16 },
  viewAll: { color: colors.textMuted },
  list: { gap: 10, marginTop: 6 },
  cardItem: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.headerBackground,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardOutline,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
