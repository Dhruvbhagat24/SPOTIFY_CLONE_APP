import * as React from 'react';

import { Album } from '@components';
import { getAlbum, getArtist } from '@api';
import { AlbumModel, ArtistModel } from '@models';
import { FALLBACK_ALBUM_ID } from '@data';
import { AlbumFallback, ArtistFallback } from '@config';

export type AlbumScreenPropsType = {
  albumId: string;
};

export const PlaylistScreen = ({
  albumId = FALLBACK_ALBUM_ID,
}: AlbumScreenPropsType) => {
  const [albumData, setAlbumData] = React.useState<AlbumModel | null>(
    AlbumFallback
  );
  const [artistsData, setArtistsData] = React.useState<ArtistModel[] | null>(
    ArtistFallback
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

  // TODO: render an error page instead
  if (albumData === null || artistsData === null) {
    return null;
  }

  return <Album album={albumData} artists={artistsData} />;
};
