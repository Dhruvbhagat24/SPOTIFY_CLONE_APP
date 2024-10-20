import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Cover } from '../Cover';
import { CommonHeader } from '../CommonHeader';
import { Summary } from '../Summary';
import { EmptySection } from '../EmptySection';
// @API_RATE
// import { PlaylistRecommendations } from './PlaylistRecommendations';
import { Track } from '../Track';

import { PlaylistModel } from '@models';
import { getPlaylist, getPlaylistItems } from '@api';
import { useApplicationDimensions } from '@hooks';
import { BOTTOM_NAVIGATION_HEIGHT, PlaylistItemResponseType } from '@config';

import { styles } from './styles';

export type PlaylistPropsType = {
  playlistId: string;
};

export const Playlist = ({ playlistId }: PlaylistPropsType) => {
  const [playlist, setPlaylist] = React.useState<PlaylistModel | null>(null);
  const [tracks, setTracks] = React.useState<PlaylistItemResponseType[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [limit] = React.useState(50);
  const scrollOffset = useSharedValue(0);
  const { width, height } = useApplicationDimensions();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const fetchTracks = async () => {
    if (!playlistId) {
      return;
    }
    try {
      const newItems = await getPlaylistItems({ playlistId, limit, offset });
      setTracks((prevItems) => [...prevItems, ...newItems]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchTracks();
    //eslint-disable-next-line
  }, [playlistId]);

  React.useEffect(() => {
    if (!playlistId) {
      return;
    }

    (async () => {
      try {
        const playlistData = await getPlaylist(playlistId);
        setPlaylist(playlistData);
      } catch (error) {
        setPlaylist(null);
        console.error('Failed to get playlist data:', error);
      }
    })();
  }, [playlistId]);

  const id = React.useMemo(() => (playlist ? playlist.id : ''), [playlist]);
  const title = React.useMemo(
    () => (playlist ? playlist.title : ''),
    [playlist]
  );
  const subtitle = React.useMemo(
    () => (playlist ? playlist.subtitle : ''),
    [playlist]
  );
  const info = React.useMemo(() => (playlist ? playlist.info : ''), [playlist]);
  const imageURL = React.useMemo(
    () => (playlist ? playlist.imageURL : ''),
    [playlist]
  );

  const renderItem = React.useCallback(
    ({
      item: {
        track: {
          name,
          artists,
          album: { images },
        },
      },
      index,
    }: {
      item: PlaylistItemResponseType;
      index: number;
    }) => (
      <Track
        type="playlist"
        key={index}
        title={name}
        subtitle={artists.map((a) => a.name).join(', ')}
        imageURL={images[0].url || ''}
        // TODO: removed this true value and check if tracks are downloaded instead
        isTrackDownloaded={true}
        // TODO: check if track is saved when playlist owner is not current user
        isTrackSaved={false}
        // TODO: to be removed and replaced with handlePress logic on play
        isPlaying={false}
      />
    ),
    []
  );

  return (
    <View style={[styles.container, { width }]}>
      <CommonHeader
        type="playlist"
        title={title}
        imageURL={imageURL}
        animatedValue={scrollOffset}
      />
      <Animated.FlatList
        contentContainerStyle={styles.flatListContentContainer}
        style={{
          height: height - BOTTOM_NAVIGATION_HEIGHT,
        }}
        data={tracks}
        keyExtractor={(item, index) => item.track.id + index}
        renderItem={renderItem}
        disableScrollViewPanResponder
        onStartReached={fetchTracks}
        onStartReachedThreshold={1}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        ListHeaderComponent={
          <>
            <Cover
              type="playlist"
              imageURL={imageURL}
              animatedValue={scrollOffset}
            />
            <Summary
              type="playlist"
              id={id}
              title={title}
              subtitle={subtitle}
              info={info}
            />
          </>
        }
        ListFooterComponent={
          <>
            {/* @API_RATE */}
            {/* <PlaylistRecommendations playlistId={playlistId} /> */}
            <EmptySection />
          </>
        }
      />
    </View>
  );
};
