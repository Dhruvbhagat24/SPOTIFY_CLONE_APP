import axios from 'axios';

import { LibraryItemModel } from '@models';
import { UserFollowedArtistsResponseType } from '@config';
import { parseFromFollowedArtistsToLibraryItem } from '@utils';

import { getSessionToken } from './getSessionToken';
import { fileSystemMiddleware } from '../fileSystemMiddleware';

export const fetchUserFollowedArtists = async (
  after: string = '',
  numberOfCalls: number = 0
): Promise<LibraryItemModel[]> => {
  try {
    const maxAllowedLimit = 50;
    const token = await getSessionToken();

    const response = (await axios.get(
      'https://api.spotify.com/v1/me/following',
      {
        params: {
          type: 'artist',
          limit: maxAllowedLimit,
          ...(after ? { after } : {}),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as {
      data: UserFollowedArtistsResponseType;
    };

    const { total } = response.data.artists;
    const numberOfMaxCalls = Math.ceil(total / maxAllowedLimit) - 1;
    const result = parseFromFollowedArtistsToLibraryItem(
      response.data.artists.items
    );

    if (total / maxAllowedLimit <= 1 || numberOfCalls >= numberOfMaxCalls) {
      return result;
    }

    numberOfCalls++;

    const next = await fetchUserFollowedArtists(
      response.data.artists.cursors.after,
      numberOfCalls
    );

    return [...result, ...next];
  } catch (error) {
    console.error(`Error followed artists of currently logged in user`, error);
    throw error;
  }
};

export const getUserFollowedArtists = async () =>
  await fileSystemMiddleware<LibraryItemModel[]>(
    'user_followed_artists',
    fetchUserFollowedArtists
  );
