import { StyleSheet } from 'react-native';
import { COLORS } from '@config';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
  },
  gradientOverlay: {
    zIndex: -2,
  },
});
