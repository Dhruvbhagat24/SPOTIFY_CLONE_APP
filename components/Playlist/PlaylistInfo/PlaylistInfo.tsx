import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { SEPARATOR } from '@config';
import { styles } from './styles';
import { translations } from '@data';

export type PlaylistInfoPropsType = {
  name: string;
  artists: string;
  albumType: 'album' | 'single' | 'compilation';
  releaseDate: string;
  isLiked: boolean;
  isPlaylistSaved: boolean;
};

export const PlaylistInfo = ({
  name,
  artists,
  albumType,
  releaseDate,
  isLiked,
  isPlaylistSaved,
}: PlaylistInfoPropsType) => (
  <View style={styles.albumInfo}>
    <Text style={styles.nameText}>{name}</Text>
    <Text style={styles.artistsText}>{artists}</Text>
    <View style={styles.albumTypeReleaseDateView}>
      <Text style={styles.albumTypeReleaseDateText}>
        {translations.album.albumInfo.albumType[albumType]}
      </Text>
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
          name={isLiked ? 'heart' : 'heart-o'}
        />
      </Pressable>

      <Pressable
        style={[
          styles.isPlaylistSavedContainer,
          isPlaylistSaved ? styles.isPlaylistSavedContainerActive : {},
        ]}
      >
        <MaterialCommunityIcons
          style={[
            styles.isPlaylistSavedIcon,
            isPlaylistSaved ? styles.isPlaylistSavedIconActive : {},
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
