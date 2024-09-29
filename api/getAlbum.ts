import axios from 'axios';
import { PlaylistModel } from '@models';
import { AlbumResponseType } from '@globalTypes';
import { auth } from './auth';

const parseAlbumData = (data: AlbumResponseType): PlaylistModel => ({
  id: data.id,
  type: data.type,
  albumType: data.album_type,
  name: data.name,
  images: data.images,
  releaseDate: data.release_date,
  artists: data.artists.map((artist) => ({
    id: artist.id,
    type: artist.type,
  })),
  tracks: {
    limit: data.tracks.limit,
    next: data.tracks.next,
    offset: data.tracks.offset,
    previous: data.tracks.previous,
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

export const getAlbum = async (albumId: string): Promise<PlaylistModel> => {
  try {
    const { token } = await auth();

    const response = (await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: AlbumResponseType };

    return parseAlbumData(response.data);
  } catch (error) {
    console.error(`Error fetching album with an ID: ${albumId}`, error);
    throw error;
  }
};
