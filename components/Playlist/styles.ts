import { StyleSheet } from 'react-native';
import { COLORS } from '@config';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
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
