import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ArtistModel } from '@models';
import { ALBUM_ARTIST_IMAGE_SIZE_VARIANT } from '@config';

import { styles } from './styles';

export type AlbumArtistsPropsType = {
  artists: ArtistModel[];
};

export const AlbumArtists = ({ artists }: AlbumArtistsPropsType) => {
  const router = useRouter();

  return artists.map(({ id, images, name }) => (
    <Pressable
      style={styles.link}
      onPress={() => router.push(`/artists/${id}`)}
      key={id}
      testID={`artist-link-${id}`}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.imageView,
            {
              borderRadius: images[ALBUM_ARTIST_IMAGE_SIZE_VARIANT].width / 2,
            },
          ]}
        >
          <Image
            testID="artist-image"
            style={styles.image}
            source={{ uri: images[ALBUM_ARTIST_IMAGE_SIZE_VARIANT].url }}
          />
        </View>
        <View>
          <Text testID="artist-name" style={styles.text}>
            {name}
          </Text>
        </View>
      </View>
    </Pressable>
  ));
};
