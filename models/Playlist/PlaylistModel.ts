export type PlaylistModel = {
  type: 'playlist';
  id: string;
  title: string;
  subtitle: string;
  ownerId: string;
  info: string;
  description: string;
  imageURL: string | '';
  tracks: {
    id: string;
    title: string;
    subtitle: string;
    imageURL: string | '';
  }[];
};
