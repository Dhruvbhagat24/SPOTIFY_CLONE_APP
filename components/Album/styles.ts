import { COLORS } from "@config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  albumImageView: {
    ...StyleSheet.absoluteFillObject,
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
  content: {
    paddingHorizontal: 5,
  },
  nameText: {
    color: COLORS.WHITE,
    textAlign: "center",
    fontFamily: "SF-Bold",
    fontWeight: "bold",
    fontSize: 25,
    lineHeight: 25,
    marginRight: "auto",
  },
  artistsText: {
    color: COLORS.WHITE,
    textAlign: "center",
    fontFamily: "SF-Bold",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 14,
    marginTop: 13,
    marginRight: "auto",
  },

  albumTypeReleaseDateView: {
    flexDirection: "row",
    alignItems: "center",
  },
  albumTypeReleaseDateText: {
    color: COLORS.LIGHT_GREY,
    textAlign: "center",
    fontFamily: "SF-Regular",
    fontSize: 13,
    lineHeight: 13,
    marginTop: 9,
    textTransform: "capitalize",
  },
  separator: {
    fontSize: 13,
    fontFamily: "SF-Bold",
    fontWeight: "900",
    marginHorizontal: 4,
  },
  releaseDateText: {
    marginRight: "auto",
  },
  pressablesView: {
    maxWidth: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
  },
  likeIcon: {
    fontSize: 20,
    color: COLORS.LIGHT_GREY,
  },
  likeIconActive: {
    color: COLORS.TINT,
  },
  isAlbumSavedContainer: {
    marginHorizontal: "auto",
    alignItems: "center",
    justifyContent: "center",
    width: 21,
    height: 21,
    borderRadius: 13,
    borderWidth: 1.5,
    backgroundColor: "transparent",
    borderColor: COLORS.LIGHT_GREY,
  },
  isAlbumSavedIcon: {
    fontSize: 12,
    top: 0.5,
    left: 0.5,
    color: COLORS.LIGHT_GREY,
  },
  isAlbumSavedContainerActive: {
    backgroundColor: COLORS.TINT,
    borderColor: COLORS.TINT,
  },
  isAlbumSavedIconActive: {
    color: COLORS.PRIMARY,
  },
  moreIcon: {
    fontSize: 20,
    color: COLORS.LIGHT_GREY,
  },
  tracks: {
    marginTop: 14,
    gap: 6,
  },
});
