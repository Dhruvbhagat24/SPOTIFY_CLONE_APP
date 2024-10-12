import { SavedPlaylistsResponseType } from '@config';
import { LibraryItemModel } from '@models';

export const parseFromSavedPlaylistsToLibraryItem = (
  data: SavedPlaylistsResponseType['items']
): LibraryItemModel[] =>
  data.map(({ id, type, name, owner: { display_name }, images }) => ({
    id: id,
    type: type,
    title: name,
    subtitle: display_name,
    imageURL: images !== null ? images[0].url : '',
  }));
