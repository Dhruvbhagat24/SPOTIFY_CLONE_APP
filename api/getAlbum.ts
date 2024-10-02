import axios from 'axios';
import { auth } from './auth';
import { AlbumResponseType } from '@config';

export const getAlbum = async (albumId: string): Promise<AlbumResponseType> => {
  try {
    const { token } = await auth();

    const response = (await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: AlbumResponseType };

    return response.data;
  } catch (error) {
    console.error(`Error fetching album with an ID: ${albumId}`, error);
    throw error;
  }
};
