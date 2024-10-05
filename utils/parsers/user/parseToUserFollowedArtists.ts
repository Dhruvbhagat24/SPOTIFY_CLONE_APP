import { ALBUM_IMAGE_SIZE_VARIANT, ArtistResponseType } from '@config';
import { ArtistModel } from '@models';

export const parseToUserFollowedArtists = (
  data: ArtistResponseType[]
): ArtistModel[] =>
  data.map((item) => ({
    type: item.type,
    id: item.id,
    name: item.name,
    imageURL: item.images[ALBUM_IMAGE_SIZE_VARIANT].url,
  }));
