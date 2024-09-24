import { StyleSheet } from "react-native";
import { BOTTOM_NAV_OFFSET, COLORS } from "@config";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: "auto",
    height: 90 + BOTTOM_NAV_OFFSET,
    paddingBottom: BOTTOM_NAV_OFFSET,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.NAV,
  },
  pressable: {
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    color: COLORS.GREY,
  },
  text: {
    color: COLORS.GREY,
    fontSize: 13,
    lineHeight: 13,
    textAlign: "center",
    fontFamily: "SF-Regular",
    marginTop: 5,
  },
  active: {
    color: COLORS.WHITE,
  },
});
