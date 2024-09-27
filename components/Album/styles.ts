import { ALBUM_HEADER_HEIGHT, BOTTOM_NAVIGATION_HEIGHT, COLORS } from "@config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  albumGradientOverlay: {
    zIndex: -2,
  },
  albumTracks: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
    gap: 6,
    paddingBottom: BOTTOM_NAVIGATION_HEIGHT + ALBUM_HEADER_HEIGHT,
  },
});
