import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, Pages } from '@config';
import { translations } from '@data';
import { hexToRGB } from '@utils';

import { styles } from './styles';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const renderPressableContent = (name: string, isActive: boolean) => {
  switch (name) {
    case Pages.SEARCH:
      return (
        <View style={styles.linkContainer}>
          <Ionicons
            style={[styles.icon, isActive ? styles.active : {}]}
            name="search"
            size={22}
          />
          <Text
            style={[styles.text, isActive ? styles.active : {}]}
            testID="search-text"
          >
            {translations.router[Pages.SEARCH]}
          </Text>
        </View>
      );
    case Pages.LIBRARY:
      return (
        <View style={styles.linkContainer}>
          <Ionicons
            style={[styles.icon, isActive ? styles.active : {}]}
            name="library"
            size={22}
          />
          <Text
            style={[styles.text, isActive ? styles.active : {}]}
            testID="library-text"
          >
            {translations.router[Pages.LIBRARY]}
          </Text>
        </View>
      );
    default:
      return (
        <View style={styles.linkContainer}>
          <AntDesign
            style={[styles.icon, isActive ? styles.active : {}]}
            name="home"
            size={22}
          />
          <Text
            style={[styles.text, isActive ? styles.active : {}]}
            testID="home-text"
          >
            {translations.router[Pages.HOME]}
          </Text>
        </View>
      );
  }
};

export const BottomNavigation = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[hexToRGB(COLORS.PRIMARY, 0.9), COLORS.PRIMARY]}
        style={styles.gradient}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isActive = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isActive ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
          >
            {renderPressableContent(route.name, isActive)}
          </Pressable>
        );
      })}
    </View>
  );
};
