import * as React from "react";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SF-Regular": require("@assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Semibold": require("@assets/fonts/SF-Pro-Display-Semibold.otf"),
    "SF-Thin": require("@assets/fonts/SF-Pro-Display-Thin.otf"),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="albums" options={{ headerShown: false }} />
    </Stack>
  );
}
