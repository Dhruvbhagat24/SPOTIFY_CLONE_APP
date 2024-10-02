import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Album } from '../Album';

import { SavedAlbumModel } from '@models';
import {
  AlbumTypes,
  BOTTOM_NAVIGATION_HEIGHT,
  SEPARATOR,
  SizeTypes,
} from '@config';
import { translations } from '@data';

import { styles } from './styles';

export type YourLibraryPropsType = { savedAlbums: SavedAlbumModel[] };

export const YourLibrary = ({ savedAlbums }: YourLibraryPropsType) => {
  const { top: statusBarOffset } = useSafeAreaInsets();

  return (
    <ScrollView
      style={[
        styles.scrollView,
        { paddingTop: statusBarOffset, marginBottom: BOTTOM_NAVIGATION_HEIGHT },
      ]}
    >
      <View style={styles.container}>
        {savedAlbums.map(({ id, name, artists, albumType, image }) => (
          <Album
            key={id}
            id={id}
            shape="square"
            size={SizeTypes.SMALL}
            title={name}
            subtitle={
              albumType === AlbumTypes.ALBUM
                ? artists
                : `${translations.album.type[albumType]} ${SEPARATOR} ${artists}`
            }
            imageUrl={image.url}
          />
        ))}
      </View>
    </ScrollView>
  );
};
