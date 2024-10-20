import axios from 'axios';
import { getSessionToken } from './getSessionToken';

export const checkSavedPlaylists = async (
  playlistIds: string[]
): Promise<boolean[]> => {
  try {
    const token = await getSessionToken();

    if (playlistIds.length > 50) {
      throw new Error('Cannot check more than 50 playlist IDs at once.');
    }

    const encodedIds = encodeURIComponent(playlistIds.join(','));

    const response = (await axios.get(
      `https://api.spotify.com/v1/playlists/${encodedIds}/followers/contains`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: boolean[] };

    return response.data;
  } catch (error) {
    console.error('Error fetching saved playlists data:', error);
    throw error;
  }
};
