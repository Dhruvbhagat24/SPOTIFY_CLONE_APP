import { StyleSheet } from 'react-native';
import { COLORS, SHAPES } from '@config';

export const styles = StyleSheet.create({
  link: {
    paddingTop: 20,
    backgroundColor: COLORS.PRIMARY,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageView: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: SHAPES.CIRCLE,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 15,
    lineHeight: 15,
    fontFamily: 'SF-Regular',
    color: COLORS.WHITE,
    marginLeft: 16,
  },
});
