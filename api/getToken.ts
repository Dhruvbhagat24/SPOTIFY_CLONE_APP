import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

export const getToken = async (): Promise<string | null> => {
  if (!Constants.expoConfig || !Constants.expoConfig.extra) {
    return null;
  }
  const { tokenKey, expirationKey } = Constants.expoConfig.extra;

  const storedToken = await AsyncStorage.getItem(tokenKey);
  const expirationTime = await AsyncStorage.getItem(expirationKey);
  const currentTime = new Date().getTime();

  if (storedToken && expirationTime && currentTime < Number(expirationTime)) {
    return storedToken;
  }

  await AsyncStorage.removeItem(tokenKey);
  await AsyncStorage.removeItem(expirationKey);
  return null;
};
