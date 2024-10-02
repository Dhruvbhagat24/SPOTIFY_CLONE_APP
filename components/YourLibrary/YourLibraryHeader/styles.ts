import { COLORS, SHAPES } from '@config';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    paddingBottom: 16,
    elevation: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 20,
    zIndex: 99,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 35,
    height: 35,
    overflow: 'hidden',
    borderRadius: SHAPES.CIRCLE,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: 'SF-Bold',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 22,
    marginLeft: 8,
    marginRight: 'auto',
  },
  icon: {
    fontSize: 30,
    color: COLORS.WHITE,
    marginLeft: 16,
  },
  scrollView: {
    marginTop: 16,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  category: {
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: SHAPES.CIRCLE,
  },
  categoryText: {
    color: COLORS.WHITE,
  },
});
