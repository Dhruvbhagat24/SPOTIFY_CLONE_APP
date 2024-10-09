import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@config';

import { styles } from './styles';

export type LoginPropsType = {
  handlePress: () => void;
  isPressableDisabled: boolean;
};

export const Login = ({ isPressableDisabled, handlePress }: LoginPropsType) => {
  const progress = useSharedValue(0);
  const { top: statusBarOffset } = useSafeAreaInsets();

  const animatedPressableStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.TINT, COLORS.LIGHTER_GREY]
    ),
  }));

  const animatedTextStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.SECONDARY, COLORS.PRIMARY]
    ),
  }));

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedText = Animated.createAnimatedComponent(Text);

  return (
    <View style={[styles.container, { paddingTop: statusBarOffset }]}>
      <AnimatedPressable
        onPressIn={() => {
          progress.value = withTiming(1, { duration: 250 });
        }}
        onPressOut={() => {
          progress.value = withTiming(0, { duration: 250 });
        }}
        onPress={handlePress}
        disabled={isPressableDisabled}
        style={[styles.pressable, animatedPressableStyles]}
      >
        <AnimatedText style={[styles.text, animatedTextStyles]}>
          Log in with Spotify
        </AnimatedText>
      </AnimatedPressable>

      <View style={styles.content}>
        <Text style={styles.description}>
          In order to interact with the app you need to log in trough your
          spotify account
        </Text>

        <Text style={[styles.description, styles.bold]}>
          NOTE: no need to share your credentials 😃
        </Text>

        <Text style={styles.description}>
          Just tap on the button and confirm that you are a spotify user!
        </Text>
      </View>
    </View>
  );
};
