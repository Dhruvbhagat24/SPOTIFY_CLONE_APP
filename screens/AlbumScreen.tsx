import * as React from "react";

import { AlbumModel } from "@models";

import { checkSavedTracks, getAlbum } from "@api";
import { ALBUM_ID } from "@data";
import { Album } from "@components";

export const AlbumScreen = () => {
  const [albumData, setAlbumData] = React.useState<AlbumModel | null>(null);
  const [isAlbumSaved, setIsAlbumSaved] = React.useState<boolean | null>(null);
  const [savedTracks, setSavedTracks] = React.useState<boolean[] | null>(null);

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
    <Album
      data={albumData as AlbumModel}
      isAlbumSaved={isAlbumSaved as boolean}
      savedTracks={savedTracks as boolean[]}
    />
  );
};
