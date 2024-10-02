import axios from 'axios';
import { getToken } from './getToken';
import { UserProfileResponseType } from '@config';

export const getUserProfile = async (): Promise<UserProfileResponseType> => {
  try {
    const token = await getToken();
    const response = (await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as { data: UserProfileResponseType };
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching saved albums of currently logged in user`,
      error
    );
    throw error;
  }
};
