import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as React from "react";
import { Pressable, Text, View } from "react-native";

import { SEPARATOR } from "@config";
import { styles } from "./styles";

export type AlbumInfoPropsType = {
  name: string;
  artists: string;
  albumType: string;
  releaseDate: string;
  isLiked: boolean;
  isAlbumSaved: boolean;
};

export const AlbumInfo = ({
  name,
  artists,
  albumType,
  releaseDate,
  isLiked,
  isAlbumSaved,
}: AlbumInfoPropsType) => (
  <View style={styles.albumInfo}>
    <Text style={styles.nameText}>{name}</Text>
    <Text style={styles.artistsText}>{artists}</Text>
    <View style={styles.albumTypeReleaseDateView}>
      <Text style={styles.albumTypeReleaseDateText}>{albumType}</Text>
      <Text style={[styles.albumTypeReleaseDateText, styles.separator]}>
        {SEPARATOR}
      </Text>
      <Text style={[styles.albumTypeReleaseDateText, styles.releaseDateText]}>
        {releaseDate}
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
);
