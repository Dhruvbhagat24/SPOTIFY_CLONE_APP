import * as React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { BackgroundGradient as BackgroundOverlay } from "../BackgroundGradient";
import { AlbumBackground } from "./AlbumBackground";
import { AlbumHeader } from "./AlbumHeader";
import { AlbumCover } from "./AlbumCover";
import { AlbumInfo } from "./AlbumInfo";
import { AlbumTrack } from "./AlbumTrack";
import { AlbumSummary } from "./AlbumSummary";
import { AlbumArtists } from "./AlbumArtists";
import { ArtistRecommendedAlbums } from "./ArtistRecommendedAlbums";
import { AlbumCopyrights } from "./AlbumCopyrights";

import { AlbumModel, ArtistAlbumModel, ArtistModel } from "@models";
import { useApplicationDimensions } from "@hooks";
import {
  ALBUM_IMAGE_SIZE_VARIANT,
  BOTTOM_NAVIGATION_HEIGHT,
  SEPARATOR,
} from "@config";

import { styles } from "./styles";

export type AlbumPropsType = {
  album: AlbumModel;
  artists: ArtistModel[];
  artistsAlbumsData: {
    artist: string;
    albums: ArtistAlbumModel[];
  }[];
  isAlbumSaved: boolean;
  savedTracks: boolean[];
};

export const Album = ({
  album,
  artists,
  artistsAlbumsData,
  isAlbumSaved,
  savedTracks,
}: AlbumPropsType) => {
  const { width, height } = useApplicationDimensions();
  const { top: statusBarOffset } = useSafeAreaInsets();

  // TODO: to be removed and replaced with API separate + call
  const isLiked = false;
  const { albumType, name, releaseDate, images, tracks, copyrights } = album;
  const image = images[ALBUM_IMAGE_SIZE_VARIANT];
  const { height: imageHeight } = image;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const animatedGradientOverlay = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [0, imageHeight, imageHeight * 2, imageHeight * 2 + 1],
          [0, -imageHeight, -imageHeight * 2, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <View style={{ width }}>
      <AlbumBackground url={image.url} darkness={0.2} />
      <BackgroundOverlay
        styles={[animatedGradientOverlay, styles.albumGradientOverlay]}
        colors={["transparent", "rgba(0, 0, 0, 1)"]}
        startY={imageHeight / 2}
        endY={imageHeight + 70 + 90}
        height={height}
      />

      <Stack.Screen
        options={{
          headerTransparent: true,
          headerBackground: () => (
            <AlbumHeader
              headerTitle={name}
              image={image}
              animatedValue={scrollOffset}
            />
          ),
        }}
      />
      <Animated.ScrollView
        style={{
          paddingTop: statusBarOffset,
          marginBottom: BOTTOM_NAVIGATION_HEIGHT,
        }}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <AlbumCover
          image={images[ALBUM_IMAGE_SIZE_VARIANT]}
          animatedValue={scrollOffset}
        />
        <AlbumInfo
          name={name}
          artists={artists.map((a) => a.name).join(` ${SEPARATOR} `)}
          albumType={albumType}
          releaseDate={releaseDate.split("-")[0]}
          isLiked={isLiked}
          isAlbumSaved={isAlbumSaved}
        />
        <View style={styles.albumTracks}>
          {tracks.items.map((item, index) => (
            <AlbumTrack
              key={index}
              name={item.name}
              artists={item.artists}
              isTrackSaved={savedTracks[index]}
              // TODO: to be removed and replaced with handlePress logic on play
              isPlaying={false}
            />
          ))}
        </View>
        <AlbumSummary
          releaseDate={releaseDate}
          totalTracks={tracks.total}
          totalDuration={album.tracks.items.reduce(
            (acc, { durationMs }) => acc + durationMs,
            0
          )}
        />
        <AlbumArtists artists={artists} />
        <ArtistRecommendedAlbums artistsAlbums={artistsAlbumsData} />
        <AlbumCopyrights copyrights={copyrights} />
      </Animated.ScrollView>
    </View>
  );
};
