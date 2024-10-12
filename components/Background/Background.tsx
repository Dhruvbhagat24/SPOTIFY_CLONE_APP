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

export type BackgroundPropsType = {
  imageURL: string;
  darkness?: number;
  fallbackImageSource: ImageSourcePropType;
};

export const Background = ({
  imageURL,
  fallbackImageSource,
  darkness = 0,
}: BackgroundPropsType) => {
  return (
    <View style={styles.background} testID="background">
      <Overlay
        style={[
          styles.backgroundDarkOverlay,
          { backgroundColor: hexToRGB(COLORS.PRIMARY, darkness) },
        ]}
        testID="background-overlay"
      />
      {imageURL && (
        <Image
          blurRadius={100}
          style={styles.backgroundBlurredImage}
          source={imageURL ? { uri: imageURL } : fallbackImageSource}
          resizeMode="cover"
          testID="background-image"
        />
      )}
    </View>
  );
};
