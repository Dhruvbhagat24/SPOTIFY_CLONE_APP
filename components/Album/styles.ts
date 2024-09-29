import { StyleSheet } from 'react-native';
import { COLORS } from '@config';

export const styles = StyleSheet.create({
  albumGradientOverlay: {
    zIndex: -2,
  },
  albumTracks: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
    gap: 6,
  },
});
