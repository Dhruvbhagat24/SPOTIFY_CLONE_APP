import { COLORS, Shapes, TRACK_COVER_SIZE } from '@config';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  link: {
    borderRadius: Shapes.SQUARE_BORDER,
    backgroundColor: COLORS.SECONDARY,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 0,
  },
  imageView: {
    width: TRACK_COVER_SIZE,
    height: TRACK_COVER_SIZE,
    marginRight: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontFamily: 'SF-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
});
