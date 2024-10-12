import { AlbumsResponseType } from '@config';
import { AlbumModel } from '@models';

export const parseToAlbums = (data: AlbumsResponseType): AlbumModel[] =>
  data.items.map(({ type, album_type, id, name, release_date, images }) => ({
    type: type,
    albumType: album_type,
    id: id,
    name: name,
    releaseDate: release_date.split('-')[0],
    imageURL: images !== null ? images[0].url : '',
  }));
