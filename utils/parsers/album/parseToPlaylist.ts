import { ALBUM_IMAGE_SIZE_VARIANT, AlbumResponseType } from '@config';
import { PlaylistModel } from '@models';

export const parseToPlaylist = (data: AlbumResponseType): PlaylistModel => ({
  id: data.id,
  type: data.type,
  albumType: data.album_type,
  name: data.name,
  imageURL: data.images[ALBUM_IMAGE_SIZE_VARIANT].url,
  releaseDate: data.release_date,
  artists: data.artists.map((artist) => ({
    id: artist.id,
    type: artist.type,
  })),
  tracks: {
    total: data.tracks.total,
    items: data.tracks.items.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      artists: item.artists.map((artist) => ({
        name: artist.name,
      })),
      durationMs: item.duration_ms,
      explicit: item.explicit,
    })),
  },
  copyrights: data.copyrights,
  genres: data.genres,
  label: data.label,
  popularity: data.popularity,
});
