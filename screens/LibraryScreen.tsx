import * as React from 'react';
import { View } from 'react-native';

import { FollowedArtists, LibraryHeader, SavedAlbums } from '@components';
import { useApplicationDimensions } from '@hooks';
import { Categories } from '@config';

export const LibraryScreen = () => {
  const { width, height } = useApplicationDimensions();
  const [category, setCategory] = React.useState<Categories>(Categories.ALBUMS);

  return (
    <View style={{ width, height }}>
      <LibraryHeader category={category} setCategory={setCategory} />
      {category === Categories.ALBUMS && <SavedAlbums />}
      {category === Categories.ARTISTS && <FollowedArtists />}
    </View>
  );
};
