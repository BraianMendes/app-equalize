import React from 'react';
import { View } from 'react-native';
import NextProcedureSection from '../../components/NextProcedureSection';
import { layout } from '../../theme/layout';

type Props = {
  headerHeight: number;
  dateLabel?: string;
  name?: string;
  onMeasured?: (h: number) => void;
};

export default function NextProcedureFloat({ headerHeight, dateLabel, name, onMeasured }: Props) {
  const floatTop = React.useMemo(() => headerHeight, [headerHeight]);
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: floatTop,
        borderRadius: layout.floatingCardRadius,
        backgroundColor: 'transparent',
        borderWidth: 0,
        overflow: 'visible',
        paddingBottom: 0,
        marginBottom: 0,
        zIndex: 20,
      }}
      onLayout={(e) => onMeasured?.(e.nativeEvent.layout.height)}
    >
      <NextProcedureSection dateLabel={dateLabel} name={name} />
    </View>
  );
}
