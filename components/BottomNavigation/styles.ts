import { StyleSheet } from 'react-native';
import { COLORS, BOTTOM_NAVIGATION_HEIGHT } from '@config';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 'auto',
    height: BOTTOM_NAVIGATION_HEIGHT,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 20,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
  },
  pressable: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    color: COLORS.GREY,
  },
  text: {
    color: COLORS.GREY,
    fontSize: 13,
    lineHeight: 13,
    textAlign: 'center',
    fontFamily: 'SF-Regular',
    marginTop: 5,
  },
  active: {
    color: COLORS.WHITE,
  },
});
