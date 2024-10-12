import * as React from 'react';
import { type ImageSourcePropType, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { COVER_SIZE } from '@config';
import { styles } from './styles';

export type CoverPropsType = {
  imageURL: string;
  animatedValue: SharedValue<number>;
  fallbackImageSource: ImageSourcePropType;
};

export const Cover = ({
  imageURL,
  animatedValue,
  fallbackImageSource,
}: CoverPropsType) => {
  const animatedImageStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedValue.value,
          [-COVER_SIZE, 0, COVER_SIZE],
          [-COVER_SIZE / 2, 0, COVER_SIZE / 1.5],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          animatedValue.value,
          [-COVER_SIZE / 2, 0, COVER_SIZE * 2],
          [1.25, 1, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      animatedValue.value,
      [0, COVER_SIZE / 1.5],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View style={styles.imageView} testID="cover">
      <Animated.Image
        style={[
          styles.image,
          { width: COVER_SIZE, height: COVER_SIZE },
          animatedImageStyles,
        ]}
        source={imageURL ? { uri: imageURL } : fallbackImageSource}
        resizeMode="cover"
        testID="cover-image"
      />
    </View>
  );
};
