import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

import { ALBUM_IMAGE_SIZE_VARIANT, SEPARATOR } from '@config';
import { ArtistAlbumModel } from '@models';
import { translations } from '@data';

import { styles } from './styles';

export type ArtistRecommendedAlbumsPropsType = {
  artistsAlbums: {
    artist: string;
    albums: ArtistAlbumModel[];
  }[];
};

export const ArtistRecommendedAlbums = ({
  artistsAlbums,
}: ArtistRecommendedAlbumsPropsType) => {
  const router = useRouter();
  return artistsAlbums.map(({ artist, albums }, index) => (
    <View
      style={styles.container}
      key={index}
      testID="recommended-albums-section"
    >
      <View style={styles.header}>
        <Text
          numberOfLines={1}
          style={styles.headerTitleText}
          testID="header-title-text"
        >
          {`${translations.album.artistRecommendedAlbums.headerText} ${artist}`}
        </Text>
        <Pressable style={styles.headerPressable}>
          <Text
            style={styles.headerPressableText}
            testID="header-pressable-text"
          >
            {translations.album.artistRecommendedAlbums.pressableText}
          </Text>
        </Pressable>
      </View>
      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        testID="albums-scroll-view"
      >
        {albums.map((album, index) => (
          <Pressable
            testID="album"
            onPress={() => router.push(`/albums/${album.id}`)}
            style={styles.album}
            key={index}
          >
            <View style={styles.albumImageView}>
              <Image
                testID="album-image"
                style={styles.albumImage}
                source={{ uri: album.images[ALBUM_IMAGE_SIZE_VARIANT].url }}
              />
            </View>
            <Text
              numberOfLines={1}
              style={styles.albumTitleText}
              testID="album-title"
            >
              {album.name}
            </Text>
            <View style={styles.albumSubtitleView}>
              <Text
                numberOfLines={1}
                style={styles.albumYearText}
                testID="album-release-date"
              >
                {album.releaseDate}
              </Text>
              <Text numberOfLines={1} style={styles.albumSubtitleSeparator}>
                {SEPARATOR}
              </Text>
              <Text
                numberOfLines={1}
                style={styles.albumTypeText}
                testID="album-album-type"
              >
                {
                  translations.album.artistRecommendedAlbums.albumType[
                    album.albumType
                  ]
                }
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  ));
};
