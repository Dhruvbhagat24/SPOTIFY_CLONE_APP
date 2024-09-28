import * as React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";

import { ArtistAlbumModel } from "@models";

import { ALBUM_IMAGE_SIZE_VARIANT, SEPARATOR } from "@config";
import { translations } from "@data";

import { styles } from "./styles";

export type AlbumArtistAlbumsPropsType = {
  artistsAlbums: {
    artist: string;
    albums: ArtistAlbumModel[];
  }[];
};

export const ArtistRecommendedAlbums = ({
  artistsAlbums,
}: AlbumArtistAlbumsPropsType) =>
  artistsAlbums.map(({ artist, albums }, index) => (
    <View style={styles.container} key={index}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.headerTitleText}>
          {translations.album.artistRecommendedAlbums.headerText}
          {artist}
        </Text>
        <Pressable style={styles.headerPressable}>
          <Text style={styles.headerPressableText}>
            {translations.album.artistRecommendedAlbums.pressableText}
          </Text>
        </Pressable>
      </View>
      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {albums.map((album, index) => (
          <Link href={`/albums/${album.id}`} key={index}>
            <View style={styles.album}>
              <View style={styles.albumImageView}>
                <Image
                  style={styles.albumImage}
                  source={{ uri: album.images[ALBUM_IMAGE_SIZE_VARIANT].url }}
                />
              </View>
              <Text numberOfLines={1} style={styles.albumTitleText}>
                {album.name}
              </Text>
              <View style={styles.albumSubtitleView}>
                <Text numberOfLines={1} style={styles.albumYearText}>
                  {album.releaseDate}
                </Text>
                <Text numberOfLines={1} style={styles.albumSubtitleSeparator}>
                  {SEPARATOR}
                </Text>
                <Text numberOfLines={1} style={styles.albumTypeText}>
                  {
                    translations.album.artistRecommendedAlbums.albumType[
                      album.albumType
                    ]
                  }
                </Text>
              </View>
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  ));
