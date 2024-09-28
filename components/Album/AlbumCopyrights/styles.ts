import { StyleSheet } from "react-native";
import { BOTTOM_NAVIGATION_HEIGHT, COLORS } from "@config";

export const styles = StyleSheet.create({
  view: {
    marginTop: 20,
    paddingBottom: BOTTOM_NAVIGATION_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "column",
  },
  text: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 14,
    fontFamily: "SF-Regular",
    color: COLORS.WHITE,
  },
});
