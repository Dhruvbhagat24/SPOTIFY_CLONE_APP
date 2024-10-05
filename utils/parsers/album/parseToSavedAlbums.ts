import { AlbumResponseType, LIBRARY_ALBUM_IMAGE_SIZE_VARIANT } from '@config';
import { SavedAlbumModel } from '@models';

export const parseToSavedAlbums = (
  data: {
    album: AlbumResponseType;
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
