import * as React from "react";
import { Stack } from "expo-router";

import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { BottomNavigation } from "@components";

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <Stack>
          <Stack.Screen name="[id]" options={{ headerShown: false }} />
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
