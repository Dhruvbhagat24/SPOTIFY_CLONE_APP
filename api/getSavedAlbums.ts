import axios from 'axios';
import { getToken } from './getToken';
import { SavedAlbumsResponseType } from '@config';

export const getSavedAlbums = async (
  limit: number = 20,
  offset: number = 0
): Promise<SavedAlbumsResponseType> => {
  try {
    const token = await getToken();
    const response = (await axios.get('https://api.spotify.com/v1/me/albums', {
      params: {
        limit: limit,
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as { data: SavedAlbumsResponseType };
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching saved albums of currently logged in user`,
      error
    );
    throw error;
  }
};
