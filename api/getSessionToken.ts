import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSessionToken = async (): Promise<{
  token: string | null;
  tokenExpiration: string | null;
}> => {
  try {
    const token = await AsyncStorage.getItem("session_token");
    const tokenExpiration = await AsyncStorage.getItem(
      "session_token_expiration"
    );

    return { token, tokenExpiration };
  } catch (error) {
    console.log(error);
    return { token: null, tokenExpiration: null };
  }
};
