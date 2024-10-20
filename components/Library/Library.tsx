import * as React from 'react';
import { FlatList, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Card } from '../Card';

import { useApplicationDimensions } from '@hooks';
import { Categories, Shapes, Sizes } from '@config';
import { LibraryItemModel } from '@models';
import { getLibrary, LibraryType } from '@api';

import { styles } from './styles';
import { useLibrarySelectedCategory } from '@context';

export const Library = () => {
  const [data, setData] = React.useState<LibraryType | null>(null);
  const { librarySelectedCategory, animatedValue } =
    useLibrarySelectedCategory();
  const { width } = useApplicationDimensions();

  const numColumns = 3;
  const initRenderAmount = 15;
  const maxRenderPerBatchAmount = 15;
  const outsideOfVisibleAreKeptInMemoryAmount = 9;

  const flatListRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const libraryData = await getLibrary();
        setData(libraryData);
      } catch (error) {
        setData(null);
        console.error(error);
      }
    })();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedValue.value,
        [0, 0.2, 1],
        [0, 0, 1],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            animatedValue.value,
            [0, 1],
            [+20, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const renderItem = React.useCallback(
    ({
      item: { id, title, type, subtitle, imageURL },
      index,
    }: {
      item: LibraryItemModel;
      index: number;
    }) => (
      <Card
        key={index}
        id={id}
        type={type}
        shape={
          type === Categories.FOLLOWED_ARTISTS ? Shapes.CIRCLE : Shapes.SQUARE
        }
        size={Sizes.SMALL}
        title={title}
        subtitle={subtitle}
        imageURL={imageURL}
      />
    ),
    []
  );

  React.useEffect(() => {
    flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }, [librarySelectedCategory]);

  // TODO: remove this and add instead a fallback data
  if (!data) {
    return null;
  }

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <FlatList
          ref={flatListRef}
          data={data[librarySelectedCategory]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={initRenderAmount}
          maxToRenderPerBatch={maxRenderPerBatchAmount}
          windowSize={outsideOfVisibleAreKeptInMemoryAmount}
          contentContainerStyle={styles.flatList}
          columnWrapperStyle={styles.flatListColumnWrapper}
          numColumns={numColumns}
          style={styles.scrollView}
        />
      </Animated.View>
    </View>
  );
};
