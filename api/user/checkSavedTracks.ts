import axios from 'axios';
import { getSessionToken } from './getSessionToken';

export const checkSavedTracks = async (
  trackIds: string[]
): Promise<boolean[]> => {
  try {
    const token = await getSessionToken();

    if (trackIds.length > 50) {
      throw new Error('Cannot check more than 50 track IDs at once.');
    }

    const encodedIds = encodeURIComponent(trackIds.join(','));

    const response = (await axios.get(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${encodedIds}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: boolean[] };

    return response.data;
  } catch (error) {
    console.error('Error fetching saved tracks data:', error);
    throw error;
  }
};
