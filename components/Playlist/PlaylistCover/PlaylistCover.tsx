import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { styles } from './styles';

export type PlaylistCoverPropsType = {
  image: {
    width: number;
    height: number;
    url: string;
  };
  animatedValue: SharedValue<number>;
};

export const PlaylistCover = ({
  image,
  animatedValue,
}: PlaylistCoverPropsType) => {
  const { width, height, url } = image;
  const animatedImageStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedValue.value,
          [-height, 0, height],
          [-height / 2, 0, height / 1.5],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          animatedValue.value,
          [-height / 2, 0, height * 2],
          [1.25, 1, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      animatedValue.value,
      [0, height / 1.5],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View style={styles.albumImageView} testID="album-cover">
      <Animated.Image
        style={[styles.albumImage, { width, height }, animatedImageStyles]}
        source={{ uri: url }}
        resizeMode="cover"
        testID="album-cover-image"
      />
    </View>
  );
};
