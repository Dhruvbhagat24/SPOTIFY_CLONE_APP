import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorageMiddleware = async <T>(
  storageKey: string,
  fallbackFetch: () => Promise<T>
): Promise<T> => {
  try {
    const savedAlbums = await AsyncStorage.getItem(storageKey);

    if (savedAlbums) {
      return JSON.parse(savedAlbums);
    }

    const fetchedSavedAlbums = await fallbackFetch();
    await AsyncStorage.setItem(storageKey, JSON.stringify(fetchedSavedAlbums));
    return fetchedSavedAlbums;
  } catch (error) {
    console.error(`Error in AsyncStorage while accessing ${storageKey}`, error);
    throw error;
  }
};
