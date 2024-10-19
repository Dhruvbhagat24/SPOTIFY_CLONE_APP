import { StyleSheet } from 'react-native';
import { BOTTOM_NAVIGATION_HEIGHT, COLORS } from '@config';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
  },
  flatList: {
    marginBottom: BOTTOM_NAVIGATION_HEIGHT,
  },
  flatListContentContainer: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 16,
    gap: 6,
  },
  gradientOverlay: {
    zIndex: -2,
  },
});
