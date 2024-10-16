import * as React from 'react';

import { Slider } from '../../Slider';

import { getUserTopArtistsAndGenres } from '@api';
import { LibraryItemModel } from '@models';
import { Shapes, Sizes } from '@config';
import { translations } from '@data';

export type TopArtistsPropsType = {};

export const TopArtists = () => {
  const [topArtists, setTopArtists] = React.useState<LibraryItemModel[] | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      try {
        const topArtistsData = await getUserTopArtistsAndGenres();
        setTopArtists(topArtistsData.artists);
      } catch (error) {
        setTopArtists(null);
        console.error(error);
      }
    })();
  }, []);

  // TODO: get rid of this
  if (!topArtists) {
    return null;
  }

  return (
    <Slider
      title={translations.yourTopArtists(topArtists.length)}
      slides={topArtists}
      size={Sizes.MEDIUM}
      shape={Shapes.CIRCLE}
      withShowAll={true}
    />
  );
};
