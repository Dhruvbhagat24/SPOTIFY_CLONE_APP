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
import { AlbumInfo } from './AlbumInfo';
import { AlbumArtists } from './AlbumArtists';
import { AlbumCopyrights } from './AlbumCopyrights';
import { AlbumRecommendations } from './AlbumRecommendations';

import { AlbumModel, ArtistModel } from '@models';
import { useApplicationDimensions } from '@hooks';
import { BOTTOM_NAVIGATION_HEIGHT, COLORS, SEPARATOR } from '@config';
import { getFallbackImage } from '@utils';
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

  const artistsString = React.useMemo(
    () =>
      artists.length ? artists.map((a) => a.name).join(` ${SEPARATOR} `) : '',
    [artists]
  );

  const totalDuration = React.useMemo(
    () =>
      album.tracks.items.length
        ? album.tracks.items.reduce(
            (acc, { durationMs }) => acc + durationMs,
            0
          )
        : 0,
    [album.tracks.items]
  );

  const releaseYear = React.useMemo(
    () => album.releaseDate.split('-')[0],
    [album.releaseDate]
  );

  const fallbackImageSource = React.useMemo(
    () => getFallbackImage(album.type),
    [album.type]
  );

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View style={animatedContainer}>
        <Background
          fallbackImageSource={fallbackImageSource}
          imageURL={album.imageURL}
          darkness={0.2}
        />
        <BackgroundOverlay
          styles={[animatedGradientOverlay, styles.albumGradientOverlay]}
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
                headerTitle={album.name}
                imageURL={album.imageURL}
                fallbackImageSource={fallbackImageSource}
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
            imageURL={album.imageURL}
            fallbackImageSource={fallbackImageSource}
            animatedValue={scrollOffset}
          />
          <Summary
            id={album.id}
            type="album"
            title={album.name}
            subtitle={artistsString}
            info={`${translations.type[album.albumType]} ${SEPARATOR} ${releaseYear}`}
          />
          <Tracks tracks={album.tracks.items} />
          <AlbumInfo
            releaseDate={album.releaseDate}
            totalTracks={album.tracks.total}
            totalDuration={totalDuration}
          />
          <AlbumArtists artists={artists} />
          <AlbumRecommendations artists={artists} />
          <AlbumCopyrights copyrights={album.copyrights} />
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};
