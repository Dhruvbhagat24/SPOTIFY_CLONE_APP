import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';

import { useApplicationDimensions } from '@hooks';
import { getFallbackImage } from '@utils';

import { styles } from './styles';

export type TrackPropsType = {
  type: 'album' | 'playlist';
  title: string;
  subtitle: string;
  imageURL?: string;
  isTrackDownloaded: boolean;
  isTrackSaved: boolean;
  isPlaying: boolean;
};

export const Track = ({
  type,
  title,
  subtitle,
  imageURL,
  isTrackDownloaded,
  isTrackSaved,
  isPlaying,
}: TrackPropsType) => {
  const { width } = useApplicationDimensions();
  const maxWidth = width - 150;

  return (
    <View style={styles.container}>
      {type === 'playlist' && (
        <Image
          style={styles.image}
          source={imageURL ? { uri: imageURL } : getFallbackImage('track')}
        />
      )}
      <View style={styles.content}>
        <View style={styles.nameView}>
          {isPlaying && (
            <Ionicons style={styles.isPlayingIcon} name="stats-chart-sharp" />
          )}
          <Text
            numberOfLines={1}
            style={[
              styles.nameText,
              { maxWidth },
              isPlaying ? styles.nameTextActive : {},
            ]}
          >
            {title}
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
          <Text numberOfLines={1} style={[styles.artistNameText, { maxWidth }]}>
            {subtitle}
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
