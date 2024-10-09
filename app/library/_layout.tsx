import React from 'react';
import { Stack } from 'expo-router';
import { LibraryScreen } from '@screens';

export default function Layout() {
  return (
    <LibraryScreen>
      <Stack screenOptions={{ headerShown: false, headerShadowVisible: false }}>
        <Stack.Screen
          name="saved-playlists"
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen
          name="saved-albums"
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen
          name="followed-artists"
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen
          name="saved-podcasts"
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen
          name="downloaded"
          options={{ headerShown: false, animation: 'fade' }}
        />
      </Stack>
    </LibraryScreen>
  );
}
