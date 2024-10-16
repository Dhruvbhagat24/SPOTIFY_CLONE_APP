import * as React from 'react';

import { getSavedPlaylists, getUserProfile } from '@api';
import { LibraryItemModel, UserProfileModel } from '@models';
import { Shapes, Sizes } from '@config';
import { translations } from '@data';

import { Slider } from '../../Slider';

export const YourPlaylists = () => {
  const [savedPlaylists, setDataSavedPlaylists] = React.useState<
    LibraryItemModel[] | null
  >(null);
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
  if (!userPlaylists) {
    return;
  }

  return (
    <Slider
      title={translations.yourPlaylist}
      slides={userPlaylists}
      size={Sizes.MEDIUM}
      shape={Shapes.SQUARE_BORDER}
      withShowAll={true}
    />
  );
};
