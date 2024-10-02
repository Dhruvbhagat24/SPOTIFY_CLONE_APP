import { COLORS } from '@config';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 16,
    paddingBottom: 16,
    elevation: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 20,
    zIndex: 99,
  },
  titleText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: 'SF-Bold',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 15,
    marginBottom: 8,
    paddingVertical: 40,
  },
  scrollView: {},
  content: {},
  profile: {
    width: 35,
    height: 35,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  icon: {},
});
