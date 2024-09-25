import { ArtistModel } from "./ArtistModel";
import { TrackModel } from "./TrackModel";

export type AlbumType = "album" | "single" | "compilation";

export type AlbumImageModel = {
  url: string;
  height: number;
  width: number;
};

export type AlbumCopyrightModel = {
  text: string;
  type: string;
};

export type AlbumModel = {
  id: string;
  type: "album";
  album_type: AlbumType;
  name: string;
  images: AlbumImageModel[];
  artists: ArtistModel[];
  release_date: string;
  tracks: {
    previous: string | null;
    next: string | null;
    limit: number;
    offset: number;
    total: number;
    items: TrackModel[];
  };
  copyrights: AlbumCopyrightModel[];
  genres: string[];
  label: string;
  popularity: number;
};
