import { AlbumsResponseType, SEPARATOR } from '@config';
import { translations } from '@data';
import { LibraryItemModel } from '@models';

export const parseToAlbums = (data: AlbumsResponseType): LibraryItemModel[] =>
  data.items.map(({ type, album_type, id, name, release_date, images }) => ({
    id: id,
    type: type,
    title: name,
    subtitle: `${release_date.split('-')[0]} ${SEPARATOR} ${translations.type[album_type]}`,
    imageURL: images !== null ? images[0].url : '',
  }));
