import { PlaylistResponseType, SEPARATOR } from '@config';
import { translations } from '@data';
import { PlaylistModel } from '@models';
import { getDisplayTime } from '../../common';

export const parseToPlaylist = (data: PlaylistResponseType): PlaylistModel => ({
  type: data.type,
  id: data.id,
  title: data.name,
  description: data.description,
  subtitle: data.owner.display_name,
  ownerId: data.owner.id,
  info: `${data.followers.total} ${translations.saves} ${SEPARATOR} ${getDisplayTime(data.tracks.items.reduce((a, b) => a + b.track.duration_ms, 0))}`,
  imageURL: data.images !== null ? data.images[0].url : '',
  tracks: data.tracks.items.map((item) => ({
    id: item.track.id,
    title: item.track.name,
    subtitle: item.track.artists.map((artist) => artist.name).join(', '),
    imageURL:
      item.track.album.images !== null &&
      item.track.album.images[0].url !== null
        ? item.track.album.images[0].url
        : '',
  })),
});
