import * as React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Album } from '../Album';

import { ArtistModel } from '@models';
import { BOTTOM_NAVIGATION_HEIGHT, Shapes, Sizes } from '@config';
import { getUserFollowedArtists } from '@api';

import { styles } from './styles';

export const FollowedArtists = () => {
  const [data, setData] = React.useState<ArtistModel[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const followedArtists = await getUserFollowedArtists();
        setData(followedArtists);
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
        {isLoading && <Text>Loading</Text>}
        {isError && <Text>Error</Text>}
        {!isLoading &&
          !isError &&
          data &&
          data.map(({ id, name, imageURL }) => (
            <Album
              key={id}
              id={id}
              shape={Shapes.CIRCLE}
              size={Sizes.SMALL}
              title={name}
              imageURL={imageURL}
            />
          ))}
      </View>
    </ScrollView>
  );
};
