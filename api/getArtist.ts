import axios from "axios";
import { ArtistModel } from "@models";
import { ArtistResponseType } from "./types";
import { auth } from "./auth";

const parseArtistData = (data: ArtistResponseType): ArtistModel => ({
  type: data.type,
  id: data.id,
  followers: data.followers,
  genres: data.genres,
  images: data.images,
  name: data.name,
  popularity: 85,
});

export const getArtist = async (artistId: string): Promise<ArtistModel> => {
  try {
    const { token } = await auth();

    const response = (await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as { data: ArtistResponseType };

    return parseArtistData(response.data);
  } catch (error) {
    console.error(`Error fetching artists data (ID: ${artistId})`, error);
    throw error;
  }
};
