import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './styles';

export type AlbumSongPropsType = {
  name: string;
  artists: { name: string }[];
  isTrackSaved: boolean;
  isPlaying: boolean;
};

export const AlbumTrack = ({
  name,
  artists,
  isTrackSaved,
  isPlaying,
}: AlbumSongPropsType) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.nameView}>
          {isPlaying && (
            <Ionicons style={styles.isPlayingIcon} name="stats-chart-sharp" />
          )}
          <Text
            numberOfLines={1}
            style={[styles.nameText, isPlaying ? styles.nameTextActive : {}]}
          >
            {name}
          </Text>
        </View>

        <View style={styles.artistNameView}>
          {isTrackSaved && (
            <View style={styles.isTrackSavedView}>
              <MaterialCommunityIcons
                style={styles.isTrackSavedIcon}
                name="arrow-down-bold"
              />
            </View>
          )}
          <Text style={styles.artistNameText}>
            {artists.map((a) => a.name).join(', ')}
          </Text>
        </View>
      </View>

      <Pressable style={styles.morePressable}>
        <Entypo style={styles.moreIcon} name="dots-three-horizontal" />
      </Pressable>
    </View>
  );
};
