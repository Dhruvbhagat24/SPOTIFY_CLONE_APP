import { SavedEpisodesResponseType } from '@config';
import { SavedShowModel } from '@models';

export const parseToSavedShows = (
  data: {
    episode: SavedEpisodesResponseType['items'][0]['episode'];
  }[]
): SavedShowModel[] =>
  data.map(
    ({
      episode: {
        show: { type, id, name, images },
        release_date,
      },
    }) => ({
      type: type,
      id: id,
      name: name,
      imageURL: images !== null ? images[0].url : '',
      releaseDate: release_date,
    })
  );
