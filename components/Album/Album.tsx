import * as React from 'react';
import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { styles } from './styles';

export type AlbumPropsType = {
  id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  size?: 'small' | 'medium' | 'big';
  shape?: 'square' | 'squareBorder' | 'circle';
};

export const Album = ({
  id,
  title,
  subtitle,
  imageUrl,
  size = 'big',
  shape = 'square',
}: AlbumPropsType) => {
  const router = useRouter();
  return (
    <Pressable
      testID="album"
      onPress={() => router.push(`/albums/${id}`)}
      style={styles.album}
    >
      <View style={[styles.albumImageView, styles[size], styles[shape]]}>
        <Image
          testID="album-image"
          style={styles.albumImage}
          source={{ uri: imageUrl }}
        />
      </View>
      {title && (
        <Text
          numberOfLines={1}
          style={[styles.albumTitleText, styles[`${size}Title`]]}
          testID="album-title"
        >
          {title}
        </Text>
      )}
      {subtitle && <Text style={styles.albumSubtitleText}>{subtitle}</Text>}
    </Pressable>
  );
};
