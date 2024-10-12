import { SavedAlbumsResponseType } from '@config';
import { SavedAlbumModel } from '@models';

export const parseToSavedAlbums = (
  data: {
    album: SavedAlbumsResponseType['items'][0]['album'];
  }[]
): SavedAlbumModel[] =>
  data.map(({ album: { type, album_type, id, name, images, artists } }) => ({
    type: type,
    albumType: album_type,
    id: id,
    name: name,
    imageURL: images !== null ? images[0].url : '',
    artists: artists.map(({ name }) => name).join(', '),
  }));
