import axios from 'axios';

import { PlaylistModel } from '@models';
import { AlbumResponseType } from '@config';
import { parseToPlaylist } from '@utils';

import { getSessionlessToken } from './getSessionlessToken';

export const getAlbum = async (albumId: string): Promise<PlaylistModel> => {
  try {
    const { token } = await getSessionlessToken();

    const response = (await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: AlbumResponseType };

    return parseToPlaylist(response.data);
  } catch (error) {
    console.error(`Error fetching album with an ID: ${albumId}`, error);
    throw error;
  }
};
