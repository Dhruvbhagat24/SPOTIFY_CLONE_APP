import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Album } from '../Album';

import { SavedShowModel } from '@models';
import { BOTTOM_NAVIGATION_HEIGHT, Shapes, Sizes } from '@config';
import { getSavedShows } from '@api';
import { translations } from '@data';
import { getDisplayDate } from '@utils';

import { styles } from './styles';

export const SavedPodcasts = () => {
  const [data, setData] = React.useState<SavedShowModel[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const savedEpisodes = await getSavedShows();
        setData(savedEpisodes);

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
          data.map(({ id, name, releaseDate, imageURL }) => (
            <Album
              key={id}
              id={id}
              shape={Shapes.SQUARE}
              size={Sizes.SMALL}
              title={name}
              subtitle={translations.released + getDisplayDate(releaseDate)}
              imageURL={imageURL}
            />
          ))}
      </View>
    </ScrollView>
  );
};
