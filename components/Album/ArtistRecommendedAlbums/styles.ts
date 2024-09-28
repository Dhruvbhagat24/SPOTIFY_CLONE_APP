import { StyleSheet } from "react-native";
import { COLORS } from "@config";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    paddingTop: 35,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  headerTitleText: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: "SF-Bold",
    fontWeight: "600",
    color: COLORS.WHITE,
    letterSpacing: -1.2,
  },
  headerPressable: {},
  headerPressableText: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: "SF-Bold",
    fontWeight: "800",
    color: COLORS.LIGHT_GREY,
  },
  scrollView: {
    paddingVertical: 4,
  },
  album: {
    padding: 8,
  },

  ////////////////////////////////////////////////////////////////////
  ///////////// TODO: MOVE THIS TO INDEPENDENT COMPONENT /////////////
  ////////////////////////////////////////////////////////////////////
  albumImageView: {
    width: 140,
    height: 140,
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  albumImage: {
    ...StyleSheet.absoluteFillObject,
  },
  albumInfo: {},
  albumTitleText: {
    fontSize: 15,
    lineHeight: 15,
    fontFamily: "SF-Bold",
    fontWeight: "600",
    color: COLORS.WHITE,
    maxWidth: 140,
    marginTop: 10,
  },
  albumSubtitleView: {
    flexDirection: "row",
    marginTop: 5,
  },
  albumYearText: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: "SF-Regular",
    color: COLORS.LIGHT_GREY,
  },
  albumSubtitleSeparator: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: "SF-Bold",
    fontWeight: "900",
    color: COLORS.LIGHT_GREY,
    marginHorizontal: 4,
  },
  albumTypeText: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: "SF-Regular",
    color: COLORS.LIGHT_GREY,
  },
  ////////////////////////////////////////////////////////////////////
  //////////////// MOVE THIS TO INDEPENDENT COMPONENT ////////////////
  ////////////////////////////////////////////////////////////////////
});
