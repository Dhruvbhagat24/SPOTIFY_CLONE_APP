import axios from 'axios';
import { getToken } from './getToken';
import { UserFollowedArtistsResponseType } from '@config';

export const getUserFollowedArtists = async (
  after: string = '',
  numberOfCalls: number = 0
): Promise<UserFollowedArtistsResponseType[]> => {
  try {
    const maxAllowedLimit = 50;
    const token = await getToken();

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

    const result = [response.data];
    const { total } = response.data.artists;
    const numberOfMaxCalls = Math.ceil(total / maxAllowedLimit) - 1;

    if (total / maxAllowedLimit <= 1 || numberOfCalls >= numberOfMaxCalls) {
      return result;
    }

    numberOfCalls++;
    return [
      ...result,
      ...(await getUserFollowedArtists(
        response.data.artists.cursors.after,
        numberOfCalls
      )),
    ];
  } catch (error) {
    console.error(`Error followed artists of currently logged in user`, error);
    throw error;
  }
};
