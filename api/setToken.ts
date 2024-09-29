import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

export const setToken = async (token: string, expiresIn: string) => {
  if (!Constants.expoConfig || !Constants.expoConfig.extra) {
    return null;
  }
  const { tokenKey, expirationKey } = Constants.expoConfig.extra;

  const expirationTime = new Date().getTime() + +expiresIn * 1000;
  await AsyncStorage.setItem(tokenKey, token);
  await AsyncStorage.setItem(expirationKey, expirationTime.toString());
};
