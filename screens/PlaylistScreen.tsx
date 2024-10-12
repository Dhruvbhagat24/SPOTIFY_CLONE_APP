import * as React from 'react';

import { Playlist } from '@components';
import { getAlbum, getArtist, getArtistAlbums } from '@api';
import { PlaylistModel, AlbumModel, ArtistModel } from '@models';
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
  const [artistsAlbumsData, setArtistsAlbums] = React.useState<
    | {
        artist: string;
        albums: AlbumModel[];
      }[]
    | null
  >(null);

  React.useEffect(() => {
    (async () => {
      try {
        const album = await getAlbum(albumId);
        setAlbumData(album);

        const artists = await Promise.all(
          album.artists.map(async ({ id }) => await getArtist(id))
        );
        setArtistsData(artists);

        const artistAlbums = (
          await Promise.all(
            artists.map(
              async ({ id }) =>
                await getArtistAlbums(id, 'album,compilation', 10)
            )
          )
        ).map((albums, i) => ({ artist: artists[i].name, albums: albums }));
        setArtistsAlbums(artistAlbums);
      } catch (error) {
        setAlbumData(null);
        console.error('Failed to get album data:', error);
      }
    })();
  }, [albumId]);

  if (
    albumData === null ||
    artistsData === null ||
    artistsAlbumsData === null
  ) {
    return null;
  }

  return (
    <Playlist
      album={albumData}
      artists={artistsData}
      artistsAlbums={artistsAlbumsData}
    />
  );
};
