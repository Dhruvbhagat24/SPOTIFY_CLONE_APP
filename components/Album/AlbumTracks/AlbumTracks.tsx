import * as React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { AlbumTrack } from './AlbumTrack/AlbumTrack';
import { checkSavedTracks } from '@api';

export type AlbumTracksPropsType = {
  tracks: {
    id: string;
    type: 'track';
    name: string;
    durationMs: number;
    explicit: boolean;
    artists: {
      name: string;
    }[];
  }[];
};

export const AlbumTracks = ({ tracks }: AlbumTracksPropsType) => {
  const [savedTracks, setSavedTracks] = React.useState<boolean[] | null>(null);

  React.useEffect(() => {
    if (tracks.some((track) => !track.id)) {
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
  }, [tracks]);

  return (
    <View style={styles.tracks}>
      {tracks.map(({ name, artists }, index) => (
        <AlbumTrack
          key={index}
          name={name}
          artists={artists}
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
