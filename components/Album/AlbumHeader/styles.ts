import { COLORS } from "@config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  albumHeaderGoBackPressable: {
    ...StyleSheet.absoluteFillObject,
    left: 6,
    width: 32,
    zIndex: 99,
  },
  albumHeaderGoBackIcon: {
    fontSize: 32,
    color: COLORS.WHITE,
  },
  albumHeaderBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  albumHeaderContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  albumHeaderTitleText: {
    color: COLORS.WHITE,
    textAlign: "center",
    fontFamily: "SF-Bold",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 15,
    marginBottom: 8,
  },
});
