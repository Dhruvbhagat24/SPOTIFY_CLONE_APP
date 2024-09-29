import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter, useSegments } from 'expo-router';

import { BackgroundGradient } from '../BackgroundGradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BOTTOM_NAVIGATION_HEIGHT, COLORS, PAGES } from '@config';
import { translations } from '@data';
import { hexToRGB } from '@utils';

import { styles } from './styles';

export const BottomNavigation = () => {
  const router = useRouter();
  const segments: string[] = useSegments();

  const isActive = (pageType: PAGES): boolean => segments[0] === pageType;

  return (
    <View style={styles.container}>
      <BackgroundGradient
        colors={[hexToRGB(COLORS.PRIMARY, 0.85), COLORS.PRIMARY]}
        styles={{ ...StyleSheet.absoluteFillObject }}
        height={BOTTOM_NAVIGATION_HEIGHT}
      />
      <Pressable
        style={styles.pressable}
        onPress={() => router.replace(PAGES.HOME)}
        testID="home-pressable"
      >
        <AntDesign
          style={[styles.icon, isActive(PAGES.HOME) ? styles.active : {}]}
          name="home"
          size={22}
        />
        <Text
          style={[styles.text, isActive(PAGES.HOME) ? styles.active : {}]}
          testID="home-text"
        >
          {translations.router[PAGES.HOME]}
        </Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => router.replace(PAGES.SEARCH)}
        testID="search-pressable"
      >
        <Ionicons
          style={[styles.icon, isActive(PAGES.SEARCH) ? styles.active : {}]}
          name="search"
          size={22}
        />
        <Text
          style={[styles.text, isActive(PAGES.SEARCH) ? styles.active : {}]}
          testID="search-text"
        >
          {translations.router[PAGES.SEARCH]}
        </Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => router.replace(PAGES.LIBRARY)}
        testID="library-pressable"
      >
        <Ionicons
          style={[styles.icon, isActive(PAGES.LIBRARY) ? styles.active : {}]}
          name="library"
          size={22}
        />
        <Text
          style={[styles.text, isActive(PAGES.LIBRARY) ? styles.active : {}]}
          testID="library-text"
        >
          {translations.router[PAGES.LIBRARY]}
        </Text>
      </Pressable>
    </View>
  );
};
