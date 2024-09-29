import * as React from 'react';
import { Button, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from 'expo-auth-session';
import Constants from 'expo-constants';

import { setToken } from '@api';
import { COLORS } from '@config';

export const LoginScreen = () => {
  const { top: statusBarOffset } = useSafeAreaInsets();

  if (!Constants.expoConfig || !Constants.expoConfig.extra) {
    return null;
  }

  const { clientID, authorizationEndpoint, tokenEndpoint } =
    Constants.expoConfig.extra;

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientID as string,
      scopes: ['user-library-read', 'playlist-read-private'],
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
      const { access_token, expires_in } = response.params;
      setToken(access_token, expires_in);
    }
  }, [response, Constants, Constants.expoConfig, Constants.expoConfig.extra]);

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
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  );
};
