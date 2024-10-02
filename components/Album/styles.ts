import { StyleSheet } from 'react-native';
import { COLORS, ShapeTypes, SizeTypes } from '@config';

const getBorderRadius = (shape: string) => {
  if (shape === ShapeTypes.SQUARE) {
    return 0;
  }
  if (shape === ShapeTypes.SQUARE_BORDER) {
    return 4;
  }
  if (shape === ShapeTypes.CIRCLE) {
    return 100;
  }

  return 0;
};

export const styling = (size: SizeTypes, shape: string) =>
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
      borderRadius: getBorderRadius(shape),
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
