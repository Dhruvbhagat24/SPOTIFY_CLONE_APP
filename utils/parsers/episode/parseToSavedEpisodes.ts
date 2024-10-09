import {
  LIBRARY_ALBUM_IMAGE_SIZE_VARIANT,
  SavedEpisodesResponseType,
} from '@config';
import { SavedEpisodeModel } from '@models';

export const parseToSavedEpisodes = (
  data: {
    episode: SavedEpisodesResponseType['items'][0]['episode'];
  }[]
): SavedEpisodeModel[] =>
  data.map(({ episode: { id, type, name, images, release_date } }) => ({
    id: id,
    type: type,
    name: name,
    imageURL: images[LIBRARY_ALBUM_IMAGE_SIZE_VARIANT].url,
    releaseDate: release_date,
  }));
