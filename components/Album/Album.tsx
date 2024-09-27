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

import { AlbumModel } from "@models";
import { useApplicationDimensions } from "@hooks";
import { ALBUM_IMAGE_SIZE_VARIANT, SEPARATOR } from "@config";

import { BackgroundGradient as BackgroundOverlay } from "../BackgroundGradient";
import { AlbumBackground } from "./AlbumBackground";
import { AlbumHeader } from "./AlbumHeader";
import { AlbumCover } from "./AlbumCover";
import { AlbumInfo } from "./AlbumInfo";
import { AlbumSong } from "./AlbumSong";

import { styles } from "./styles";

export type AlbumPropsType = {
  data: AlbumModel;
  isAlbumSaved: boolean;
  savedTracks: boolean[];
};

export const Album = ({ data, isAlbumSaved, savedTracks }: AlbumPropsType) => {
  const { width, height } = useApplicationDimensions();
  const { top: statusBarOffset } = useSafeAreaInsets();

  //TODO: to be removed and replaced with API separate + call
  const isLiked = false;
  const { album_type, name, artists, release_date, images, tracks } = data;
  const image = images[ALBUM_IMAGE_SIZE_VARIANT];
  const { height: imageHeight } = image;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const animatedGradientOverlay = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [0, imageHeight],
          [0, -imageHeight],
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
        style={{ paddingTop: statusBarOffset }}
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
          albumType={album_type}
          releaseDate={release_date.split("-")[0]}
          isLiked={isLiked}
          isAlbumSaved={isAlbumSaved}
        />
        <View style={styles.albumTracks}>
          {tracks.items.map((item, index) => (
            <AlbumSong
              {...item}
              key={index}
              isTrackSaved={savedTracks[index]}
              isPlaying={false} //TODO: to be removed and replaced with handlePress logic on play
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};
