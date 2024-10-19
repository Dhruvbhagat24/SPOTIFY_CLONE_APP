import axios from 'axios';

import { PlaylistItemResponseType } from '@config';

import { getSessionlessToken } from './getSessionlessToken';

export const getPlaylistItems = async ({
  playlistId,
  fields = 'items.track(id, name, artists(name), album.images(url), explicit)',
  limit,
  offset,
}: {
  playlistId: string;
  fields?: string;
  limit: number;
  offset: number;
}): Promise<PlaylistItemResponseType[]> => {
  try {
    const { token } = await getSessionlessToken();

    const response = (await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        params: {
          limit,
          offset,
          fields,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: { items: PlaylistItemResponseType[] } };

    return response.data.items;
  } catch (error) {
    console.error(`Error fetching playlist with an ID: ${playlistId}`, error);
    throw error;
  }
};
