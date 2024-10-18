import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

import { Cover } from '../Cover';
import { CommonHeader } from '../CommonHeader';
import { Tracks } from '../Tracks';
import { Summary } from '../Summary';
import { Recommendations } from '../Recommendations';
import { EmptySection } from '../EmptySection';

import { PlaylistModel } from '@models';
import { useApplicationDimensions } from '@hooks';

import { styles } from './styles';

export type PlaylistPropsType = {
  playlist: PlaylistModel;
};

export const Playlist = ({ playlist }: PlaylistPropsType) => {
  const { width } = useApplicationDimensions();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const tracksSeed = React.useMemo(() => {
    const tracks = playlist.tracks;
    const lastIndex = tracks.length - 1;

    const ids = [
      ...new Set([
        tracks[0].id,
        tracks[lastIndex].id,
        tracks[Math.floor(lastIndex / 2)].id,
        tracks[Math.floor(lastIndex / 2 / 2)].id,
        tracks[lastIndex - Math.floor((lastIndex - 1) / 2 / 2)].id,
      ]),
    ];

    return ids.length ? ids.join(',') : '';
  }, [playlist.tracks]);

  return (
    <View style={[styles.container, { width }]}>
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
      <ScrollView
        style={styles.scrollView}
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
        <Recommendations type="tracks" seed={tracksSeed} />
        <EmptySection />
      </ScrollView>
    </View>
  );
};
