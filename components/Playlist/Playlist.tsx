import * as React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

export type PlaylistPropsType = { playlist: {} };

export const Playlist = ({ playlist }: PlaylistPropsType) => {
  return <View style={styles.container}></View>;
};
