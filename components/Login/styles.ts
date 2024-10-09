import { StyleSheet } from 'react-native';
import { COLORS } from '@config';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    backgroundColor: COLORS.TINT,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.SECONDARY,
  },
  content: {
    maxWidth: 350,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -50,
  },
  description: {
    color: COLORS.LIGHTER_GREY,
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '900',
  },
});
