import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Stack } from 'expo-router';

import { Cover } from '../Cover';
import { CommonHeader } from '../CommonHeader';
import { Summary } from '../Summary';
import { EmptySection } from '../EmptySection';
import { Recommendations } from '../Recommendations';
import { AlbumInfo } from './AlbumInfo';
import { AlbumArtists } from './AlbumArtists';
import { AlbumCopyrights } from './AlbumCopyrights';
import { AlbumMoreOf } from './AlbumMoreOf';

import { checkSavedTracks } from '@api';
import { AlbumModel, ArtistModel } from '@models';
import { useApplicationDimensions } from '@hooks';
import { SEPARATOR } from '@config';
import { translations } from '@data';

import { styles } from './styles';
import { Track } from '../Track';

export type AlbumPropsType = {
  album: AlbumModel;
  artists: ArtistModel[];
};

export const Album = ({ album, artists }: AlbumPropsType) => {
  const [savedAlbumTracks, setSavedAlbumTracks] = React.useState<
    boolean[] | null
  >(null);
  const { width } = useApplicationDimensions();
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

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
  const id = React.useMemo(() => (album ? album.id : ''), [album]);
  const title = React.useMemo(() => (album ? album.name : ''), [album]);
  const subtitle = React.useMemo(
    () =>
      artists.length ? artists.map((a) => a.name).join(` ${SEPARATOR} `) : '',
    [artists]
  );
  const imageURL = React.useMemo(() => (album ? album.imageURL : ''), [album]);
  const releaseDate = React.useMemo(
    () => (album ? album.releaseDate : ''),
    [album]
  );
  const duration = React.useMemo(() => (album ? album.duration : ''), [album]);
  const copyrights = React.useMemo(
    () => (album ? album.copyrights : [{ type: '', text: '' }]),
    [album]
  );
  const info = React.useMemo(
    () =>
      album
        ? `${translations.type[album.albumType]} ${SEPARATOR} ${album.releaseDate.split('-')[0]}`
        : '',
    [album]
  );
  const tracks = React.useMemo(
    () =>
      album
        ? album.tracks.items
        : Array(1).fill({
            id: '',
            title: '',
            subtitle: '',
            imageURL: '',
          }),
    [album]
  ) as AlbumModel['tracks']['items'];
  const total = React.useMemo(() => (album ? album.tracks.total : ''), [album]);

  React.useEffect(() => {
    if (!tracks.length) {
      return;
    }

    (async () => {
      try {
        const savedAlbumTracksArr = await checkSavedTracks(
          tracks.map((track) => track.id)
        );
        setSavedAlbumTracks(savedAlbumTracksArr);
      } catch (error) {
        setSavedAlbumTracks(null);
        console.error('Failed to check if array of tracks are saved:', error);
      }
    })();
  }, [tracks]);

  const renderItem = React.useCallback(
    ({
      item,
      index,
    }: {
      item: AlbumModel['tracks']['items'][0];
      index: number;
    }) => (
      <Track
        type="album"
        key={index}
        title={item.title}
        subtitle={item.subtitle}
        imageURL={item.imageURL}
        // TODO: removed this true value and check if tracks are downloaded instead
        isTrackDownloaded={true}
        isTrackSaved={savedAlbumTracks ? savedAlbumTracks[index] : false}
        // TODO: to be removed and replaced with handlePress logic on play
        isPlaying={false}
      />
    ),
    [savedAlbumTracks]
  );

  return (
    <View style={[styles.container, { width }]}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerBackground: () => (
            <CommonHeader
              type="album"
              title={title}
              imageURL={imageURL}
              animatedValue={scrollOffset}
            />
          ),
        }}
      />
      <Animated.FlatList
        style={styles.flatList}
        contentContainerStyle={styles.flatListContentContainer}
        data={tracks}
        keyExtractor={({ id }, index) => id + index}
        renderItem={renderItem}
        disableScrollViewPanResponder
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        ListHeaderComponent={
          <>
            <Cover
              type="album"
              imageURL={imageURL}
              animatedValue={scrollOffset}
            />
            <Summary
              id={id}
              type="album"
              title={title}
              subtitle={subtitle}
              info={info}
            />
          </>
        }
        ListFooterComponent={
          <>
            <AlbumInfo
              releaseDate={releaseDate}
              totalTracks={total}
              totalDuration={duration}
            />
            <AlbumArtists artists={artists} />
            <AlbumMoreOf artists={artists} />
            <Recommendations type="artist" seed={artistSeed} />
            <AlbumCopyrights copyrights={copyrights} />
            <EmptySection />
          </>
        }
      />
    </View>
  );
};
