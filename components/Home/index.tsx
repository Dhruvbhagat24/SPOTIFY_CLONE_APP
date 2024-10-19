import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { RecentlyPlayed } from './RecentlyPlayed';
import { TopAlbums } from './TopAlbums';
import { TopArtists } from './TopArtists';
// import { BasedOnTopArtists } from './BasedOnTopArtists';
import { YourPlaylists } from './YourPlaylists';
// import { AfterListeningTopArtist } from './AfterListeningTopArtist';
import { EmptySection } from '../EmptySection';

export const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <RecentlyPlayed />
      <TopAlbums />
      <TopArtists />
      {/* @API_RATE */}
      {/* <BasedOnTopArtists /> */}
      <YourPlaylists />
      {/* @API_RATE */}
      {/* <AfterListeningTopArtist /> */}
      <EmptySection />
    </ScrollView>
  );
};
