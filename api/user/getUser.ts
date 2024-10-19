import axios from 'axios';

import { UserModel } from '@models';
import { UserResponseType } from '@config';
import { parseToUser } from '@utils';

import { fileSystemMiddleware } from '../fileSystemMiddleware';
import { getSessionToken } from './getSessionToken';

export const fetchUser = async (): Promise<UserModel> => {
  try {
    const token = await getSessionToken();
    const response = (await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as { data: UserResponseType };

    return parseToUser(response.data);
  } catch (error) {
    console.error(
      `Error fetching saved albums of currently logged in user`,
      error
    );
    throw error;
  }
};

export const getUser = async () =>
  await fileSystemMiddleware<UserModel>('user_profile', fetchUser);
