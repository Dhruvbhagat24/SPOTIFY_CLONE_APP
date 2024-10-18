import {
  AlbumModel,
  ArtistModel,
  PlaylistModel,
  RecentlyPlayedModel,
} from '@models';

export const AlbumFallback = {
  id: '',
  type: 'album', //TODO: to be changed to get this value from props
  albumType: 'album', //TODO: to be changed to get this value from props
  name: '', //TODO: this init value will be based on "type" and "albumType" (for example "Album" or "Compilation" or even "Playlist")
  imageURL: '',
  artists: [{ id: '', type: 'artist' }],
  releaseDate: '2024',
  tracks: {
    total: 10,
    items: Array(10).fill({
      id: '',
      title: '',
      subtitle: '',
      explicit: false,
    }),
  },
  duration: 50000,
  copyrights: Array(2).fill({ text: '', type: 'C' }),
  genres: [],
  label: '',
} as AlbumModel;

export const ArtistFallback = Array(1).fill({
  type: 'artist',
  id: '',
  name: '',
  imageURL: '',
}) as ArtistModel[];

export const PlaylistFallback = {
  type: 'playlist',
  id: '',
  title: '',
  subtitle: '',
  ownerId: '',
  info: '',
  description: '',
  imageURL: '',
  tracks: Array(10).fill({
    id: '',
    title: '',
    subtitle: '',
    imageURL: '',
  }),
} as PlaylistModel;

export const RecentlyPlayedFallback = Array(8).fill({
  id: '',
  title: '',
  imageURL: '',
}) as RecentlyPlayedModel[];

export const SliderFallback = Array(6).fill({});
