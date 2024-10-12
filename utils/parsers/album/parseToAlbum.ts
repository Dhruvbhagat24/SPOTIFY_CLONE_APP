import { AlbumResponseType } from '@config';
import { AlbumModel } from '@models';

export const parseToAlbum = ({
  id,
  type,
  album_type,
  name,
  images,
  release_date,
  artists,
  tracks: { total, items },
  copyrights,
  genres,
  label,
}: AlbumResponseType): AlbumModel => ({
  id: id,
  type: type,
  albumType: album_type,
  name: name,
  imageURL: images !== null ? images[0].url : '',
  releaseDate: release_date,
  artists: artists.map(({ id: artistId, type: artistType }) => ({
    id: artistId,
    type: artistType,
  })),
  tracks: {
    total: total,
    items: items.map(
      ({
        id: trackId,
        name: trackName,
        type: trackType,
        artists: trackArtists,
        duration_ms,
        explicit,
      }) => ({
        id: trackId,
        name: trackName,
        type: trackType,
        artists: trackArtists.map(({ name: artistName }) => ({
          name: artistName,
        })),
        durationMs: duration_ms,
        explicit: explicit,
      })
    ),
  },
  copyrights: copyrights,
  genres: genres,
  label: label,
});
