import { ALBUM_HEADER_HEIGHT, BOTTOM_NAVIGATION_HEIGHT, COLORS } from "@config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  albumGradientOverlay: {
    zIndex: -2,
  },
  albumGoBackPressable: {
    ...StyleSheet.absoluteFillObject,
    left: 6,
    width: 32,
    zIndex: 99,
  },
  albumGoBackIcon: {
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
  scrollView: {},

  albumImageView: {
    elevation: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
  },
  albumImage: {
    marginTop: 30,
    marginHorizontal: "auto",
  },
  albumTracks: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
    gap: 6,
    paddingBottom: BOTTOM_NAVIGATION_HEIGHT + ALBUM_HEADER_HEIGHT,
  },
});
