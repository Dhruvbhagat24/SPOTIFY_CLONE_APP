import axios from 'axios';
import { auth } from './auth';
import { ArtistResponseType } from '@globalTypes';

export const getArtist = async (
  artistId: string
): Promise<ArtistResponseType> => {
  try {
    const { token } = await auth();

    const response = (await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: ArtistResponseType };

    return response.data;
  } catch (error) {
    console.error(`Error fetching artist with an ID: ${artistId}`, error);
    throw error;
  }
};
