import axios from 'axios';

import { PlaylistModel } from '@models';
import { PlaylistResponseType } from '@config';
import { parseToPlaylist } from '@utils';

import { getSessionlessToken } from './getSessionlessToken';

export const getPlaylist = async (
  playlistId: string
): Promise<PlaylistModel> => {
  try {
    const { token } = await getSessionlessToken();

    const response = (await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: PlaylistResponseType };

    return parseToPlaylist(response.data);
  } catch (error) {
    console.error(`Error fetching playlist with an ID: ${playlistId}`, error);
    throw error;
  }
};
