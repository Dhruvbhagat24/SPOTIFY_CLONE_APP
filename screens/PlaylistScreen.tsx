import * as React from 'react';
import { Playlist } from '@components';

export type AlbumScreenPropsType = {
  playlistId: string;
};

export const PlaylistScreen = ({ playlistId }: AlbumScreenPropsType) => {
  return <Playlist playlistId={playlistId} />;
};
