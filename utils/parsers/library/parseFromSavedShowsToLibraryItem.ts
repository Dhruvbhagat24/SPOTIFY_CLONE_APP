import { LibraryItemModel } from '@models';
import {
  LIBRARY_ALBUM_IMAGE_SIZE_VARIANT,
  SavedEpisodesResponseType,
} from '@config';
import { translations } from '@data';
import { getDisplayDate } from '../../common';

export const parseFromSavedShowsToLibraryItem = (
  data: {
    episode: SavedEpisodesResponseType['items'][0]['episode'];
  }[]
): LibraryItemModel[] =>
  data.map(
    ({
      episode: {
        release_date,
        show: { type, id, name, images },
      },
    }) => ({
      type: type,
      id: id,
      title: name,
      subtitle: translations.released + getDisplayDate(release_date),
      imageURL: images[LIBRARY_ALBUM_IMAGE_SIZE_VARIANT].url,
    })
  );
