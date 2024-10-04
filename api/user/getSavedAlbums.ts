import axios from 'axios';
import { getToken } from './getToken';
import { SavedAlbumsResponseType } from '@config';

export const getSavedAlbums = async (
  offset: number = 0,
  numberOfCalls: number = 0
): Promise<SavedAlbumsResponseType[]> => {
  try {
    const maxAllowedLimit = 50;
    const token = await getToken();

    const response = (await axios.get('https://api.spotify.com/v1/me/albums', {
      params: {
        limit: maxAllowedLimit,
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as { data: SavedAlbumsResponseType };

    const result = [response.data];
    const { total } = response.data;
    const numberOfMaxCalls = Math.ceil(total / maxAllowedLimit) - 1;

    if (total / maxAllowedLimit <= 1 || numberOfCalls >= numberOfMaxCalls) {
      return result;
    }

    numberOfCalls++;
    offset += maxAllowedLimit;

    return [...result, ...(await getSavedAlbums(offset, numberOfCalls))];
  } catch (error) {
    console.error(
      `Error fetching saved albums of currently logged in user`,
      error
    );
    throw error;
  }
};
