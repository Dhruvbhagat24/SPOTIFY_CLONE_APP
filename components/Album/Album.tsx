import * as React from "react";
import { Pressable, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { AlbumSong } from "./AlbumSong";
import { BackgroundGradient as BackgroundOverlay } from "../BackgroundGradient";

import { AlbumModel } from "@models";
import { useApplicationDimensions } from "@hooks";
import {
  ALBUM_HEADER_HEIGHT,
  ALBUM_IMAGE_SIZE_VARIANT,
  SEPARATOR,
} from "@config";

import { styles } from "./styles";
import { AlbumBackground } from "./AlbumBackground";
import { AlbumInfo } from "./AlbumInfo";

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
  const {
    width: imageWidth,
    height: imageHeight,
    url: uri,
  } = images[ALBUM_IMAGE_SIZE_VARIANT];

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const scrollYOnHeaderAppear = imageHeight + imageHeight * 0.05;

  const animatedHeaderStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [0, imageHeight * 0.75, scrollYOnHeaderAppear],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
  }));
  const animatedHeaderTextStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [0, scrollYOnHeaderAppear - 5, scrollYOnHeaderAppear + 50],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [0, scrollYOnHeaderAppear - 5, scrollYOnHeaderAppear + 50],
          [10, 10, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));
  const animatedImageStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-imageHeight, 0, imageHeight],
          [-imageHeight / 2, 0, imageHeight / 1.5],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-imageHeight / 2, 0, imageHeight * 2],
          [1.25, 1, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      scrollOffset.value,
      [0, imageHeight / 1.5],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));
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
      <AlbumBackground uri={uri} darkness={0.2} />
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
            <>
              <Pressable
                style={[styles.albumGoBackPressable, { top: statusBarOffset }]}
              >
                <MaterialIcons
                  style={styles.albumGoBackIcon}
                  name="keyboard-arrow-left"
                />
              </Pressable>

              <Animated.View
                style={[
                  animatedHeaderStyles,
                  { height: ALBUM_HEADER_HEIGHT, paddingTop: statusBarOffset },
                  styles.albumHeaderContent,
                ]}
              >
                <AlbumBackground uri={uri} darkness={0.4} />
                <Animated.Text
                  style={[
                    animatedHeaderTextStyles,
                    styles.albumHeaderTitleText,
                  ]}
                >
                  {name}
                </Animated.Text>
              </Animated.View>
            </>
          ),
        }}
      />
      <Animated.ScrollView
        style={[styles.scrollView, { paddingTop: statusBarOffset }]}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <View style={styles.albumImageView}>
          <Animated.Image
            style={[
              styles.albumImage,
              { width: imageWidth, height: imageHeight },
              animatedImageStyles,
            ]}
            source={{ uri: uri }}
            resizeMode="cover"
          />
        </View>
        <AlbumInfo
          name={name}
          artists={artists.map((a) => a.name).join(` ${SEPARATOR} `)}
          albumType={album_type}
          releaseDate={release_date}
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
