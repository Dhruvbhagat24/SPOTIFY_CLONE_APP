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
import { Recommendations } from '../Recommendations';
import { AlbumInfo } from './AlbumInfo';
import { AlbumArtists } from './AlbumArtists';
import { AlbumCopyrights } from './AlbumCopyrights';
import { AlbumMoreOf } from './AlbumMoreOf';

import { AlbumModel, ArtistModel } from '@models';
import { useApplicationDimensions } from '@hooks';
import { BOTTOM_NAVIGATION_HEIGHT, COLORS, SEPARATOR } from '@config';
import { translations } from '@data';

import { styles } from './styles';

export type AlbumPropsType = {
  album: AlbumModel;
  artists: ArtistModel[];
};

export const Album = ({ album, artists }: AlbumPropsType) => {
  const { width, height } = useApplicationDimensions();
  const { top: statusBarOffset } = useSafeAreaInsets();

  const imageHeight = 300;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const progress = useSharedValue(Number(!!album.id));

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

  progress.value = withTiming(Number(!!album.id), { duration: 350 });

  const artistNamesString = React.useMemo(
    () =>
      artists.length ? artists.map((a) => a.name).join(` ${SEPARATOR} `) : '',
    [artists]
  );

  const artistSeed = React.useMemo(
    () => (artists.length ? artists.map((a) => a.id).join(`,`) : ''),
    [artists]
  );

  const releaseYear = React.useMemo(
    () => album.releaseDate.split('-')[0],
    [album.releaseDate]
  );

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View style={animatedContainer}>
        <Background
          type={album.type}
          imageURL={album.imageURL}
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
                type={album.type}
                headerTitle={album.name}
                imageURL={album.imageURL}
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
            type={album.type}
            imageURL={album.imageURL}
            animatedValue={scrollOffset}
          />
          <Summary
            id={album.id}
            type={album.type}
            title={album.name}
            subtitle={artistNamesString}
            info={`${translations.type[album.albumType]} ${SEPARATOR} ${releaseYear}`}
          />
          <Tracks type={album.type} tracks={album.tracks.items} />
          <AlbumInfo
            releaseDate={album.releaseDate}
            totalTracks={album.tracks.total}
            totalDuration={album.duration}
          />
          <AlbumArtists artists={artists} />
          <AlbumMoreOf artists={artists} />
          <Recommendations type="artist" seed={artistSeed} />
          <AlbumCopyrights copyrights={album.copyrights} />
          <EmptySection />
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};
