import * as React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { PlaylistTrack } from './PlaylistTrack/PlaylistTrack';
import { checkSavedTracks } from '@api';

export type PlaylistTracksPropsType = {
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

export const PlaylistTracks = ({ tracks }: PlaylistTracksPropsType) => {
  const [savedTracks, setSavedTracks] = React.useState<boolean[] | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const savedTracksArr = await checkSavedTracks(
          tracks.map((track) => track.id)
        );
        setSavedTracks(savedTracksArr);
      } catch (error) {
        setSavedTracks(null);
        console.error('Failed to get album data:', error);
      }
    })();
  }, [tracks]);

  return (
    <View style={styles.tracks}>
      {tracks.map(({ name, artists }, index) => (
        <PlaylistTrack
          key={index}
          name={name}
          artists={artists}
          isTrackDownloaded={true}
          isTrackSaved={savedTracks ? savedTracks[index] : false}
          // TODO: to be removed and replaced with handlePress logic on play
          isPlaying={false}
        />
      ))}
    </View>
  );
};
