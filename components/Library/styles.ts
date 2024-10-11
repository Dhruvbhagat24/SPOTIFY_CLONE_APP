import { StyleSheet } from 'react-native';
import { BOTTOM_NAVIGATION_HEIGHT, COLORS, Shapes } from '@config';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
  },
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 16,
  },
  flatList: {
    paddingBottom: BOTTOM_NAVIGATION_HEIGHT,
  },
  flatListColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  category: {
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Shapes.CIRCLE,
  },
  categoryText: {
    color: COLORS.WHITE,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
});
