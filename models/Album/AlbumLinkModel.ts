export type AlbumLinkModel = {
  type: 'album';
  albumType: 'album' | 'single' | 'compilation';
  id: string;
  name: string;
  releaseDate: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
};
