import * as React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Categories, COLORS } from '@config';
import { translations } from '@data';

import { styles } from './styles';

export type CategoryPressablePropsType = {
  progress: SharedValue<number>;
  currentCategory: Exclude<Categories, Categories.ALL>;
  selectedCategory: Categories;
  handleCategoryChange: (newCategory: Categories) => void;
};

const CategoryPressable = React.memo(
  ({
    progress,
    currentCategory,
    selectedCategory,
    handleCategoryChange,
  }: CategoryPressablePropsType) => {
    const animatedPressableStyles = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        currentCategory === selectedCategory ? progress.value : 0,
        [0, 1],
        [COLORS.SECONDARY, COLORS.TINT]
      ),
    }));

    const animatedTextStyles = useAnimatedStyle(() => ({
      color: interpolateColor(
        currentCategory === selectedCategory ? progress.value : 0,
        [0, 0.2, 1],
        [COLORS.WHITE, COLORS.PRIMARY, COLORS.PRIMARY]
      ),
    }));

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const AnimatedText = Animated.createAnimatedComponent(Text);

    return (
      <AnimatedPressable
        style={[styles.category, animatedPressableStyles]}
        onPress={() => handleCategoryChange(currentCategory)}
      >
        <AnimatedText style={[styles.categoryText, animatedTextStyles]}>
          {translations.libraryCategories[currentCategory]}
        </AnimatedText>
      </AnimatedPressable>
    );
  }
);

CategoryPressable.displayName = 'CategoryPressable';

export { CategoryPressable };
