import * as React from 'react';
import { Button, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from 'expo-auth-session';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';

import { setToken } from '@api';
import { AuthResponse, COLORS, ExpoConfigType } from '@config';

export const LoginScreen = () => {
  const router = useRouter();
  const { top: statusBarOffset } = useSafeAreaInsets();

  const { clientID, authorizationEndpoint, tokenEndpoint } = (
    Constants.expoConfig as ExpoConfigType
  ).extra;

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientID as string,
      scopes: [
        'user-library-read',
        'user-read-private',
        'user-read-email',
        'user-follow-read',
        'playlist-read-private',
      ],
      responseType: ResponseType.Token,
      redirectUri: makeRedirectUri(),
    },
    {
      authorizationEndpoint: authorizationEndpoint as string,
      tokenEndpoint: tokenEndpoint as string,
    }
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token, refresh_token, expires_in } = response.params;
      setToken(access_token, refresh_token, expires_in);
    }
  }, [response]);

  const handlePress = async () => {
    try {
      const response = await promptAsync();

      if (response.type !== AuthResponse.SUCCESS) {
        return;
      }

      router.replace('/home');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        paddingTop: statusBarOffset,
        backgroundColor: COLORS.PRIMARY,
        height: '100%',
      }}
    >
      <Button
        title="Log in with Spotify"
        onPress={handlePress}
        disabled={!request}
      />
    </View>
  );
};
