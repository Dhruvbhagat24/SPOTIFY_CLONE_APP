import { COLORS } from '@config';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.PRIMARY,
  },
  dateText: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: 'SF-Bold',
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  totalView: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalTracksText: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: 'SF-Regular',
    color: COLORS.WHITE,
  },
  separator: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: 'SF-Bold',
    fontWeight: '900',
    color: COLORS.WHITE,
    marginHorizontal: 4,
  },
  totalDurationText: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: 'SF-Regular',
    color: COLORS.WHITE,
  },
});
