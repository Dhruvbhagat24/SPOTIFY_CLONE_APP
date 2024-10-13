import * as React from 'react';

import { Playlist } from '@components';
import { getPlaylist } from '@api';
import { PlaylistModel } from '@models';
import { FALLBACK_ALBUM_ID } from '@data';
import { PlaylistFallback } from '@config';

export type AlbumScreenPropsType = {
  playlistId: string;
};

export const PlaylistScreen = ({
  playlistId = FALLBACK_ALBUM_ID,
}: AlbumScreenPropsType) => {
  const [playlistData, setPlaylistData] = React.useState<PlaylistModel | null>(
    PlaylistFallback
  );

  React.useEffect(() => {
    (async () => {
      try {
        const playlist = await getPlaylist(playlistId);
        setPlaylistData(playlist);
      } catch (error) {
        setPlaylistData(null);
        console.error('Failed to get playlist data:', error);
      }
    })();
  }, [playlistId]);

  // TODO: render an error page instead
  if (playlistData === null) {
    return null;
  }

  return <Playlist playlist={playlistData} />;
};
