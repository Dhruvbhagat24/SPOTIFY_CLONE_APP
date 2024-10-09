import { SEPARATOR } from '@config';
import { translations } from '@data';
import * as React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { getDisplayDate } from '@utils';

export type PlaylistSummaryPropsType = {
  releaseDate: string;
  totalTracks: number;
  totalDuration: number;
};

export const getDisplayTime = (totalDuration: number) => {
  if (totalDuration / 1000 > 60) {
    return `${Math.floor(totalDuration / 1000 / 60)}h ${Math.ceil(
      (totalDuration / 1000) % 60
    )}min`;
  }

  if ((totalDuration / 1000) % 60 === 0) {
    return `${totalDuration / 1000 / 60}h`;
  }

  return `${totalDuration / 1000}min`;
};

export const PlaylistSummary = ({
  releaseDate,
  totalTracks,
  totalDuration,
}: PlaylistSummaryPropsType) => (
  <View style={styles.container} testID="album-summary">
    <Text style={styles.dateText} testID="release-date-text">
      {getDisplayDate(releaseDate)}
    </Text>
    <View style={styles.totalView}>
      <Text
        style={styles.totalTracksText}
        testID="total-tracks-text"
      >{`${totalTracks} ${translations.tracks}`}</Text>
      <Text style={styles.separator}>{SEPARATOR}</Text>
      <Text style={styles.totalDurationText} testID="total-duration-text">
        {getDisplayTime(totalDuration)}
      </Text>
    </View>
  </View>
);
