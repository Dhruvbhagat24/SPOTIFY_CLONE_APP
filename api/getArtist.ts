import axios from 'axios';

import { ArtistModel } from '@models';
import { ArtistResponseType } from '@config';
import { parseToArtist } from '@utils';

import { getSessionlessToken } from './getSessionlessToken';

export const getArtist = async (artistId: string): Promise<ArtistModel> => {
  try {
    const { token } = await getSessionlessToken();

    const response = (await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: ArtistResponseType };

    return parseToArtist(response.data);
  } catch (error) {
    console.error(`Error fetching artist with an ID: ${artistId}`, error);
    throw error;
  }
};
