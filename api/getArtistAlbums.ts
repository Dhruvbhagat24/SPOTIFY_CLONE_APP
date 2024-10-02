import axios from 'axios';
import { auth } from './auth';
import { AlbumsResponseType } from '@config';

export const getArtistAlbums = async (
  artistId: string,
  includeGroups: string = 'album,single,appears_on,compilation',
  limit: number = 6,
  offset: number = 0
): Promise<AlbumsResponseType> => {
  try {
    const { token } = await auth();

    const response = (await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        params: {
          include_groups: includeGroups,
          limit: limit,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: AlbumsResponseType };

    return response.data;
  } catch (error) {
    console.error(
      `Error fetching albums of artist with an ID: ${artistId}`,
      error
    );
    throw error;
  }
};
