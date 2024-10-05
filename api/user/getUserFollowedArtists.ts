import axios from 'axios';

import { ArtistModel } from '@models';
import { UserFollowedArtistsResponseType } from '@config';
import { parseToUserFollowedArtists } from '@utils';

import { getSessionToken } from './getSessionToken';
import { asyncStorageMiddleware } from './asyncStorageMiddleware';

export const fetchUserFollowedArtists = async (
  after: string = '',
  numberOfCalls: number = 0
): Promise<ArtistModel[]> => {
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
    const result = parseToUserFollowedArtists(response.data.artists.items);

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
  await asyncStorageMiddleware<ArtistModel[]>(
    'user_followed_artists',
    fetchUserFollowedArtists
  );
