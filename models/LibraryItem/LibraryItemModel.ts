export type LibraryItemModel = {
  id: string;
  type: 'artist' | 'album' | 'show';
  title: string;
  imageURL: string;
  subtitle: string;
};
