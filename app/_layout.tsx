import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useFonts } from 'expo-font';

import { BottomNavigation } from '@components';

import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'SF-Regular': require('@assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-Semibold': require('@assets/fonts/SF-Pro-Display-Semibold.otf'),
    'SF-Thin': require('@assets/fonts/SF-Pro-Display-Thin.otf'),
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
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, animation: 'fade_from_bottom' }}
          />
          <Stack.Screen
            name="home"
            options={{ headerShown: false, animation: 'fade_from_bottom' }}
          />
          <Stack.Screen
            name="search"
            options={{ headerShown: false, animation: 'fade_from_bottom' }}
          />
          <Stack.Screen
            name="library"
            options={{ headerShown: false, animation: 'fade_from_bottom' }}
          />
          <Stack.Screen
            name="albums"
            options={{ headerShown: false, animation: 'default' }}
          />
          <Stack.Screen
            name="artists"
            options={{ headerShown: false, animation: 'default' }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
        <BottomNavigation />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: { flex: 1 },
});
