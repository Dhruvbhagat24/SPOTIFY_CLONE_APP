import { ArtistAlbumsResponseType } from '@config';
import { ArtistAlbumModel } from '@models';

export const parseToArtistAlbums = (
  data: ArtistAlbumsResponseType
): ArtistAlbumModel[] =>
  data.items.map((item) => ({
    type: item.type,
    albumType: item.album_type,
    id: item.id,
    name: item.name,
    releaseDate: item.release_date.split('-')[0],
    images: item.images,
  }));
