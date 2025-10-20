import React from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { easeNextLayout } from '../../utils/animations';

export function useHeaderMeasurement() {
  const [headerH, setHeaderH] = React.useState(0);
  const onHeaderLayout = React.useCallback((e: LayoutChangeEvent) => {
    easeNextLayout();
    setHeaderH(e.nativeEvent.layout.height);
  }, []);
  return { headerH, onHeaderLayout } as const;
}
