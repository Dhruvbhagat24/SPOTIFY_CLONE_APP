import * as React from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Album } from '../Album';
import { LibraryHeader } from './LibraryHeader';

import { useApplicationDimensions } from '@hooks';
import { BOTTOM_NAVIGATION_HEIGHT, Categories, Shapes, Sizes } from '@config';
import { LibraryItemModel } from '@models';
import { getLibrary, LibraryType } from '@api';

import { styles } from './styles';

export const Library = () => {
  const { width, height } = useApplicationDimensions();
  const [selectedCategory, setSelectedCategory] = React.useState<Categories>(
    Categories.ALL
  );
  const [data, setData] = React.useState<LibraryType | null>(null);
  const { top: safeAreaOffset } = useSafeAreaInsets();

  const numColumns = 3;
  const initRenderAmount = 15;
  const maxRenderPerBatchAmount = 15;
  const outsideOfVisibleAreKeptInMemoryAmount = 9;

  const progress = useSharedValue(1);
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
        progress.value,
        [0, 0.2, 1],
        [0, 0, 1],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [0, 1],
            [0, -20],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const handleCategoryChange = (newCategory: Categories) => {
    progress.value = withTiming(0, { duration: 100 }, (isFinished) => {
      if (!isFinished) {
        return;
      }

      runOnJS(setSelectedCategory)(
        selectedCategory === newCategory ? Categories.ALL : newCategory
      );

      progress.value = withTiming(1, { duration: 1000 });
    });

    flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
  };

  const renderItem = React.useCallback(
    ({
      item: { id, title, type, subtitle, imageURL },
      index,
    }: {
      item: LibraryItemModel;
      index: number;
    }) => (
      <Album
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

  if (!data) {
    return null;
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <LibraryHeader
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        progress={progress}
      />
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <FlatList
          ref={flatListRef}
          data={data[selectedCategory]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={initRenderAmount}
          maxToRenderPerBatch={maxRenderPerBatchAmount}
          windowSize={outsideOfVisibleAreKeptInMemoryAmount}
          contentContainerStyle={styles.flatList}
          columnWrapperStyle={styles.flatListColumnWrapper}
          numColumns={numColumns}
          style={[
            styles.scrollView,
            {
              paddingTop: safeAreaOffset,
              marginBottom: BOTTOM_NAVIGATION_HEIGHT,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};
