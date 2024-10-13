import axios from 'axios';

import { RecentlyPlayedModel } from '@models';
import { RecentlyPlayedResponseType } from '@config';
import { parseToRecentlyPlayed } from '@utils';

import { getSessionToken } from './getSessionToken';

export const getRecentlyPlayed = async (): Promise<RecentlyPlayedModel[]> => {
  try {
    const token = await getSessionToken();
    const response = (await axios.get(
      'https://api.spotify.com/v1/me/player/recently-played',
      {
        params: {
          limit: 8,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: RecentlyPlayedResponseType };

    return parseToRecentlyPlayed(response.data);
  } catch (error) {
    console.error(
      `Error fetching saved albums of currently logged in user`,
      error
    );
    throw error;
  }
};
