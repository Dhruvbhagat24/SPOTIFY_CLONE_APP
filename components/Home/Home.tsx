import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Slider } from '../Slider';

import { LibraryItemModel, UserProfileModel } from '@models';
import {
  getRecommendationsFromArtistSeeds,
  getRecommendationsFromTopArtistSeed,
  getSavedPlaylists,
  getUserProfile,
  getUserTopAlbums,
  getUserTopArtistsAndGenres,
} from '@api';
import { translations } from '@data';

import { Shapes, Sizes } from '@config';
import { styles } from './styles';
import { RecentlyPlayed } from '../RecentlyPlayed';
import { EmptySection } from '../EmptySection';

export const Home = () => {
  const [savedPlaylists, setDataSavedPlaylists] = React.useState<
    LibraryItemModel[] | null
  >(null);
  const [topArtists, setTopArtists] = React.useState<LibraryItemModel[] | null>(
    null
  );
  const [topAlbums, setTopAlbums] = React.useState<LibraryItemModel[] | null>(
    null
  );
  const [artistRecommendations, setArtistRecommendations] = React.useState<
    LibraryItemModel[] | null
  >(null);
  const [topArtistRecommendations, setTopArtistRecommendations] =
    React.useState<{
      recommendations: LibraryItemModel[];
      artist: LibraryItemModel;
    } | null>(null);
  const [userProfile, setUserProfile] = React.useState<UserProfileModel | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      try {
        const userProfileData = await getUserProfile();
        setUserProfile(userProfileData);
      } catch (error) {
        setUserProfile(null);
        console.error(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const savedPlaylistsData = await getSavedPlaylists();
        setDataSavedPlaylists(savedPlaylistsData);
      } catch (error) {
        setDataSavedPlaylists(null);
        console.error(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const topArtistsData = await getUserTopArtistsAndGenres();
        setTopArtists(topArtistsData.artists);
      } catch (error) {
        setTopArtists(null);
        console.error(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const topAlbumsData = await getUserTopAlbums();
        setTopAlbums(topAlbumsData);
      } catch (error) {
        setTopAlbums(null);
        console.error(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const artistRecommendationsData =
          await getRecommendationsFromArtistSeeds();
        setArtistRecommendations(artistRecommendationsData);
      } catch (error) {
        setArtistRecommendations(null);
        console.error(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const topArtistRecommendationsData =
          await getRecommendationsFromTopArtistSeed();
        setTopArtistRecommendations(topArtistRecommendationsData);
      } catch (error) {
        setTopArtistRecommendations(null);
        console.error(error);
      }
    })();
  }, []);

  const userPlaylists = React.useMemo(
    () =>
      savedPlaylists && userProfile
        ? savedPlaylists.filter(
            (savedPlaylist) => savedPlaylist.ownerId === userProfile.id
          )
        : null,
    [userProfile, savedPlaylists]
  );

  // TODO: get rid of this
  if (
    !userPlaylists ||
    !topArtists ||
    !topAlbums ||
    !artistRecommendations ||
    !topArtistRecommendations
  ) {
    return;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <RecentlyPlayed />
      <Slider
        title={translations.yourTopAlbums(topAlbums.length)}
        slides={topAlbums}
        size={Sizes.MEDIUM}
        shape={Shapes.SQUARE_BORDER}
        withShowAll={true}
      />
      <Slider
        title={translations.yourTopArtists(topArtists.length)}
        slides={topArtists}
        size={Sizes.MEDIUM}
        shape={Shapes.CIRCLE}
        withShowAll={true}
      />
      <Slider
        title={translations.basedOnYourTopArtists}
        slides={artistRecommendations}
        size={Sizes.MEDIUM}
        shape={Shapes.SQUARE}
        withShowAll={true}
      />
      <Slider
        title={translations.yourPlaylist}
        slides={userPlaylists}
        size={Sizes.MEDIUM}
        shape={Shapes.SQUARE_BORDER}
        withShowAll={true}
      />
      <Slider
        title={translations.afterListening(
          topArtistRecommendations.artist.title
        )}
        slides={topArtistRecommendations.recommendations}
        size={Sizes.MEDIUM}
        shape={Shapes.SQUARE}
        withShowAll={true}
      />
      <EmptySection />
    </ScrollView>
  );
};
