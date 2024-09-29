import Constants from 'expo-constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getSessionToken } from './getSessionToken';

export const auth = async (): Promise<{
  token: string | null;
  tokenExpiration: string | null;
}> => {
  try {
    const { token, tokenExpiration } = await getSessionToken();

    if (token && tokenExpiration && new Date(tokenExpiration) >= new Date()) {
      return { token, tokenExpiration };
    }

    if (!Constants.expoConfig || !Constants.expoConfig.extra) {
      throw Error("Failed to read 'Constants.expoConfig.extra' variable");
    }

    const { clientID, clientSecret } = Constants.expoConfig.extra;

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientID,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const newToken = response.data.access_token;

    if (!newToken) {
      throw new Error('Failed to authenticate with Spotify.');
    }

    const date = new Date();
    date.setHours(date.getHours() + 1);

    await AsyncStorage.setItem('session_token', newToken);
    await AsyncStorage.setItem('session_token_expiration', date.toString());

    return { token: newToken, tokenExpiration: date.toString() };
  } catch (error) {
    console.error('Error authenticating with Spotify:', error);
    return { token: null, tokenExpiration: null };
  }
};
