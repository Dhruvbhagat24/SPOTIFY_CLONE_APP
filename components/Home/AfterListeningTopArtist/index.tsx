import * as React from 'react';

import { Slider } from '../../Slider';

import { getRecommendationsFromTopArtistSeed } from '@api';
import { LibraryItemModel } from '@models';
import { Shapes, Sizes } from '@config';
import { translations } from '@data';

export const AfterListeningTopArtist = () => {
  const [topArtistRecommendations, setTopArtistRecommendations] =
    React.useState<{
      recommendations: LibraryItemModel[];
      artist: LibraryItemModel;
    } | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const topArtistRecommendationsData =
          await getRecommendationsFromTopArtistSeed();
        setTopArtistRecommendations(topArtistRecommendationsData);
      } catch (error) {
        setTopArtistRecommendations(null);
        console.error(error);
      }
    })();
  }, []);

  // TODO: get rid of this
  if (!topArtistRecommendations) {
    return;
  }

  return (
    <Slider
      title={translations.afterListening(topArtistRecommendations.artist.title)}
      slides={topArtistRecommendations.recommendations}
      size={Sizes.MEDIUM}
      shape={Shapes.SQUARE}
      withShowAll={true}
    />
  );
};
