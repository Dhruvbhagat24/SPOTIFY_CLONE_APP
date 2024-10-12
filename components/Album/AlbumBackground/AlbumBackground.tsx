import * as React from 'react';
import {
  Image,
  View as Overlay,
  View,
  type ImageSourcePropType,
} from 'react-native';

import { hexToRGB } from '@utils';
import { COLORS } from '@config';

import { styles } from './styles';

export type AlbumBackgroundPropsType = {
  imageURL: string;
  darkness?: number;
  fallbackImageSource: ImageSourcePropType;
};

export const AlbumBackground = ({
  imageURL,
  fallbackImageSource,
  darkness = 0,
}: AlbumBackgroundPropsType) => {
  return (
    <View style={styles.albumBackground} testID="album-background">
      <Overlay
        style={[
          styles.albumBackgroundDarkOverlay,
          { backgroundColor: hexToRGB(COLORS.PRIMARY, darkness) },
        ]}
        testID="album-background-overlay"
      />
      {imageURL && (
        <Image
          blurRadius={100}
          style={styles.albumBackgroundBlurredImage}
          source={imageURL ? { uri: imageURL } : fallbackImageSource}
          resizeMode="cover"
          testID="album-background-image"
        />
      )}
    </View>
  );
};
