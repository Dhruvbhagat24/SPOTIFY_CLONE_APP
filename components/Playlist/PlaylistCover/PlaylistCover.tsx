import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { styles } from './styles';
import { PLAYLIST_IMAGE_SIZE } from '@config';

export type PlaylistCoverPropsType = {
  imageURL: string;
  animatedValue: SharedValue<number>;
};

export const PlaylistCover = ({
  imageURL,
  animatedValue,
}: PlaylistCoverPropsType) => {
  const animatedImageStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedValue.value,
          [-PLAYLIST_IMAGE_SIZE, 0, PLAYLIST_IMAGE_SIZE],
          [-PLAYLIST_IMAGE_SIZE / 2, 0, PLAYLIST_IMAGE_SIZE / 1.5],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          animatedValue.value,
          [-PLAYLIST_IMAGE_SIZE / 2, 0, PLAYLIST_IMAGE_SIZE * 2],
          [1.25, 1, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      animatedValue.value,
      [0, PLAYLIST_IMAGE_SIZE / 1.5],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View style={styles.albumImageView} testID="album-cover">
      <Animated.Image
        style={[
          styles.albumImage,
          { width: PLAYLIST_IMAGE_SIZE, height: PLAYLIST_IMAGE_SIZE },
          animatedImageStyles,
        ]}
        source={{ uri: imageURL }}
        resizeMode="cover"
        testID="album-cover-image"
      />
    </View>
  );
};
