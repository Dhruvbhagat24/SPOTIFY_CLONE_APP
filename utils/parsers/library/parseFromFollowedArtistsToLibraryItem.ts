import { ALBUM_ARTIST_IMAGE_SIZE_VARIANT, ArtistResponseType } from '@config';
import { LibraryItemModel } from '@models';

export const parseFromFollowedArtistsToLibraryItem = (
  data: ArtistResponseType[]
): LibraryItemModel[] =>
  data.map(({ id, type, name, images }) => ({
    id: id,
    type: type,
    title: name,
    subtitle: '',
    imageURL: images[ALBUM_ARTIST_IMAGE_SIZE_VARIANT].url,
  }));
