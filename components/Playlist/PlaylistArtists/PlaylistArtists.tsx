import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { ArtistModel } from '@models';

import { styles } from './styles';

export type PlaylistArtistsPropsType = {
  artists: ArtistModel[];
};

export const PlaylistArtists = ({ artists }: PlaylistArtistsPropsType) => {
  const router = useRouter();

  const handlePress = React.useCallback(
    (albumId: string) => {
      router.push(`/albums/${albumId}`);
    },
    [router]
  );

  return artists.map(({ id, imageURL, name }) => (
    <Pressable
      style={styles.link}
      onPress={() => handlePress(`/artists/${id}`)}
      key={id}
      testID={`artist-link-${id}`}
    >
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image
            testID="artist-image"
            style={styles.image}
            source={{ uri: imageURL }}
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
