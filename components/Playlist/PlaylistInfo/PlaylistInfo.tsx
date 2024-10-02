import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { SEPARATOR } from '@config';
import { translations } from '@data';

import { AnimatedPressable } from '../../AnimatedPressable';
import { styles } from './styles';

export type PlaylistInfoPropsType = {
  name: string;
  artists: string;
  albumType: 'album' | 'single' | 'compilation';
  releaseDate: string;
  isDownloaded: boolean;
  isSaved: boolean;
};

export const PlaylistInfo = ({
  name,
  artists,
  albumType,
  releaseDate,
  isDownloaded,
  isSaved,
}: PlaylistInfoPropsType) => (
  <View style={styles.albumInfo}>
    <Text style={styles.nameText}>{name}</Text>
    <Text style={styles.artistsText}>{artists}</Text>
    <View style={styles.albumTypeReleaseDateView}>
      <Text style={styles.albumTypeReleaseDateText}>
        {translations.type[albumType]}
      </Text>
      <Text style={[styles.albumTypeReleaseDateText, styles.separator]}>
        {SEPARATOR}
      </Text>
      <Text style={[styles.albumTypeReleaseDateText, styles.releaseDateText]}>
        {releaseDate}
      </Text>
    </View>

    <View style={styles.pressablesView}>
      <AnimatedPressable
        defaultIcon="plus"
        activeIcon="check"
        isActive={isSaved}
      />
      <AnimatedPressable
        defaultIcon="arrow-down"
        activeIcon="arrow-down"
        isActive={isDownloaded}
      />
      <Pressable>
        <Entypo style={styles.moreIcon} name="dots-three-horizontal" />
      </Pressable>
    </View>
  </View>
);
