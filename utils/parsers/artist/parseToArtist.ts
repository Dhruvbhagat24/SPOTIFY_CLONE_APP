import { ArtistResponseType } from '@config';
import { ArtistModel } from '@models';

export const parseToArtist = ({
  type,
  id,
  images,
  name,
}: ArtistResponseType): ArtistModel => ({
  type: type,
  id: id,
  imageURL: images !== null ? images[0].url : '',
  name: name,
});
