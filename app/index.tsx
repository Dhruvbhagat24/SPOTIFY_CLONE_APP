import * as React from "react";
import { Redirect } from "expo-router";
// import { LoginScreen } from "@screens";

// // eslint-disable-next-line import/no-unresolved
// import { auth } from "@api";

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [shouldShowLoginScreen, setShouldShowLoginScreen] =
  //   React.useState(true);

  // React.useEffect(() => {
  //   (async () => {
  //     const { token, tokenExpiration } = await auth();

  //     if (token && tokenExpiration && new Date(tokenExpiration) >= new Date()) {
  //       setShouldShowLoginScreen(false);
  //     }
  //   })();
  // }, []);

  // if (!shouldShowLoginScreen) {
  //   return <Redirect href="/(tabs)" />;
  // }

  // if (isLoggedIn) {
  //   return <Redirect href="/(tabs)" />;
  // }

  // return <LoginScreen setIsLoggedIn={setIsLoggedIn} />;

  return <Redirect href="/(tabs)" />;
}
