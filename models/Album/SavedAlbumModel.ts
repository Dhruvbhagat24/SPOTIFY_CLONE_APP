export type SavedAlbumModel = {
  type: 'album';
  albumType: 'album' | 'single' | 'compilation';
  id: string;
  name: string;
  artists: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};
