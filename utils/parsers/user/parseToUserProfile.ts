import { UserProfileResponseType } from '@config';
import { UserProfileModel } from '@models';

export const parseToUserProfile = ({
  id,
  type,
  display_name,
  images,
}: UserProfileResponseType): UserProfileModel => ({
  id: id,
  type: type as UserProfileModel['type'],
  displayName: display_name,
  imageURL: images && images[0] && images[0].url ? images[0].url : '',
});
