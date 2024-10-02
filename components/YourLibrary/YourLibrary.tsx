import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Album } from '../Album';
import { YourLibraryHeader } from './PlaylistHeader';

import { useApplicationDimensions } from '@hooks';
import { SavedAlbumModel, UserProfileModel } from '@models';
import {
  AlbumTypes,
  BOTTOM_NAVIGATION_HEIGHT,
  SEPARATOR,
  SHAPES,
  SIZES,
} from '@config';
import { translations } from '@data';

import { styles } from './styles';

export type YourLibraryPropsType = {
  savedAlbums: SavedAlbumModel[];
  userProfile: UserProfileModel;
};

export const YourLibrary = ({
  savedAlbums,
  userProfile,
}: YourLibraryPropsType) => {
  const { width, height } = useApplicationDimensions();
  const { top: statusBarOffset } = useSafeAreaInsets();

  return (
    <View style={{ width, height }}>
      <YourLibraryHeader
        imageURL={userProfile.imageURL}
        headerTitle={translations.router.library}
        categories={['playlists', 'podcasts', 'albums', 'artist', 'downloaded']}
      />
      <ScrollView
        style={[
          styles.scrollView,
          {
            paddingTop: statusBarOffset,
            marginBottom: BOTTOM_NAVIGATION_HEIGHT,
          },
        ]}
      >
        <View style={styles.container}>
          {savedAlbums.map(({ id, name, artists, albumType, image }) => (
            <Album
              key={id}
              id={id}
              shape={SHAPES.SQUARE}
              size={SIZES.SMALL}
              title={name}
              subtitle={
                albumType === AlbumTypes.ALBUM
                  ? artists
                  : `${translations.playlist.type[albumType]} ${SEPARATOR} ${artists}`
              }
              imageUrl={image.url}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
