import * as React from 'react';
import { Image, View as Overlay, View } from 'react-native';

import { styles } from './styles';

export type AlbumBackgroundPropsType = {
  url: string;
  darkness?: number;
};

export const AlbumBackground = ({
  url,
  darkness = 0,
}: AlbumBackgroundPropsType) => {
  return (
    <View style={styles.albumBackground} testID="album-background">
      <Overlay
        style={[
          styles.albumBackgroundDarkOverlay,
          { backgroundColor: `rgba(0, 0, 0, ${darkness})` },
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
