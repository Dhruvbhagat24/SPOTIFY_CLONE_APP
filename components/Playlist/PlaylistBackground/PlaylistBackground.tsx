import * as React from 'react';
import { Image, View as Overlay, View } from 'react-native';

import { hexToRGB } from '@utils';
import { COLORS } from '@config';

import { styles } from './styles';

export type PlaylistBackgroundPropsType = {
  url: string;
  darkness?: number;
};

export const PlaylistBackground = ({
  url,
  darkness = 0,
}: PlaylistBackgroundPropsType) => {
  return (
    <View style={styles.albumBackground} testID="album-background">
      <Overlay
        style={[
          styles.albumBackgroundDarkOverlay,
          { backgroundColor: hexToRGB(COLORS.PRIMARY, darkness) },
        ]}
        testID="album-background-overlay"
      />
      <Image
        blurRadius={100}
        style={styles.albumBackgroundBlurredImage}
        source={{ uri: url }}
        resizeMode="cover"
        testID="album-background-image"
      />
    </View>
  );
};
