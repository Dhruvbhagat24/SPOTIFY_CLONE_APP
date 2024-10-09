import * as React from 'react';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { Shapes, Sizes } from '@config';
import { styling } from './styles';

export type AlbumPropsType = {
  id: string;
  imageURL: string;
  title?: string;
  subtitle?: string;
  size?: Sizes;
  shape?: Shapes;
};

export const Album = ({
  id,
  title,
  subtitle,
  imageURL,
  size = Sizes.BIG,
  shape = Shapes.SQUARE,
}: AlbumPropsType) => {
  const router = useRouter();
  const styles = styling(size, shape);
  return (
    <Pressable
      testID="album"
      onPress={() => router.push(`/albums/${id}`)}
      style={styles.album}
    >
      <View style={styles.albumImageView}>
        <Image
          testID="album-image"
          style={styles.albumImage}
          source={{ uri: imageURL }}
        />
      </View>
      {title && (
        <Text
          numberOfLines={2}
          style={styles.albumTitleText}
          testID="album-title"
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text numberOfLines={1} style={styles.albumSubtitleText}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
};
