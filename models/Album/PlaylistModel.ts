export type PlaylistModel = {
  id: string;
  type: 'album';
  albumType: 'album' | 'single' | 'compilation';
  name: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  artists: { type: 'artist'; id: string }[];
  releaseDate: string;
  tracks: {
    previous: string | null;
    next: string | null;
    limit: number;
    offset: number;
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
