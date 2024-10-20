import * as React from 'react';

import { Album } from '@components';
import { getAlbum, getArtist } from '@api';
import { AlbumModel, ArtistModel } from '@models';
import { AlbumFallback, ArtistFallback } from '@config';

export type AlbumScreenPropsType = {
  albumId: string;
};

export const AlbumScreen = ({ albumId }: AlbumScreenPropsType) => {
  const [album, setAlbum] = React.useState<AlbumModel | null>(AlbumFallback);
  const [artists, setArtists] = React.useState<ArtistModel[] | null>(
    ArtistFallback
  );

  React.useEffect(() => {
    (async () => {
      try {
        const albumData = await getAlbum(albumId);
        setAlbum(albumData);

        const artistsData = await Promise.all(
          albumData.artists.map(async ({ id }) => await getArtist(id))
        );
        setArtists(artistsData);
      } catch (error) {
        setAlbum(null);
        setArtists(null);
        console.error('Failed to get album data:', error);
      }
    })();
  }, [albumId]);

  return <Album album={album} artists={artists} />;
};
