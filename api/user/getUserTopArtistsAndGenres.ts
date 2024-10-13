import axios from 'axios';

import { LibraryItemModel } from '@models';
import { UserTopArtistsResponseType } from '@config';
import { parseFromTopArtistsToLibraryItem } from '@utils';

import { getSessionToken } from './getSessionToken';

export const getUserTopArtistsAndGenres = async (): Promise<{
  artists: LibraryItemModel[];
  genres: string[];
}> => {
  try {
    const token = await getSessionToken();
    const response = (await axios.get(
      'https://api.spotify.com/v1/me/top/artists',
      {
        params: {
          type: 'artists',
          time_range: 'short_term',
          limit: 50,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: UserTopArtistsResponseType };

    return {
      artists: parseFromTopArtistsToLibraryItem(response.data),
      genres: response.data.items
        .map((item) => item.genres.slice(0, item.genres.length))
        .reduce((prev, next) => prev.concat(next)),
    };
  } catch (error) {
    console.error(
      `Error fetching top artists of currently logged in user`,
      error
    );
    throw error;
  }
};
