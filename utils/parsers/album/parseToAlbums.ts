import { AlbumsResponseType } from '@config';
import { AlbumModel } from '@models';

export const parseToAlbums = (data: AlbumsResponseType): AlbumModel[] =>
  data.items.map((item) => ({
    type: item.type,
    albumType: item.album_type,
    id: item.id,
    name: item.name,
    releaseDate: item.release_date.split('-')[0],
    images: item.images,
  }));
