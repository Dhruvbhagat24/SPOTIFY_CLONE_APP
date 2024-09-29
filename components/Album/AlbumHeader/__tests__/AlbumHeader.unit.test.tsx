import * as React from 'react';
import { useNavigation } from 'expo-router';
import {
  fireEvent,
  render,
  RenderResult,
  within,
} from '@testing-library/react-native';
import { AlbumHeader, AlbumHeaderPropsType } from '../AlbumHeader';
import { SharedValue } from 'react-native-reanimated';

enum TEST_IDS {
  HEADER = 'header',
  HEADER_TITLE_TEXT = 'header-title-text',
  HEADER_GO_BACK_PRESSABLE = 'header-go-back-pressable',
}

jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn().mockReturnValue({
    top: 10,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));

describe('AlbumHeader', () => {
  let container: RenderResult;
  const mockNavigation = jest.fn();
  const mockAnimatedValue: SharedValue<number> = {
    value: 0,
  } as SharedValue<number>;
  const defaultProps: AlbumHeaderPropsType = {
    headerTitle: 'Title mock',
    image: {
      width: 100,
      height: 100,
      url: 'url mock',
    },
    animatedValue: mockAnimatedValue,
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ goBack: mockNavigation });
    container = render(<AlbumHeader {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(container.getByTestId(TEST_IDS.HEADER)).toBeTruthy();
  });

  describe('UI', () => {
    it('displays proper header title', () => {
      const headerTitle = container.getByTestId(TEST_IDS.HEADER_TITLE_TEXT);

      expect(
        within(headerTitle).getByText(defaultProps.headerTitle)
      ).toBeTruthy();
    });
  });

  describe('Navigation - Press logic', () => {
    it('navigates to previous page on go back press', () => {
      const goBack = container.getByTestId(TEST_IDS.HEADER_GO_BACK_PRESSABLE);

      fireEvent.press(goBack);
      expect(mockNavigation).toHaveBeenCalled();
    });
  });
});
