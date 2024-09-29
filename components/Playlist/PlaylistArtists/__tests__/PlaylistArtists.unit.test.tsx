import * as React from 'react';
import { useRouter } from 'expo-router';
import {
  render,
  fireEvent,
  RenderResult,
  within,
} from '@testing-library/react-native';
import { PlaylistArtists, PlaylistArtistsPropsType } from '../PlaylistArtists';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

enum TEST_IDS {
  ARTIST_IMAGE = 'artist-image',
  ARTIST_NAME = 'artist-name',
  ARTIST_LINK_ID_1 = 'artist-link-id_1',
  ARTIST_LINK_ID_2 = 'artist-link-id_2',
}

describe('PlaylistArtists', () => {
  let container: RenderResult;
  const mockRouter = jest.fn();
  const defaultProps: PlaylistArtistsPropsType = {
    artists: [
      {
        type: 'artist',
        id: 'id_1',
        name: 'Artist Name 2 mock',
        followers: { href: 'Url mock', total: 12 },
        genres: ['genre1', 'genre2'],
        images: [
          { url: 'url 1', width: 1, height: 1 },
          { url: 'url 2', width: 2, height: 2 },
          { url: 'url 3', width: 3, height: 3 },
        ],
        popularity: 78,
      },
      {
        type: 'artist',
        id: 'id_2',
        name: 'Artist Name 2 mock',
        followers: { href: 'Url mock', total: 25 },
        genres: ['genre1', 'genre2'],
        images: [
          { url: 'url 1', width: 1, height: 1 },
          { url: 'url 2', width: 2, height: 2 },
          { url: 'url 3', width: 3, height: 3 },
        ],
        popularity: 24,
      },
    ],
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouter });
    container = render(<PlaylistArtists {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(container.getByTestId(TEST_IDS.ARTIST_LINK_ID_1)).toBeTruthy();
    expect(container.getByTestId(TEST_IDS.ARTIST_LINK_ID_2)).toBeTruthy();
  });

  describe('Navigation - Press logic', () => {
    it('navigates to the first artist page with given ID', () => {
      const artist1 = container.getByTestId(TEST_IDS.ARTIST_LINK_ID_1);

      fireEvent.press(artist1);
      expect(mockRouter).toHaveBeenCalledWith('/artists/id_1');
    });

    it('navigates to the first artist page with given ID', () => {
      const artist2 = container.getByTestId(TEST_IDS.ARTIST_LINK_ID_2);

      fireEvent.press(artist2);
      expect(mockRouter).toHaveBeenCalledWith('/artists/id_2');
    });
  });

  describe('UI', () => {
    it('passes properly props to Image component for first artist', () => {
      const Images = container.getAllByTestId(TEST_IDS.ARTIST_IMAGE);

      Images.forEach((Image, i) => {
        const currentImageProp = defaultProps.artists[i].images[2];
        expect(Image.props.source.uri).toEqual(currentImageProp.url);
      });
    });

    it('displays artist name(s) inside Text components', () => {
      const Texts = container.getAllByTestId(TEST_IDS.ARTIST_NAME);

      Texts.forEach((Text, i) => {
        expect(
          within(Text).queryByText(defaultProps.artists[i].name)
        ).toBeTruthy();
      });
    });
  });
});
