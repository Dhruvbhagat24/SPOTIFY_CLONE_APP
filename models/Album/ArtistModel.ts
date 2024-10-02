export type ArtistModel = {
  type: 'artist';
  id: string;
  name: string;
  followers: { href: string | null; total: number };
  genres: string[];
  imageURL: string;
  popularity: number;
};
