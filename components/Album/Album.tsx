import * as React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

import { AlbumSong } from "../AlbumSong";

import { AlbumModel } from "@models";
import { ALBUM_IMAGE_SIZE_VARIANT, SEPARATOR } from "@config";

import { styles } from "./styles";

export type AlbumPropsType = {
  data: AlbumModel;
  isAlbumSaved: boolean;
  savedTracks: boolean[];
};

export const Album = ({ data, isAlbumSaved, savedTracks }: AlbumPropsType) => {
  const { album_type, name, artists, release_date, images, tracks } = data;
  const isLiked = false; //TODO: to be removed and replaced with API separate  +call
  const animatedPosition = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    animatedPosition.value = event.contentOffset.y;
  });
  const SCROLL_Y_PEAK = 500;

  const animatedImageStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          animatedPosition.value,
          [0, SCROLL_Y_PEAK],
          [1, 0],
          Extrapolation.CLAMP
        ),
      },
      {
        translateY: interpolate(
          animatedPosition.value,
          [0, SCROLL_Y_PEAK],
          [0, SCROLL_Y_PEAK],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      animatedPosition.value,
      [0, SCROLL_Y_PEAK / 2],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  return (
    <Animated.ScrollView style={styles.container} onScroll={scrollHandler}>
      <View style={styles.albumImageView}>
        <AnimatedImage
          style={[
            styles.albumImage,
            {
              width: images[ALBUM_IMAGE_SIZE_VARIANT].width,
              height: images[ALBUM_IMAGE_SIZE_VARIANT].height,
            },
            animatedImageStyles,
          ]}
          source={{ uri: images[1].url }}
          resizeMode="cover"
        />
      </View>
      <View
        style={[
          styles.content,
          {
            marginTop: images[ALBUM_IMAGE_SIZE_VARIANT].height + 50,
          },
        ]}
      >
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

      <View style={styles.tracks}>
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
  );
};
