import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Icons from '@expo/vector-icons';

import { CATEGORIES, LIBRARY_HEADER_HEIGHT } from '@config';
import { styles } from './styles';
import { translations } from '@data';
import { ScrollView } from 'react-native-gesture-handler';

export type YourLibraryHeaderPropsType = {
  headerTitle: string;
  imageURL: string;
  categories: CATEGORIES[];
};

export const YourLibraryHeader = ({
  headerTitle,
  imageURL,
  categories,
}: YourLibraryHeaderPropsType) => {
  const { top: statusBarOffset } = useSafeAreaInsets();

  const handlePress = () => {
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
        <Pressable style={styles.profile} onPress={handlePress}>
          <Image style={styles.profileImage} source={{ uri: imageURL }} />
        </Pressable>
        <Text style={styles.titleText}>{headerTitle}</Text>
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
          {categories.map((category) => (
            <Pressable key={category} style={styles.category}>
              <Text style={styles.categoryText}>
                {translations.type[category]}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
