import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useNavigation } from 'expo-router';

import { PlaylistBackground } from '../PlaylistBackground';
import { MaterialIcons } from '@expo/vector-icons';

import { ALBUM_HEADER_HEIGHT, PLAYLIST_IMAGE_SIZE } from '@config';
import { styles } from './styles';

export type PlaylistHeaderPropsType = {
  headerTitle: string;
  imageURL: string;
  animatedValue: SharedValue<number>;
};

export const PlaylistHeader = ({
  headerTitle,
  imageURL,
  animatedValue,
}: PlaylistHeaderPropsType) => {
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

  return (
    <View testID="header">
      <Pressable
        style={[
          styles.albumHeaderGoBackPressable,
          { top: useSafeAreaInsets().top },
        ]}
        onPress={() => navigation.goBack()}
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
        <PlaylistBackground url={imageURL} darkness={0.4} />
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
