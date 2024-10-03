import {
  ALBUM_IMAGE_SIZE_VARIANT,
  UserFollowedArtistsResponseType,
} from '@config';
import { ArtistModel } from '@models';

export const parseToUserFollowedArtists = (
  data: UserFollowedArtistsResponseType[]
): ArtistModel[] =>
  data
    .map((chunk) =>
      chunk.artists.items.map((item) => ({
        type: item.type,
        id: item.id,
        name: item.name,
        imageURL: item.images[ALBUM_IMAGE_SIZE_VARIANT].url,
      }))
    )
    .reduce((prev, next) => prev.concat(next));
