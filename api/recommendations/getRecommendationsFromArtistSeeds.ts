import { LibraryItemModel } from '@models';
import { getRecommendations } from './getRecommendations';
import { getUserTopArtistsAndGenres } from '../user';

export const getRecommendationsFromArtistSeeds = async (): Promise<
  LibraryItemModel[]
> => {
  try {
    const artistSeed = (await getUserTopArtistsAndGenres()).artists
      .map((item) => item.id)
      .splice(0, 5)
      .join(',');

    return await getRecommendations({ artistSeed });
  } catch (error) {
    console.error(
      `Error when fetching recommended tracks from artists seeds`,
      error
    );
    throw error;
  }
};
