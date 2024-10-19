import * as React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { Track } from '../../Track';
import { checkSavedTracks } from '@api';

export type AlbumTracksPropsType = {
  type: 'album' | 'playlist';
  tracks: {
    id: string;
    title: string;
    subtitle: string;
    imageURL?: string;
    explicit?: boolean;
  }[];
};

export const AlbumTracks = ({ tracks, type }: AlbumTracksPropsType) => {
  const [savedAlbumTracks, setSavedAlbumTracks] = React.useState<
    boolean[] | null
  >(null);

  React.useEffect(() => {
    if (!tracks.length || type === 'playlist') {
      return;
    }

    (async () => {
      try {
        const savedAlbumTracksArr = await checkSavedTracks(
          tracks.map((track) => track.id)
        );
        setSavedAlbumTracks(savedAlbumTracksArr);
      } catch (error) {
        setSavedAlbumTracks(null);
        console.error('Failed to check if array of tracks are saved:', error);
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
          isTrackSaved={savedAlbumTracks ? savedAlbumTracks[index] : false}
          // TODO: to be removed and replaced with handlePress logic on play
          isPlaying={false}
        />
      ))}
    </View>
  );
};
