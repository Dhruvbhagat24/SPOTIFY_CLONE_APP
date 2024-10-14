import * as React from 'react';

import { LibraryItemModel } from '@models';
import { getRecommendations } from '@api';
import { Slider } from '../../Slider';
import { translations } from '@data';
import { Shapes, Sizes } from '@config';

export type AlbumRecommendationsPropsType = {
  artistSeed: string;
};

export const AlbumRecommendations = ({
  artistSeed,
}: AlbumRecommendationsPropsType) => {
  const [recommendedAlbums, setRecommendedAlbums] = React.useState<
    LibraryItemModel[] | null
  >(null);

  React.useEffect(() => {
    if (!artistSeed) {
      return;
    }

    (async () => {
      try {
        const recommendedAlbumsData = await getRecommendations({
          artistSeed,
        });
        setRecommendedAlbums(recommendedAlbumsData);
      } catch (error) {
        setRecommendedAlbums(null);
        console.error(error);
      }
    })();
  }, [artistSeed]);

  // TODO: get rid of this
  if (!recommendedAlbums) {
    return null;
  }

  return (
    <Slider
      title={translations.recommendations}
      slides={recommendedAlbums}
      size={Sizes.MEDIUM}
      shape={Shapes.SQUARE_BORDER}
      withShowAll={true}
    />
  );
};
