import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { Stack } from 'expo-router';

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
import { SEPARATOR } from '@config';
import { translations } from '@data';

import { styles } from './styles';
import { ScrollView } from 'react-native-gesture-handler';

export type AlbumPropsType = {
  album: AlbumModel;
  artists: ArtistModel[];
};

export const Album = ({ album, artists }: AlbumPropsType) => {
  const { width } = useApplicationDimensions();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const artistNamesString = React.useMemo(
    () =>
      artists.length ? artists.map((a) => a.name).join(` ${SEPARATOR} `) : '',
    [artists]
  );

  const artistSeed = React.useMemo(
    () =>
      artists.length
        ? artists
            .map((a) => a.id)
            .slice(0, 5)
            .join(`,`)
        : '',
    [artists]
  );

  const releaseYear = React.useMemo(
    () => album.releaseDate.split('-')[0],
    [album.releaseDate]
  );

  return (
    <View style={[styles.container, { width }]}>
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
      <ScrollView
        style={styles.scrollView}
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
      </ScrollView>
    </View>
  );
};
