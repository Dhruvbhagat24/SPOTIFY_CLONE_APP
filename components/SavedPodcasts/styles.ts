import { StyleSheet } from 'react-native';
import { BOTTOM_NAVIGATION_HEIGHT, COLORS } from '@config';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 16,
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    paddingBottom: BOTTOM_NAVIGATION_HEIGHT,
  },
});
