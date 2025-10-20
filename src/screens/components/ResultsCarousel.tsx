import React from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { View, FlatList, StyleSheet } from 'react-native';
import SectionHeader from '../../components/SectionHeader';
import Icon from '../../design-system/Icon';
import ResultCard from '../../components/ResultCard';
import { layout } from '../../theme/layout';
import type { ResultItem } from '../../domain/home/types';
import { strings } from '../../app/strings';

type Props = {
  results: ResultItem[];
  onSeeAll: () => void;
};

export default function ResultsCarousel({ results, onSeeAll }: Props) {
  const ITEM_WIDTH = layout.resultsThumbWidth;
  const SEPARATOR = layout.carouselSeparator;
  const listRef = React.useRef<FlatList>(null);
  const [current, setCurrent] = React.useState(0);
  const inset = 0;

  return (
    <View style={{ marginTop: 20 }}>
      <SectionHeader
        title={strings.results}
        icon={<Icon name="stethoscope" />}
        style={{ paddingHorizontal: 0 }}
      />
      <View style={{ marginTop: 12 }}>
        <FlatList
          ref={listRef}
          data={results}
          keyExtractor={(_, i) => `res-${i}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          renderItem={({ item }) => (
            <ResultCard
              uri={item.imageUrl}
              dateLabel={item.dateLabel}
              style={styles.thumb}
              onPress={onSeeAll}
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
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: { paddingHorizontal: 0, paddingBottom: 8, paddingTop: 8 },
  thumb: { width: layout.resultsThumbWidth, height: layout.resultsThumbHeight },
});
