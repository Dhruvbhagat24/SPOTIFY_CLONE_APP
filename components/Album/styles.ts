import { StyleSheet } from 'react-native';
import { COLORS, Shapes, Sizes } from '@config';

export const styling = (size: Sizes, shape: Shapes) =>
  StyleSheet.create({
    album: {
      width: size,
      marginVertical: 8,
    },
    albumImageView: {
      overflow: 'hidden',
      position: 'relative',
      width: size,
      height: size,
      borderRadius: shape,
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
      maxWidth: size,
      marginTop: 10,
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
