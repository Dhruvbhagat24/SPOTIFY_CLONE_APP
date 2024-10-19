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
  info: `${data.followers.total.toLocaleString()} ${translations.saves} ${SEPARATOR} ${getDisplayTime(data.tracks.items.reduce((a, b) => a + b.track.duration_ms, 0))}`,
  imageURL: data.images !== null ? data.images[0].url : '',
});
