import * as React from "react";
import { Image, Text, View } from "react-native";
import { Link } from "expo-router";

import { ArtistModel } from "@models";
import { ALBUM_ARTIST_IMAGE_SIZE_VARIANT } from "@config";

import { styles } from "./styles";

export type AlbumArtistsPropsType = {
  artists: ArtistModel[];
};

export const AlbumArtists = ({ artists }: AlbumArtistsPropsType) =>
  artists.map(({ id, images, name }) => (
    <Link style={styles.link} href={`artists/${id}`} key={id}>
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
            style={styles.image}
            source={{ uri: images[ALBUM_ARTIST_IMAGE_SIZE_VARIANT].url }}
          />
        </View>
        <View>
          <Text style={styles.text}>{name}</Text>
        </View>
      </View>
    </Link>
  ));
