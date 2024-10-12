import * as React from 'react';
import { render, RenderResult } from '@testing-library/react-native';
import { AlbumCover, AlbumCoverPropsType } from '../AlbumCover';
import { SharedValue } from 'react-native-reanimated';

enum TEST_IDS {
  ALBUM_COVER = 'album-cover',
  ALBUM_COVER_IMAGE = 'album-cover-image',
}

describe('AlbumCover', () => {
  let container: RenderResult;
  const mockAnimatedValue: SharedValue<number> = {
    value: 0,
  } as SharedValue<number>;
  const defaultProps: AlbumCoverPropsType = {
    image: {
      width: 100,
      height: 100,
      url: 'url mock',
    },
    animatedValue: mockAnimatedValue,
  };

  beforeEach(() => {
    container = render(<AlbumCover {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(container.getByTestId(TEST_IDS.ALBUM_COVER)).toBeTruthy();
  });

  it('passes proper props to Image component', () => {
    const image = container.getByTestId(TEST_IDS.ALBUM_COVER_IMAGE);
    const {
      style,
      source: { uri },
    } = image.props;

    expect(uri).toEqual(defaultProps.image.url);
    expect(style.width).toEqual(defaultProps.image.width);
    expect(style.height).toEqual(defaultProps.image.height);
  });
});
