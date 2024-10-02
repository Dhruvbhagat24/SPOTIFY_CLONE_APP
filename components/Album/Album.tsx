import * as React from 'react';
import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { SHAPES, SIZES } from '@config';
import { styling } from './styles';

export type AlbumPropsType = {
  id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  size?: SIZES;
  shape?: SHAPES;
};

export const Album = ({
  id,
  title,
  subtitle,
  imageUrl,
  size = SIZES.BIG,
  shape = SHAPES.SQUARE,
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
          source={{ uri: imageUrl }}
        />
      </View>
      {title && (
        <Text
          numberOfLines={1}
          style={styles.albumTitleText}
          testID="album-title"
        >
          {title}
        </Text>
      )}
      {subtitle && <Text style={styles.albumSubtitleText}>{subtitle}</Text>}
    </Pressable>
  );
};
