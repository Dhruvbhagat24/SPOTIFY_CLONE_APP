import {
  LIBRARY_ALBUM_IMAGE_SIZE_VARIANT,
  SavedAlbumsResponseType,
} from '@config';
import { SavedAlbumModel } from '@models';

export const parseToSavedAlbums = (
  data: {
    album: SavedAlbumsResponseType['items'][0]['album'];
  }[]
): SavedAlbumModel[] =>
  data.map(({ album }) => ({
    type: album.type,
    albumType: album.album_type,
    id: album.id,
    name: album.name,
    imageURL: album.images[LIBRARY_ALBUM_IMAGE_SIZE_VARIANT].url,
    artists: album.artists.map((artist) => artist.name).join(', '),
  }));
