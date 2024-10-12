import { LibraryItemModel } from '@models';

import { fileSystemMiddleware } from './fileSystemMiddleware';
import { fetchUserFollowedArtists } from './getUserFollowedArtists';
import { fetchSavedAlbums } from './getSavedAlbums';
import { fetchSavedShows } from './getSavedShows';
import { Categories } from '@config';
import { fetchSavedPlaylists } from './getSavedPlaylists';

export type LibraryType = {
  [Categories.FOLLOWED_ARTISTS]: LibraryItemModel[];
  [Categories.SAVED_ALBUMS]: LibraryItemModel[];
  [Categories.SAVED_PODCASTS]: LibraryItemModel[];
  [Categories.SAVED_PLAYLISTS]: LibraryItemModel[];
  [Categories.DOWNLOADED]: LibraryItemModel[];
  [Categories.ALL]: LibraryItemModel[];
};

export const getAllLibrarySections = async (): Promise<LibraryType> => {
  try {
    const [followedArtists, savedAlbums, savedShows, savedPlaylists] =
      await Promise.all([
        await fetchUserFollowedArtists(),
        await fetchSavedAlbums(),
        await fetchSavedShows(),
        await fetchSavedPlaylists(),
      ]);

    return {
      [Categories.FOLLOWED_ARTISTS]: followedArtists,
      [Categories.SAVED_ALBUMS]: savedAlbums,
      [Categories.SAVED_PODCASTS]: savedShows,
      [Categories.SAVED_PLAYLISTS]: savedPlaylists,
      [Categories.DOWNLOADED]: savedShows,
      [Categories.ALL]: [
        ...savedPlaylists,
        ...followedArtists,
        ...savedAlbums,
        ...savedShows,
      ],
    };
  } catch (error) {
    console.error(`Error fetching all library sections`, error);
    throw error;
  }
};

export const getLibrary = async () =>
  await fileSystemMiddleware<LibraryType>(
    'user_library',
    getAllLibrarySections
  );
