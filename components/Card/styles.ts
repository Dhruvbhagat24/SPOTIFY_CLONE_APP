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
      backgroundColor: COLORS.SECONDARY,
      justifyContent: 'center',
      alignItems: 'center',
    },
    albumImage: {
      ...StyleSheet.absoluteFillObject,
      color: COLORS.GREY,
    },
    albumInfo: {},
    albumTitleText: {
      fontSize: 13,
      lineHeight: 13,
      fontFamily: 'SF-Bold',
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
