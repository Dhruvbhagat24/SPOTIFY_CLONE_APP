import * as React from 'react';
import { Text, View } from 'react-native';
import { useSegments, Link } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, Pages } from '@config';
import { translations } from '@data';
import { hexToRGB } from '@utils';

import { styles } from './styles';

export const BottomNavigation = () => {
  const segments: string[] = useSegments();

  if (!segments.length) {
    return null;
  }

  const isActive = (pageType: Pages): boolean => segments[0] === pageType;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[hexToRGB(COLORS.PRIMARY, 0.9), COLORS.PRIMARY]}
        style={styles.gradient}
      />
      <Link href={`/${Pages.HOME}`} testID="home-pressable">
        <View style={styles.linkContainer}>
          <AntDesign
            style={[styles.icon, isActive(Pages.HOME) ? styles.active : {}]}
            name="home"
            size={22}
          />
          <Text
            style={[styles.text, isActive(Pages.HOME) ? styles.active : {}]}
            testID="home-text"
          >
            {translations.router[Pages.HOME]}
          </Text>
        </View>
      </Link>
      <Link href={`/${Pages.SEARCH}`} testID="search-pressable">
        <View style={styles.linkContainer}>
          <Ionicons
            style={[styles.icon, isActive(Pages.SEARCH) ? styles.active : {}]}
            name="search"
            size={22}
          />
          <Text
            style={[styles.text, isActive(Pages.SEARCH) ? styles.active : {}]}
            testID="search-text"
          >
            {translations.router[Pages.SEARCH]}
          </Text>
        </View>
      </Link>
      <Link href={`/${Pages.LIBRARY}`} testID="library-pressable">
        <View style={styles.linkContainer}>
          <Ionicons
            style={[styles.icon, isActive(Pages.LIBRARY) ? styles.active : {}]}
            name="library"
            size={22}
          />
          <Text
            style={[styles.text, isActive(Pages.LIBRARY) ? styles.active : {}]}
            testID="library-text"
          >
            {translations.router[Pages.LIBRARY]}
          </Text>
        </View>
      </Link>
    </View>
  );
};
