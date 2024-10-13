import { AlbumModel, ArtistModel, PlaylistModel } from '@models';

export const AlbumFallback = {
  id: '',
  type: 'album', //TODO: to be changed to get this value from props
  albumType: 'album', //TODO: to be changed to get this value from props
  name: 'Album', //TODO: this init value will be based on "type" and "albumType" (for example "Album" or "Compilation" or even "Playlist")
  imageURL: '',
  artists: [{ id: '', type: 'artist' }],
  releaseDate: '2024',
  tracks: {
    total: 10,
    items: [
      ...Array(10).fill({
        id: '',
        title: 'Track',
        subtitle: 'track',
        explicit: false,
      }),
    ],
  },
  duration: 50000,
  copyrights: [...Array(2).fill({ text: 'Copyright', type: 'C' })],
  genres: [],
  label: '',
} as AlbumModel;

export const ArtistFallback = [
  ...Array(1).fill({
    type: 'artist',
    id: '',
    name: 'Artist',
    imageURL: '',
  }),
] as ArtistModel[];

export const PlaylistFallback = {
  type: 'playlist',
  id: '',
  title: 'Playlist',
  subtitle: 'Owner',
  ownerId: '',
  info: '',
  description: '',
  imageURL: '',
  tracks: [
    ...Array(10).fill({
      id: '',
      title: 'Track',
      subtitle: 'track',
      imageURL: '',
    }),
  ],
} as PlaylistModel;
