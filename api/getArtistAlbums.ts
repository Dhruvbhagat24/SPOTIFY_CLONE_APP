import axios from 'axios';

import { AlbumModel } from '@models';
import { AlbumsResponseType } from '@config';
import { parseToAlbums } from '@utils';

import { getSessionlessToken } from './getSessionlessToken';

export const getArtistAlbums = async (
  artistId: string,
  includeGroups: string = 'album,single,appears_on,compilation',
  limit: number = 6,
  offset: number = 0
): Promise<AlbumModel[]> => {
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

    return parseToAlbums(response.data);
  } catch (error) {
    console.error(
      `Error fetching albums of artist with an ID: ${artistId}`,
      error
    );
    throw error;
  }
};
