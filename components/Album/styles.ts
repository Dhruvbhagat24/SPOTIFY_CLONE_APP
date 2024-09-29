import { StyleSheet } from 'react-native';
import { COLORS } from '@config';

export const styles = StyleSheet.create({
  album: {
    padding: 8,
  },
  albumImageView: {
    overflow: 'hidden',
    position: 'relative',
  },
  small: {
    width: 100,
    height: 100,
  },
  medium: {
    width: 140,
    height: 140,
  },
  big: {
    width: 152,
    height: 152,
  },
  square: {
    borderRadius: 0,
  },
  squareBorder: {
    borderRadius: 4,
  },
  circle: {
    borderRadius: 100,
  },
  albumImage: {
    ...StyleSheet.absoluteFillObject,
  },
  albumInfo: {},
  albumTitleText: {
    fontSize: 15,
    lineHeight: 15,
    fontFamily: 'SF-Bold',
    fontWeight: '600',
    color: COLORS.WHITE,
    maxWidth: 140,
    marginTop: 10,
  },
  smallTitle: {
    maxWidth: 100,
  },
  mediumTitle: {
    maxWidth: 140,
  },
  bigTitle: {
    maxWidth: 152,
  },
  albumSubtitleText: {
    flexDirection: 'row',
    marginTop: 5,
    fontSize: 13,
    lineHeight: 13,
    fontFamily: 'SF-Regular',
    color: COLORS.LIGHT_GREY,
  },
});
