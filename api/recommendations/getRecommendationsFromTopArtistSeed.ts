import { LibraryItemModel } from '@models';
import { getRecommendations } from './getRecommendations';
import { getUserTopArtistsAndGenres } from '../user';

export const getRecommendationsFromTopArtistSeed = async (): Promise<{
  recommendations: LibraryItemModel[];
  artist: LibraryItemModel;
}> => {
  try {
    const topArtistAndTopGenres = await getUserTopArtistsAndGenres();
    const artist = topArtistAndTopGenres.artists[0];
    const artistSeed = artist.id;

    return {
      recommendations: await getRecommendations({ artistSeed }),
      artist,
    };
  } catch (error) {
    console.error(
      `Error when fetching recommended tracks from top artist seeds`,
      error
    );
    throw error;
  }
};
