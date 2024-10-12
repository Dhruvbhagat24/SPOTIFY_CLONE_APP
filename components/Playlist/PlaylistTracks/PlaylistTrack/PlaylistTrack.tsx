import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './styles';
import { FontAwesome5 } from '@expo/vector-icons';

export type PlaylistSongPropsType = {
  name: string;
  artists: { name: string }[];
  isTrackDownloaded: boolean;
  isTrackSaved: boolean;
  isPlaying: boolean;
};

export const PlaylistTrack = ({
  name,
  artists,
  isTrackDownloaded,
  isTrackSaved,
  isPlaying,
}: PlaylistSongPropsType) => {
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
          {isTrackDownloaded && (
            <View style={styles.isTrackDownloadedView}>
              <MaterialCommunityIcons
                style={styles.isTrackDownloadedIcon}
                name="arrow-down-bold"
              />
            </View>
          )}
          <Text style={styles.artistNameText}>
            {artists.map((a) => a.name).join(', ')}
          </Text>
        </View>
      </View>

      {isTrackSaved && (
        <Pressable style={styles.isTrackSavedPressable}>
          <FontAwesome5 name="check" style={styles.isTrackSavedIcon} />
        </Pressable>
      )}
      <Pressable style={styles.morePressable}>
        <Entypo style={styles.moreIcon} name="dots-three-horizontal" />
      </Pressable>
    </View>
  );
};
