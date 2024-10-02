export type PlaylistModel = {
  id: string;
  type: 'album';
  albumType: 'album' | 'single' | 'compilation';
  name: string;
  imageURL: string;
  artists: { type: 'artist'; id: string }[];
  releaseDate: string;
  tracks: {
    total: number;
    items: {
      id: string;
      type: 'track';
      name: string;
      durationMs: number;
      explicit: boolean;
      artists: { name: string }[];
    }[];
  };
  copyrights: { text: string; type: string }[];
  genres: string[];
  label: string;
  popularity: number;
};
