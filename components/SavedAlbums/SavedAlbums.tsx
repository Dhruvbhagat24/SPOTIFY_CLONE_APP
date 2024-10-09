import * as React from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Album } from '../Album';

import { SavedAlbumModel } from '@models';
import {
  AlbumTypes,
  BOTTOM_NAVIGATION_HEIGHT,
  SEPARATOR,
  Shapes,
  Sizes,
} from '@config';
import { getSavedAlbums } from '@api';
import { translations } from '@data';

import { styles } from './styles';

export const SavedAlbums = () => {
  const [data, setData] = React.useState<SavedAlbumModel[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const savedAlbums = await getSavedAlbums();
        setData(savedAlbums);

        await Promise.all(
          savedAlbums.map((album) => Image.prefetch(album.imageURL))
        );
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setData(null);
        console.error('ERROR: ', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <ScrollView
      style={[
        styles.scrollView,
        {
          paddingTop: useSafeAreaInsets().top,
          marginBottom: BOTTOM_NAVIGATION_HEIGHT,
        },
      ]}
    >
      <View style={styles.container}>
        {!isLoading &&
          !isError &&
          data &&
          data.map(({ id, name, artists, albumType, imageURL }) => (
            <Album
              key={id}
              id={id}
              shape={Shapes.SQUARE}
              size={Sizes.SMALL}
              title={name}
              subtitle={
                albumType === AlbumTypes.ALBUM
                  ? artists
                  : `${translations.type[albumType]} ${SEPARATOR} ${artists}`
              }
              imageURL={imageURL}
            />
          ))}
      </View>
    </ScrollView>
  );
};
