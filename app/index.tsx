import * as React from 'react';
import { Redirect } from 'expo-router';

import { LoginScreen } from '@screens';
import { getSessionToken } from '@api';

export default function App() {
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const storedToken = await getSessionToken();
      setToken(storedToken);
    })();
  }, [token]);

  if (token) {
    return <Redirect href={{ pathname: '/library', params: {} }} />;
  }

  return <LoginScreen />;
}
