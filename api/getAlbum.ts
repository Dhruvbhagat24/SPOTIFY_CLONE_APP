import axios from "axios";
import { AlbumModel } from "@models";
import { auth } from "./auth";

const parseAlbumData = (data: AlbumModel) => ({
  id: data.id,
  type: data.type,
  album_type: data.album_type,
  name: data.name,
  images: data.images,
  release_date: data.release_date.split("-")[0],
  artists: data.artists.map((artist) => ({
    id: artist.id,
    name: artist.name,
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
        id: artist.id,
        name: artist.name,
        type: artist.type,
      })),
      duration_ms: item.duration_ms,
      explicit: item.explicit,
    })),
  },
  copyrights: data.copyrights,
  genres: data.genres,
  label: data.label,
  popularity: data.popularity,
});

export const getAlbum = async (albumId: string): Promise<AlbumModel> => {
  try {
    const { token } = await auth();

    const response = (await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: AlbumModel };

    return parseAlbumData(response.data);
  } catch (error) {
    console.error(`Error fetching album data (ID: ${albumId})`, error);
    throw error;
  }
};
