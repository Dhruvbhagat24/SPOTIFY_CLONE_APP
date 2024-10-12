import * as React from 'react';
import { View } from 'react-native';

import { Slider } from '../Slider';

import { LibraryItemModel } from '@models';
import { getSavedPlaylists } from '@api';
import { translations } from '@data';

import { Shapes, Sizes } from '@config';
import { styles } from './styles';

export const Home = () => {
  const [data, setData] = React.useState<LibraryItemModel[] | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const savedPlaylistsData = await getSavedPlaylists();
        setData(savedPlaylistsData);
      } catch (error) {
        setData(null);
        console.error(error);
      }
    })();
  }, []);

  const savedPlaylists = React.useMemo(
    () => (data ? data.splice(0, 10) : null),
    [data]
  );

  if (!savedPlaylists) {
    return;
  }

  return (
    <View style={styles.container}>
      <Slider
        title={translations.yourPlaylist}
        slides={savedPlaylists}
        size={Sizes.MEDIUM}
        shape={Shapes.SQUARE_BORDER}
        withShowAll={true}
      />
    </View>
  );
};
