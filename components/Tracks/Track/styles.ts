import { COLORS, Shapes, TRACK_COVER_SIZE } from '@config';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 58,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: TRACK_COVER_SIZE,
    height: TRACK_COVER_SIZE,
    marginRight: 10,
  },
  content: {
    marginRight: 'auto',
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 280,
    overflow: 'hidden',
  },
  isPlayingIcon: {
    marginRight: 6,
    fontSize: 13,
    color: COLORS.TINT,
  },
  nameText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: 'SF-Regular',
    fontSize: 17,
  },
  nameTextActive: {
    color: COLORS.TINT,
  },

  artistNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  isTrackDownloadedView: {
    width: 13,
    height: 13,
    borderRadius: Shapes.CIRCLE,
    backgroundColor: COLORS.TINT,
    position: 'relative',
    marginRight: 6,
  },
  isTrackDownloadedIcon: {
    ...StyleSheet.absoluteFillObject,
    top: 0.5,
    left: 0.5,
    color: COLORS.PRIMARY,
    fontSize: 12,
  },
  isTrackSavedPressable: {
    borderRadius: Shapes.CIRCLE,
    backgroundColor: COLORS.TINT,
    position: 'relative',
    marginRight: 25,
    padding: 4,
  },
  isTrackSavedIcon: {
    color: COLORS.PRIMARY,
    fontSize: 9,
  },
  artistNameText: {
    color: COLORS.LIGHT_GREY,
    textAlign: 'center',
    fontFamily: 'SF-Regular',
    fontSize: 14,
  },

  likePressable: {
    marginHorizontal: 15,
  },
  likeIcon: {
    fontSize: 20,
    color: COLORS.LIGHTER_GREY,
  },
  likeIconActive: {
    color: COLORS.TINT,
  },

  morePressable: {},
  moreIcon: {
    fontSize: 20,
    color: COLORS.LIGHTER_GREY,
  },
});
