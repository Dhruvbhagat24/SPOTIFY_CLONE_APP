import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import { CategoryPressable } from './CategoryPressable';
import * as Icons from '@expo/vector-icons';

import { UserProfileModel } from '@models';
import { Categories, LIBRARY_HEADER_HEIGHT } from '@config';
import { translations } from '@data';
import { getUserProfile } from '@api';

import { styles } from './styles';

export const LibraryHeader = () => {
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
          {Object.values(Categories).map((currentCategory) => (
            <CategoryPressable
              key={currentCategory}
              id={currentCategory}
              text={translations.type[currentCategory]}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
