import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  albumBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -3,
  },
  albumBackgroundBlurredImage: {
    zIndex: -4,
    width: '100%',
    height: '100%',
  },
  albumBackgroundDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -3,
  },
});
