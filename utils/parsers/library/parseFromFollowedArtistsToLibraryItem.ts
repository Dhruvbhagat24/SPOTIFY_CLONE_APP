import { UserFollowedArtistsResponseType } from '@config';
import { LibraryItemModel } from '@models';

export const parseFromFollowedArtistsToLibraryItem = (
  data: UserFollowedArtistsResponseType['artists']['items']
): LibraryItemModel[] =>
  data.map(({ id, type, name, images }) => ({
    id: id,
    type: type,
    title: name,
    subtitle: '',
    imageURL: images !== null ? images[0].url : '',
  }));
