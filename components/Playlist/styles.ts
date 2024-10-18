import { StyleSheet } from 'react-native';
import { BOTTOM_NAVIGATION_HEIGHT, COLORS } from '@config';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
  },
  scrollView: {
    marginBottom: BOTTOM_NAVIGATION_HEIGHT,
  },
  gradientOverlay: {
    zIndex: -2,
  },
});
