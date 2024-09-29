import axios from 'axios';
import { auth } from './auth';

export const checkSavedAlbums = async (
  albumIds: string[]
): Promise<boolean[]> => {
  try {
    const { token } = await auth();

    if (albumIds.length > 50) {
      throw new Error('Cannot check more than 50 album IDs at once.');
    }

    const encodedIds = encodeURIComponent(albumIds.join(','));

    const response = (await axios.get(
      `https://api.spotify.com/v1/me/albums/contains?ids=${encodedIds}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: boolean[] };

    return response.data;
  } catch (error) {
    console.error('Error fetching saved albums data:', error);
    throw error;
  }
};
