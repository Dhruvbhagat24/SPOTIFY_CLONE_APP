import { StyleSheet } from 'react-native';
import { COLORS } from '@config';

export const styles = StyleSheet.create({
  albumImageView: {
    elevation: 20,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
  },
  albumImage: {
    marginTop: 30,
    marginHorizontal: 'auto',
  },
});
