import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { ScrollView } from 'react-native-gesture-handler';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryPressable } from './CategoryPressable';
import * as Icons from '@expo/vector-icons';

import { UserProfileModel } from '@models';
import { Categories, LIBRARY_HEADER_HEIGHT } from '@config';
import { translations } from '@data';
import { getUserProfile } from '@api';

import { styles } from './styles';

export type LibraryHeaderPropsType = {
  category: Categories | '';
  handleCategoryChange: (newCategory: Categories) => void;
};

export const LibraryHeader = ({
  category,
  handleCategoryChange,
}: LibraryHeaderPropsType) => {
  const [data, setData] = React.useState<UserProfileModel | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);
  const { top: statusBarOffset } = useSafeAreaInsets();

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const userProfile = await getUserProfile();
        setData(userProfile);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setData(null);
        console.error('ERROR: ', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
          {isLoading && <Text>Loading</Text>}
          {isError && <Text>Error</Text>}
          {!isLoading && !isError && data && (
            <Image
              style={styles.profileImage}
              source={{ uri: data.imageURL }}
            />
          )}
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
                isActive={currentCategory === category}
                handlePress={() => handleCategoryChange(currentCategory)}
                text={translations.libraryCategories[currentCategory]}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
