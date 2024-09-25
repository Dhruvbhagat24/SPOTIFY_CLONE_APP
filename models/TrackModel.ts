import { ArtistModel } from "./ArtistModel";

export type TrackModel = {
  id: string;
  type: "track";
  name: string;
  duration_ms: number;
  explicit: boolean;
  artists: ArtistModel[];
  // linked_from: {
  //   external_urls: {
  //     spotify: string;
  //   };
  //   href: string;
  //   id: string;
  //   type: string;
  //   uri: string;
  // };
};
