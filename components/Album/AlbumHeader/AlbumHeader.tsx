import * as React from 'react';
import { type ImageSourcePropType, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useNavigation } from 'expo-router';

import { AlbumBackground } from '../AlbumBackground';
import { MaterialIcons } from '@expo/vector-icons';

import { ALBUM_HEADER_HEIGHT, PLAYLIST_IMAGE_SIZE } from '@config';
import { styles } from './styles';

export type AlbumHeaderPropsType = {
  headerTitle: string;
  imageURL: string;
  fallbackImageSource: ImageSourcePropType;
  animatedValue: SharedValue<number>;
};

export const AlbumHeader = ({
  headerTitle,
  imageURL,
  fallbackImageSource,
  animatedValue,
}: AlbumHeaderPropsType) => {
  const navigation = useNavigation<AppNavigationProps>();
  const scrollYOnHeaderAppear =
    PLAYLIST_IMAGE_SIZE + PLAYLIST_IMAGE_SIZE * 0.05;

  const animatedHeaderStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedValue.value,
      [0, PLAYLIST_IMAGE_SIZE * 0.75, scrollYOnHeaderAppear],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const animatedHeaderTextStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedValue.value,
      [0, scrollYOnHeaderAppear - 5, scrollYOnHeaderAppear + 50],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateY: interpolate(
          animatedValue.value,
          [0, scrollYOnHeaderAppear - 5, scrollYOnHeaderAppear + 50],
          [10, 10, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const handlePress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View testID="header">
      <Pressable
        style={[
          styles.albumHeaderGoBackPressable,
          { top: useSafeAreaInsets().top },
        ]}
        onPress={handlePress}
        testID="header-go-back-pressable"
      >
        <MaterialIcons
          style={styles.albumHeaderGoBackIcon}
          name="keyboard-arrow-left"
        />
      </Pressable>

      <Animated.View
        style={[
          animatedHeaderStyles,
          { height: ALBUM_HEADER_HEIGHT, paddingTop: useSafeAreaInsets().top },
          styles.albumHeaderContent,
        ]}
      >
        <AlbumBackground
          fallbackImageSource={fallbackImageSource}
          imageURL={imageURL}
          darkness={0.4}
        />
        <Animated.Text
          style={[animatedHeaderTextStyles, styles.albumHeaderTitleText]}
          testID="header-title-text"
        >
          {headerTitle}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};
