import * as React from 'react';

import { YourLibrary } from '@components';
import { SavedAlbumModel } from '@models';
import { getSavedAlbums } from '@api';
import { parseToSavedAlbums } from '@utils';

export const LibraryScreen = () => {
  const [savedAlbumsData, setSavedAlbumsData] = React.useState<
    SavedAlbumModel[] | null
  >(null);

  React.useEffect(() => {
    (async () => {
      try {
        const savedAlbums = parseToSavedAlbums(await getSavedAlbums(50, 0));
        setSavedAlbumsData(savedAlbums);
      } catch (error) {
        setSavedAlbumsData(null);
        console.error('Failed to get saved albums data:', error);
      }
    })();
  }, []);

  if (savedAlbumsData === null) {
    return null;
  }

  return <YourLibrary savedAlbums={savedAlbumsData} />;
};
