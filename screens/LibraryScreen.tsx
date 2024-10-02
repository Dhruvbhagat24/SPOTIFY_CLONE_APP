import * as React from 'react';

import { YourLibrary } from '@components';
import { SavedAlbumModel, UserProfileModel } from '@models';
import { getSavedAlbums, getUserProfile } from '@api';
import { parseToSavedAlbums, parseToUserProfile } from '@utils';

export const LibraryScreen = () => {
  const [savedAlbumsData, setSavedAlbumsData] = React.useState<
    SavedAlbumModel[] | null
  >(null);
  const [userProfileData, setUserProfileData] =
    React.useState<UserProfileModel | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const [savedAlbums, userProfile] = await Promise.all([
          getSavedAlbums(50, 0),
          getUserProfile(),
        ]);
        setUserProfileData(parseToUserProfile(userProfile));
        setSavedAlbumsData(parseToSavedAlbums(savedAlbums));
      } catch (error) {
        setSavedAlbumsData(null);
        console.error('Failed to get saved albums data:', error);
      }
    })();
  }, []);

  if (savedAlbumsData === null || userProfileData === null) {
    return null;
  }

  return (
    <YourLibrary savedAlbums={savedAlbumsData} userProfile={userProfileData} />
  );
};
