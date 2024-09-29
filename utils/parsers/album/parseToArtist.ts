import { ArtistResponseType } from '@globalTypes';
import { ArtistModel } from '@models';

export const parseToArtist = (data: ArtistResponseType): ArtistModel => ({
  type: data.type,
  id: data.id,
  followers: data.followers,
  genres: data.genres,
  images: data.images,
  name: data.name,
  popularity: 85,
});
