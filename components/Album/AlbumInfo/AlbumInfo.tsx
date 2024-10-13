import { SEPARATOR } from '@config';
import { translations } from '@data';
import * as React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { getDisplayDate, getDisplayTime } from '@utils';

export type AlbumInfoPropsType = {
  releaseDate: string;
  totalTracks: number;
  totalDuration: number;
};

export const AlbumInfo = ({
  releaseDate,
  totalTracks,
  totalDuration,
}: AlbumInfoPropsType) => (
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
