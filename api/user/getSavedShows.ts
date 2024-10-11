import axios from 'axios';

import { SavedEpisodesResponseType } from '@config';
import { parseFromSavedShowsToLibraryItem } from '@utils';
import { LibraryItemModel } from '@models';

import { getSessionToken } from './getSessionToken';
import { fileSystemMiddleware } from './fileSystemMiddleware';

export const fetchSavedShows = async (
  offset: number = 0,
  numberOfCalls: number = 0
): Promise<LibraryItemModel[]> => {
  try {
    const maxAllowedLimit = 50;
    const token = await getSessionToken();

    const response = (await axios.get(
      'https://api.spotify.com/v1/me/episodes',
      {
        params: {
          limit: maxAllowedLimit,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: SavedEpisodesResponseType };

    const { total } = response.data;
    const numberOfMaxCalls = Math.ceil(total / maxAllowedLimit) - 1;
    const result = parseFromSavedShowsToLibraryItem(response.data.items);
    if (total / maxAllowedLimit <= 1 || numberOfCalls >= numberOfMaxCalls) {
      return result;
    }

    numberOfCalls++;
    offset += maxAllowedLimit;
    const next = await fetchSavedShows(offset, numberOfCalls);

    return [...result, ...next];
  } catch (error) {
    console.error(
      `Error fetching saved albums of currently logged in user`,
      error
    );
    throw error;
  }
};

export const getSavedShows = async () =>
  await fileSystemMiddleware<LibraryItemModel[]>(
    'user_saved_shows',
    fetchSavedShows
  );
