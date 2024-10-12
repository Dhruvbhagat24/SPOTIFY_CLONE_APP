import * as React from 'react';
import { render, RenderResult } from '@testing-library/react-native';
import {
  PlaylistBackground,
  PlaylistBackgroundPropsType,
} from '../AlbumBackground';

enum TEST_IDS {
  ALBUM_BACKGROUND = 'album-background',
  ALBUM_BACKGROUND_OVERLAY = 'album-background-overlay',
  ALBUM_BACKGROUND_IMAGE = 'album-background-image',
}

describe('PlaylistBackground', () => {
  let container: RenderResult;
  const defaultProps: PlaylistBackgroundPropsType = {
    url: 'url',
    darkness: 0.6,
  };

  beforeEach(() => {
    container = render(<PlaylistBackground {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(container.getByTestId(TEST_IDS.ALBUM_BACKGROUND)).toBeTruthy();
  });

  it('passes properly props to Image component', () => {
    const image = container.getByTestId(TEST_IDS.ALBUM_BACKGROUND_IMAGE);
    expect(image.props.source.uri).toEqual(defaultProps.url);
  });

  it('passes properly props to Overlay component', () => {
    const overlay = container.getByTestId(TEST_IDS.ALBUM_BACKGROUND_OVERLAY);
    const rgbaLastIndex = overlay.props.style[1].backgroundColor
      .match(/rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (1|0|0.[0-9])\)/)
      .pop();

    expect(Number(rgbaLastIndex)).toEqual(defaultProps.darkness);
  });
});
