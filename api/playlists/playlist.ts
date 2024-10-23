import axios from 'axios';

import { PlaylistModel, TrackModel } from '@models';
import { PlaylistItemResponseType, PlaylistResponseType } from '@config';
import { parseFromPlaylistItemsToTracks, parseToPlaylist } from '@utils';

import { getSessionlessToken } from '../utils';

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
}): Promise<TrackModel[]> => {
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
    )) as { data: { items: PlaylistItemResponseType[]; total: number } };

    return parseFromPlaylistItemsToTracks(response.data.items);
  } catch (error) {
    console.error(`Error fetching playlist with an ID: ${playlistId}`, error);
    throw error;
  }
};
