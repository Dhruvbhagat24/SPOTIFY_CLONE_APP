import { USER_PROFILE_SIZE_VARIANT, UserProfileResponseType } from '@config';
import { UserProfileModel } from '@models';

export const parseToUserProfile = (
  data: UserProfileResponseType
): UserProfileModel => ({
  id: data.id,
  type: data.type as UserProfileModel['type'],
  displayName: data.display_name,
  imageURL: data.images[USER_PROFILE_SIZE_VARIANT].url,
});
