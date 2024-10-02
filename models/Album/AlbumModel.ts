export type AlbumModel = {
  type: 'album';
  albumType: 'album' | 'single' | 'compilation';
  id: string;
  name: string;
  releaseDate: string;
  imageURL: string;
};
