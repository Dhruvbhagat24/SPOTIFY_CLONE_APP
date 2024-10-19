import * as React from 'react';

import { Recommendations } from '../../Recommendations';
import { getPlaylistItems } from '@api';

export type PlaylistRecommendationsPropsType = {
  playlistId: string;
};

export const PlaylistRecommendations = ({
  playlistId,
}: PlaylistRecommendationsPropsType) => {
  const [seed, setSeed] = React.useState<string>('');

  React.useEffect(() => {
    if (!playlistId) {
      return;
    }

    (async () => {
      try {
        const tracks = await getPlaylistItems({
          playlistId,
          limit: 5,
          offset: 0,
        });

        setSeed(tracks.map(({ track: { id } }) => id).join(','));
      } catch (error) {
        console.error(error);
      }
    })();
  });

  return <Recommendations type="tracks" seed={seed} />;
};
