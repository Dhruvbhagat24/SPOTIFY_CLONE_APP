import * as React from "react";
import { Pressable, Text, View } from "react-native";
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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

import { AlbumSong } from "../AlbumSong";
import { BackgroundGradient } from "../BackgroundGradient";

import { AlbumModel } from "@models";
import { useApplicationDimensions } from "@hooks";
import {
  ALBUM_HEADER_HEIGHT,
  ALBUM_IMAGE_SIZE_VARIANT,
  SEPARATOR,
} from "@config";

import { styles } from "./styles";

export type AlbumPropsType = {
  data: AlbumModel;
  isAlbumSaved: boolean;
  savedTracks: boolean[];
};

export const Album = ({ data, isAlbumSaved, savedTracks }: AlbumPropsType) => {
  const { width, height } = useApplicationDimensions();

  const { album_type, name, artists, release_date, images, tracks } = data;
  const isLiked = false; //TODO: to be removed and replaced with API separate  +call
  const { top: statusBarOffset } = useSafeAreaInsets();
  const { width: imageWidth, height: imageHeight } =
    images[ALBUM_IMAGE_SIZE_VARIANT];

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const animatedHeaderStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [0, imageHeight * 0.75, imageHeight + imageHeight * 0.13],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
  }));
  const animatedHeaderTextStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [
        0,
        imageHeight + imageHeight * 0.13 - 5,
        imageHeight + imageHeight * 0.13 + 50,
      ],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [
            0,
            imageHeight + imageHeight * 0.13 - 10,
            imageHeight + imageHeight * 0.13 + 100,
          ],
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
      <BackgroundGradient
        styles={{ zIndex: -10 }}
        colors={["#C33123", "#000000"]}
        startY={0}
        endY={height * 2}
      />
      <BackgroundGradient
        styles={[animatedGradientOverlay, { zIndex: -9 }]}
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
                <BackgroundGradient
                  colors={["#C33123", "#6c1c14"]}
                  height={ALBUM_HEADER_HEIGHT}
                />
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
            source={{ uri: images[1].url }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.albumInfo}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.artistsText}>
            {artists.map((a) => a.name).join(` ${SEPARATOR} `)}
          </Text>
          <View style={styles.albumTypeReleaseDateView}>
            <Text style={styles.albumTypeReleaseDateText}>{album_type}</Text>
            <Text style={[styles.albumTypeReleaseDateText, styles.separator]}>
              {SEPARATOR}
            </Text>
            <Text
              style={[styles.albumTypeReleaseDateText, styles.releaseDateText]}
            >
              {release_date}
            </Text>
          </View>

          <View style={styles.pressablesView}>
            <Pressable>
              <FontAwesome
                style={[styles.likeIcon, isLiked ? styles.likeIconActive : {}]}
                name={isLiked ? "heart" : "heart-o"}
              />
            </Pressable>

            <Pressable
              style={[
                styles.isAlbumSavedContainer,
                isAlbumSaved ? styles.isAlbumSavedContainerActive : {},
              ]}
            >
              <MaterialCommunityIcons
                style={[
                  styles.isAlbumSavedIcon,
                  isAlbumSaved ? styles.isAlbumSavedIconActive : {},
                ]}
                name="arrow-down-bold"
              />
            </Pressable>

            <Pressable>
              <Entypo style={styles.moreIcon} name="dots-three-horizontal" />
            </Pressable>
          </View>
        </View>
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
