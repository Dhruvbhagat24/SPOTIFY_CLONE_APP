import {
  LIBRARY_ALBUM_IMAGE_SIZE_VARIANT,
  SavedEpisodesResponseType,
} from '@config';
import { SavedShowModel } from '@models';

export const parseToSavedShows = (
  data: {
    episode: SavedEpisodesResponseType['items'][0]['episode'];
  }[]
): SavedShowModel[] =>
  data.map(({ episode }) => ({
    type: episode.show.type,
    id: episode.show.id,
    name: episode.show.name,
    imageURL: episode.show.images[LIBRARY_ALBUM_IMAGE_SIZE_VARIANT].url,
    releaseDate: episode.release_date,
  }));
