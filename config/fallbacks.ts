import { ArtistModel, PlaylistModel } from '@models';

export const AlbumFallback = {
  id: '',
  type: 'album', //TODO: to be changed to get this value from props
  albumType: 'album', //TODO: to be changed to get this value from props
  name: 'Album', //TODO: this init value will be based on "type" and "albumType" (for example "Album" or "Compilation" or even "Playlist")
  imageURL: '',
  releaseDate: '2024',
  artists: [{ id: '', type: 'artist' }],
  tracks: {
    items: [
      ...Array(10).fill({
        id: '',
        explicit: false,
        name: 'Track',
        type: 'track',
        durationMs: 5000,
        artists: [{ name: 'Artist' }],
      }),
    ],
    total: 10,
  },
  copyrights: [...Array(2).fill({ text: 'Copyright', type: 'C' })],
  genres: [],
  label: '',
} as PlaylistModel;

export const ArtistFallback = [
  ...Array(1).fill({
    type: 'artist',
    id: '',
    name: 'Artist',
    imageURL: '',
  }),
] as ArtistModel[];
