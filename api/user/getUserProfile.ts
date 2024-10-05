import axios from 'axios';
import { getSessionToken } from './getSessionToken';
import { UserProfileResponseType } from '@config';
import { parseToUserProfile } from '@utils';
import { UserProfileModel } from '@models';

export const getUserProfile = async (): Promise<UserProfileModel> => {
  try {
    const token = await getSessionToken();
    const response = (await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as { data: UserProfileResponseType };

    return parseToUserProfile(response.data);
  } catch (error) {
    console.error(
      `Error fetching saved albums of currently logged in user`,
      error
    );
    throw error;
  }
};
