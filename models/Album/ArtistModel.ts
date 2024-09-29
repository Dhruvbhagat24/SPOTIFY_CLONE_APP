export type ArtistModel = {
  type: 'artist';
  id: string;
  name: string;
  followers: { href: string | null; total: number };
  genres: string[];
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  popularity: number;
};
