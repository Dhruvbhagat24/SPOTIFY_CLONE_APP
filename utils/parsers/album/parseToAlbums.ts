import { ALBUM_IMAGE_SIZE_VARIANT, AlbumsResponseType } from '@config';
import { AlbumModel } from '@models';

export const parseToAlbums = (data: AlbumsResponseType): AlbumModel[] =>
  data.items.map((item) => ({
    type: item.type,
    albumType: item.album_type,
    id: item.id,
    name: item.name,
    releaseDate: item.release_date.split('-')[0],
    imageURL: item.images[ALBUM_IMAGE_SIZE_VARIANT].url,
  }));
