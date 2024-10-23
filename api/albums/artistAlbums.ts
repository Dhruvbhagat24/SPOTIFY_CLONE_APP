import axios from 'axios';

import { LibraryItemModel } from '@models';
import { AlbumsResponseType } from '@config';
import { parseToRecommendedAlbums } from '@utils';

import { getSessionlessToken } from '../utils';

export const getArtistAlbums = async (
  artistId: string,
  includeGroups: string = 'album,single,appears_on,compilation',
  limit: number = 6,
  offset: number = 0
): Promise<LibraryItemModel[]> => {
  try {
    const { token } = await getSessionlessToken();

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

    return parseToRecommendedAlbums(response.data);
  } catch (error) {
    console.error(
      `Error fetching albums of artist with an ID: ${artistId}`,
      error
    );
    throw error;
  }
};
