import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { RecentlyPlayed } from './RecentlyPlayed';
import { TopAlbums } from './TopAlbums';
import { TopArtists } from './TopArtists';
import { BasedOnTopArtists } from './BasedOnTopArtists';
import { YourPlaylists } from './YourPlaylists';
import { AfterListeningTopArtist } from './AfterListeningTopArtist';
import { EmptySection } from '../EmptySection';

import { styles } from './styles';

export const Home = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <RecentlyPlayed />
      <TopAlbums />
      <TopArtists />
      <BasedOnTopArtists />
      <YourPlaylists />
      <AfterListeningTopArtist />
      <EmptySection />
    </ScrollView>
  );
};
