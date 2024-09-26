import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useSegments } from "expo-router";
import { translations } from "@data";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BOTTOM_NAVIGATION_HEIGHT, PAGES } from "@config";

import { styles } from "./styles";
import { BackgroundGradient } from "../BackgroundGradient";

export const BottomNavigation = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const segments: string[] = useSegments();

  const isActive = (pageType: PAGES): boolean => segments[1] === pageType;

  return (
    <View style={styles.container}>
      <BackgroundGradient
        colors={["rgba(0, 0, 0, 0.85)", "rgba(0, 0, 0, 1)"]}
        styles={{ ...StyleSheet.absoluteFillObject }}
        height={BOTTOM_NAVIGATION_HEIGHT}
      />
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate(PAGES.HOME)}
      >
        <AntDesign
          style={[styles.icon, isActive(PAGES.HOME) ? styles.active : {}]}
          name="home"
          size={22}
        />
        <Text style={[styles.text, isActive(PAGES.HOME) ? styles.active : {}]}>
          {translations.navigation[PAGES.HOME]}
        </Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate(PAGES.SEARCH)}
      >
        <Ionicons
          style={[styles.icon, isActive(PAGES.SEARCH) ? styles.active : {}]}
          name="search"
          size={22}
        />
        <Text
          style={[styles.text, isActive(PAGES.SEARCH) ? styles.active : {}]}
        >
          {translations.navigation[PAGES.SEARCH]}
        </Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate(PAGES.LIBRARY)}
      >
        <Ionicons
          style={[styles.icon, isActive(PAGES.LIBRARY) ? styles.active : {}]}
          name="library"
          size={22}
        />
        <Text
          style={[styles.text, isActive(PAGES.LIBRARY) ? styles.active : {}]}
        >
          {translations.navigation[PAGES.LIBRARY]}
        </Text>
      </Pressable>
    </View>
  );
};
