import * as React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Album } from "../components/Album/Album";
import { BackgroundGradient } from "../components/BackgroundGradient";

import { AlbumModel } from "@models";
import { useApplicationDimensions } from "@hooks";
import { BOTTOM_NAVIGATION_HEIGHT, COLORS } from "@config";

// eslint-disable-next-line import/no-unresolved
import { checkSavedTracks, getAlbum } from "@api";
import { ALBUM_ID } from "@data";

export const HomeScreen = () => {
  const [albumData, setAlbumData] = React.useState<AlbumModel | null>(null);
  const [isAlbumSaved, setIsAlbumSaved] = React.useState<boolean | null>(null);
  const [savedTracks, setSavedTracks] = React.useState<boolean[] | null>(null);
  const { width } = useApplicationDimensions();
  const { top: statusBarOffset } = useSafeAreaInsets();

  React.useEffect(() => {
    (async () => {
      try {
        const album = await getAlbum(ALBUM_ID);
        setAlbumData(album);

        //TODO: get user-library-read access trough oAuth
        // const savedAlbums = await checkSavedAlbums([ALBUM_ID]);
        const savedAlbums = [true];
        setIsAlbumSaved(savedAlbums[0]);

        const tracks = album.tracks.items;

        if (savedAlbums[0]) {
          setSavedTracks([...Array(tracks.length).fill(true)]);
          return;
        }

        const trackIdsArr = tracks.map((track) => track.id);
        const savedTracksArr = await checkSavedTracks(trackIdsArr);

        setSavedTracks(savedTracksArr);
      } catch (error) {
        setAlbumData(null);
        setIsAlbumSaved(null);
        setSavedTracks(null);
        console.error("Failed to get album data:", error);
      }
    })();
  }, []);

  if (albumData === null || isAlbumSaved === null || savedTracks === null) {
    return null;
  }

  return (
    <View
      style={{
        width,
        paddingTop: statusBarOffset,
        paddingBottom: BOTTOM_NAVIGATION_HEIGHT,
      }}
    >
      <BackgroundGradient
        colors={["#C33123" || COLORS.ALBUM_FALLBACK_GRADIENT, "#000000"]}
      />

      <Album
        data={albumData as AlbumModel}
        isAlbumSaved={isAlbumSaved as boolean}
        savedTracks={savedTracks as boolean[]}
      />
    </View>
  );
};
