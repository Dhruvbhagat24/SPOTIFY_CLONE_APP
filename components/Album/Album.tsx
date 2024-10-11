import * as React from 'react';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { COLORS, Shapes, Sizes } from '@config';
import { styling } from './styles';

export type AlbumPropsType = {
  id: string;
  type: string;
  imageURL?: string;
  title?: string;
  subtitle?: string;
  size?: Sizes;
  shape?: Shapes;
};

const Album = React.memo(
  ({
    id,
    type,
    title,
    subtitle,
    imageURL,
    size = Sizes.BIG,
    shape = Shapes.SQUARE,
  }: AlbumPropsType) => {
    const router = useRouter();
    const styles = styling(size, shape);

    const handlePress = React.useCallback(
      (albumId: string) => {
        router.push(`/albums/${albumId}`);
      },
      [router]
    );

    const renderIcon = React.useCallback(() => {
      switch (type) {
        case 'artist':
          return (
            <FontAwesome name="user" size={size * 0.7} color={COLORS.GREY} />
          );
        case 'album':
          return <Foundation name="music" size={size} color={COLORS.GREY} />;
        case 'show':
        case 'episode':
          return (
            <FontAwesome name="podcast" size={size * 0.7} color={COLORS.GREY} />
          );
        default:
          return (
            <FontAwesome name="user" size={size * 0.7} color={COLORS.GREY} />
          );
      }
    }, [type, size]);

    return (
      <Pressable
        testID="album"
        onPress={() => handlePress(id)}
        style={styles.album}
      >
        <View style={styles.albumImageView}>
          <React.Suspense fallback={renderIcon()}>
            {imageURL ? (
              <Image
                testID="album-image"
                style={styles.albumImage}
                source={{ uri: imageURL }}
              />
            ) : (
              renderIcon()
            )}
          </React.Suspense>
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
  }
);
Album.displayName = 'Album';

export { Album };
