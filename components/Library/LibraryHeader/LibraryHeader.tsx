import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryPressable } from './CategoryPressable';
import * as Icons from '@expo/vector-icons';

import { useUserData } from '@context';
import { Categories, LIBRARY_HEADER_HEIGHT } from '@config';
import { translations } from '@data';

import { styles } from './styles';

export const LibraryHeader = () => {
  const { top: statusBarOffset } = useSafeAreaInsets();
  const { userData } = useUserData();

  const handleProfilePress = () => {
    // TODO: open menu logic
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: statusBarOffset,
          height: LIBRARY_HEADER_HEIGHT + statusBarOffset,
        },
      ]}
    >
      <View style={styles.content}>
        <Pressable style={styles.profile} onPress={handleProfilePress}>
          <Image
            style={styles.profileImage}
            source={{ uri: userData.imageURL }}
          />
        </Pressable>
        <Text style={styles.titleText}>{translations.router.library}</Text>
        <Pressable>
          <Icons.Ionicons style={styles.icon} name="search" />
        </Pressable>
        <Pressable>
          <Icons.AntDesign style={styles.icon} name="plus" />
        </Pressable>
      </View>
      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.scrollViewContainer}>
          {Object.values(Categories)
            .filter((c) => c !== Categories.ALL)
            .map((currentCategory) => (
              <CategoryPressable
                key={currentCategory}
                currentCategory={currentCategory}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
