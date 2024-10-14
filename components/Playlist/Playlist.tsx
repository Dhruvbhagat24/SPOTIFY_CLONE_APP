import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import { BackgroundGradient as BackgroundOverlay } from '../BackgroundGradient';
import { Background } from '../Background';
import { Cover } from '../Cover';
import { CommonHeader } from '../CommonHeader';
import { Tracks } from '../Tracks';
import { Summary } from '../Summary';
import { EmptySection } from '../EmptySection';

import { PlaylistModel } from '@models';
import { useApplicationDimensions } from '@hooks';
import { BOTTOM_NAVIGATION_HEIGHT, COLORS } from '@config';

import { styles } from './styles';

export type PlaylistPropsType = {
  playlist: PlaylistModel;
};

export const Playlist = ({ playlist }: PlaylistPropsType) => {
  const { width, height } = useApplicationDimensions();
  const { top: statusBarOffset } = useSafeAreaInsets();

  const imageHeight = 300;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const progress = useSharedValue(Number(!!playlist.id));

  const animatedGradientOverlay = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [0, imageHeight, imageHeight * 2, imageHeight * 2 + 1],
          [0, -imageHeight, -imageHeight * 2, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const animatedContainer = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.7, 1],
      [0, 0, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateY: interpolate(progress.value, [0, 1], [65, 0]),
      },
    ],
  }));

  progress.value = withTiming(Number(!!playlist.id), { duration: 350 });

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View style={animatedContainer}>
        <Background
          type={playlist.type}
          imageURL={playlist.imageURL}
          darkness={0.2}
        />
        <BackgroundOverlay
          styles={[animatedGradientOverlay, styles.gradientOverlay]}
          colors={['transparent', COLORS.PRIMARY]}
          startY={imageHeight / 2}
          endY={imageHeight + 70 + 90}
          height={height}
        />

        <Stack.Screen
          options={{
            headerTransparent: true,
            headerBackground: () => (
              <CommonHeader
                type={playlist.type}
                headerTitle={playlist.title}
                imageURL={playlist.imageURL}
                animatedValue={scrollOffset}
              />
            ),
          }}
        />
        <Animated.ScrollView
          style={{
            paddingTop: statusBarOffset,
            marginBottom: BOTTOM_NAVIGATION_HEIGHT,
          }}
          scrollEventThrottle={16}
          ref={scrollRef}
        >
          <Cover
            type={playlist.type}
            imageURL={playlist.imageURL}
            animatedValue={scrollOffset}
          />
          <Summary
            id={playlist.id}
            type={playlist.type}
            title={playlist.title}
            subtitle={playlist.subtitle}
            info={playlist.info}
          />
          <Tracks type={playlist.type} tracks={playlist.tracks} />
          <EmptySection />
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};
