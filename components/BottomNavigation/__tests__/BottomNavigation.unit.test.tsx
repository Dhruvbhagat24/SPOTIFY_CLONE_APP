import * as React from 'react';
import { useNavigation, useSegments } from 'expo-router';
import { render, fireEvent, RenderResult } from '@testing-library/react-native';
import { BottomNavigation } from '../BottomNavigation';
import { COLORS } from '@config';

jest.mock('../../BackgroundGradient');

jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
  useSegments: jest.fn(),
}));

enum TEST_IDS {
  HOME_PRESSABLE = 'home-pressable',
  HOME_TEXT = 'home-text',
  SEARCH_PRESSABLE = 'search-pressable',
  SEARCH_TEXT = 'search-text',
  LIBRARY_PRESSABLE = 'library-pressable',
  LIBRARY_TEXT = 'library-text',
}

describe('BottomNavigation', () => {
  let container: RenderResult;
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (useSegments as jest.Mock).mockReturnValue(['', 'home']);
    container = render(<BottomNavigation />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(container.getByTestId(TEST_IDS.HOME_TEXT)).toBeTruthy();
    expect(container.getByTestId(TEST_IDS.SEARCH_TEXT)).toBeTruthy();
    expect(container.getByTestId(TEST_IDS.LIBRARY_TEXT)).toBeTruthy();
  });

  describe('Navigation - Press logic', () => {
    it('navigates to the home page when the home button is pressed', () => {
      const homeButton = container.getByTestId(TEST_IDS.HOME_PRESSABLE);
      fireEvent.press(homeButton);
      expect(mockNavigate).toHaveBeenCalledWith('home');
    });

    it('navigates to the search page when the search button is pressed', () => {
      const searchButton = container.getByTestId(TEST_IDS.SEARCH_PRESSABLE);
      fireEvent.press(searchButton);
      expect(mockNavigate).toHaveBeenCalledWith('search');
    });

    it('navigates to the library page when the library button is pressed', () => {
      const libraryButton = container.getByTestId(TEST_IDS.LIBRARY_PRESSABLE);
      fireEvent.press(libraryButton);
      expect(mockNavigate).toHaveBeenCalledWith('library');
    });
  });

  describe('Active button - UI', () => {
    it('sets the home button active when pressed', () => {
      (useSegments as jest.Mock).mockReturnValue(['', 'home']);
      container = render(<BottomNavigation />);

      const homeTextActiveStyles = container.getByTestId(TEST_IDS.HOME_TEXT)
        .props.style[1].color;
      const libraryTextActiveStyles = container.getByTestId(
        TEST_IDS.LIBRARY_TEXT
      ).props.style[1].color;
      const searchTextActiveStyles = container.getByTestId(TEST_IDS.SEARCH_TEXT)
        .props.style[1].color;

      expect(homeTextActiveStyles).toBe(COLORS.WHITE);
      expect(searchTextActiveStyles).toBe(undefined);
      expect(libraryTextActiveStyles).toBe(undefined);
    });

    it('sets the search button active when pressed', () => {
      (useSegments as jest.Mock).mockReturnValue(['', 'search']);
      container = render(<BottomNavigation />);

      const homeTextActiveStyles = container.getByTestId(TEST_IDS.HOME_TEXT)
        .props.style[1].color;
      const libraryTextActiveStyles = container.getByTestId(
        TEST_IDS.LIBRARY_TEXT
      ).props.style[1].color;
      const searchTextActiveStyles = container.getByTestId(TEST_IDS.SEARCH_TEXT)
        .props.style[1].color;

      expect(searchTextActiveStyles).toBe(COLORS.WHITE);
      expect(homeTextActiveStyles).toBe(undefined);
      expect(libraryTextActiveStyles).toBe(undefined);
    });

    it('sets the home library active when pressed', () => {
      (useSegments as jest.Mock).mockReturnValue(['', 'library']);
      container = render(<BottomNavigation />);

      const homeTextActiveStyles = container.getByTestId(TEST_IDS.HOME_TEXT)
        .props.style[1].color;
      const libraryTextActiveStyles = container.getByTestId(
        TEST_IDS.LIBRARY_TEXT
      ).props.style[1].color;
      const searchTextActiveStyles = container.getByTestId(TEST_IDS.SEARCH_TEXT)
        .props.style[1].color;

      expect(libraryTextActiveStyles).toBe(COLORS.WHITE);
      expect(searchTextActiveStyles).toBe(undefined);
      expect(homeTextActiveStyles).toBe(undefined);
    });
  });
});
