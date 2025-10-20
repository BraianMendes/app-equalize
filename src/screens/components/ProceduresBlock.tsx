import React from 'react';
import { View } from 'react-native';
import ProcedureSection from '../../components/ProcedureSection';
import type { ProcedureItem } from '../../domain/home/types';
import { strings } from '../../app/strings';

type Props = {
  care: ProcedureItem[];
  regeneration: ProcedureItem[];
  maintenance: ProcedureItem[];
  onItemPress: (item: ProcedureItem) => void;
};

export default function ProceduresBlock({ care, regeneration, maintenance, onItemPress }: Props) {
  return (
    <View style={{ marginTop: 24 }}>
      <ProcedureSection title={strings.care} iconName="molecule" items={care} onItemPress={onItemPress} />
      <ProcedureSection
        title={strings.regeneration}
        iconName="arrow-collapse-vertical"
        items={regeneration}
        onItemPress={onItemPress}
      />
      <ProcedureSection
        title={strings.maintenance}
        iconName="account-cog-outline"
        items={maintenance}
        onItemPress={onItemPress}
      />
    </View>
  );
}
