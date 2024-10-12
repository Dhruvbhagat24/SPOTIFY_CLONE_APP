import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import { BackgroundGradient as BackgroundOverlay } from '../BackgroundGradient';
import { PlaylistBackground } from './PlaylistBackground';
import { PlaylistHeader } from './PlaylistHeader';
import { PlaylistCover } from './PlaylistCover';
import { PlaylistInfo } from './PlaylistInfo';
import { PlaylistSummary } from './PlaylistSummary';
import { PlaylistArtists } from './PlaylistArtists';
import { PlaylistCopyrights } from './PlaylistCopyrights';

import { translations } from '@data';
import { PlaylistModel, AlbumModel, ArtistModel } from '@models';
import { useApplicationDimensions } from '@hooks';
import {
  BOTTOM_NAVIGATION_HEIGHT,
  COLORS,
  SEPARATOR,
  Shapes,
  Sizes,
} from '@config';

import { styles } from './styles';
import { Slider } from '../Slider';
import { PlaylistTracks } from './PlaylistTracks';

export type PlaylistPropsType = {
  album: PlaylistModel;
  artists: ArtistModel[];
  artistsAlbums: {
    artist: string;
    albums: AlbumModel[];
  }[];
  isAlbumSaved: boolean;
};

export const Playlist = ({
  album,
  artists,
  artistsAlbums,
  isAlbumSaved,
}: PlaylistPropsType) => {
  const { width, height } = useApplicationDimensions();
  const { top: statusBarOffset } = useSafeAreaInsets();

  // TODO: to be removed and replaced with API separate + call
  const isDownloaded = false;
  const { albumType, name, releaseDate, imageURL, tracks, copyrights } = album;

  const imageHeight = 300;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

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

  return (
    <View style={{ width }}>
      <PlaylistBackground url={imageURL} darkness={0.2} />
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
            <PlaylistHeader
              headerTitle={name}
              imageURL={imageURL}
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
        <PlaylistCover imageURL={imageURL} animatedValue={scrollOffset} />
        <PlaylistInfo
          name={name}
          artists={artists.map((a) => a.name).join(` ${SEPARATOR} `)}
          albumType={albumType}
          releaseDate={releaseDate.split('-')[0]}
          isDownloaded={isDownloaded}
          isSaved={isAlbumSaved}
        />
        <PlaylistTracks tracks={tracks.items} />
        <PlaylistSummary
          releaseDate={releaseDate}
          totalTracks={tracks.total}
          totalDuration={tracks.items.reduce(
            (acc, { durationMs }) => acc + durationMs,
            0
          )}
        />
        <PlaylistArtists artists={artists} />
        {artistsAlbums.map(({ artist, albums }, index) => (
          <Slider
            key={index}
            title={`${translations.moreOf} ${artist}`}
            slides={albums}
            size={Sizes.MEDIUM}
            shape={Shapes.SQUARE_BORDER}
            withShowAll={true}
          />
        ))}

        <PlaylistCopyrights copyrights={copyrights} />
      </Animated.ScrollView>
    </View>
  );
};
