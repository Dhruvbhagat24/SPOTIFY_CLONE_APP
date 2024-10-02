import {
  LIBRARY_ALBUM_IMAGE_SIZE_VARIANT,
  SavedAlbumsResponseType,
} from '@config';
import { SavedAlbumModel } from '@models';

export const parseToSavedAlbums = (
  data: SavedAlbumsResponseType
): SavedAlbumModel[] =>
  data.items.map(({ album }) => ({
    type: album.type,
    albumType: album.album_type,
    id: album.id,
    name: album.name,
    image: album.images[LIBRARY_ALBUM_IMAGE_SIZE_VARIANT],
    artists: album.artists.map((artist) => artist.name).join(', '),
  }));
