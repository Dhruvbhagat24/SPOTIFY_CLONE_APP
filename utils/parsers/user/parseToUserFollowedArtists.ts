import { ArtistResponseType } from '@config';
import { ArtistModel } from '@models';

export const parseToUserFollowedArtists = (
  data: ArtistResponseType[]
): ArtistModel[] =>
  data.map(({ type, id, name, images }) => ({
    type: type,
    id: id,
    name: name,
    imageURL: images !== null ? images[0].url : '',
  }));
