import * as React from 'react';

import { Playlist } from '@components';
import { getAlbum, getArtist } from '@api';
import { PlaylistModel, ArtistModel } from '@models';
import { FALLBACK_ALBUM_ID } from '@data';

export type AlbumScreenPropsType = {
  albumId: string;
};

export const PlaylistScreen = ({
  albumId = FALLBACK_ALBUM_ID,
}: AlbumScreenPropsType) => {
  const [albumData, setAlbumData] = React.useState<PlaylistModel | null>(null);
  const [artistsData, setArtistsData] = React.useState<ArtistModel[] | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      try {
        const album = await getAlbum(albumId);
        setAlbumData(album);

        const artists = await Promise.all(
          album.artists.map(async ({ id }) => await getArtist(id))
        );
        setArtistsData(artists);
      } catch (error) {
        setAlbumData(null);
        console.error('Failed to get album data:', error);
      }
    })();
  }, [albumId]);

  if (albumData === null || artistsData === null) {
    return null;
  }

  return <Playlist album={albumData} artists={artistsData} />;
};
