import * as React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRouter, useSegments } from 'expo-router';

import { Categories, COLORS } from '@config';

import { styles } from './styles';

export type CategoryPressablePropsType = {
  id: Categories;
  text: string;
};

export const CategoryPressable = ({ id, text }: CategoryPressablePropsType) => {
  const router = useRouter();
  const segments: string[] = useSegments();
  const isActive = id === segments[1];
  const progress = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: 150 });
  }, [isActive, progress]);

  const animatedPressableStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.SECONDARY, COLORS.TINT]
    ),
  }));

  const animatedTextStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.WHITE, COLORS.PRIMARY]
    ),
  }));

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedText = Animated.createAnimatedComponent(Text);

  return (
    <AnimatedPressable
      style={[styles.category, animatedPressableStyles]}
      onPress={() => router.replace(`/library/${id}`)}
    >
      <AnimatedText style={[styles.categoryText, animatedTextStyles]}>
        {text}
      </AnimatedText>
    </AnimatedPressable>
  );
};
