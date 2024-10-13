import * as React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { Track } from './Track';
import { checkSavedTracks } from '@api';

export type TracksPropsType = {
  type: 'album' | 'playlist';
  tracks: {
    id: string;
    title: string;
    subtitle: string;
    imageURL?: string;
    explicit?: boolean;
  }[];
};

export const Tracks = ({ tracks, type }: TracksPropsType) => {
  const [savedTracks, setSavedTracks] = React.useState<boolean[] | null>(null);

  React.useEffect(() => {
    if (tracks.some((track) => !track.id) || type === 'playlist') {
      return;
    }

    (async () => {
      try {
        const savedTracksArr = await checkSavedTracks(
          tracks.map((track) => track.id)
        );
        setSavedTracks(savedTracksArr);
      } catch (error) {
        setSavedTracks(null);
        console.error('Failed to check if array of tracks is saved:', error);
      }
    })();
  }, [tracks, type]);

  return (
    <View style={styles.tracks}>
      {tracks.map(({ title, subtitle, imageURL }, index) => (
        <Track
          type={type}
          key={index}
          title={title}
          subtitle={subtitle}
          imageURL={imageURL}
          // TODO: removed this true value and check if tracks are downloaded instead
          isTrackDownloaded={true}
          isTrackSaved={savedTracks ? savedTracks[index] : false}
          // TODO: to be removed and replaced with handlePress logic on play
          isPlaying={false}
        />
      ))}
    </View>
  );
};
