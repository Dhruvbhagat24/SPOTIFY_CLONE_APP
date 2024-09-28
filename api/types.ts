type ImageType = {
  url: string;
  height: number;
  width: number;
};

export type AlbumResponseType = {
  id: string;
  type: "album";
  album_type: "album" | "single" | "compilation";
  name: string;
  images: ImageType[];
  artists: {
    type: "artist";
    id: string;
  }[];
  release_date: string;
  tracks: {
    previous: string | null;
    next: string | null;
    limit: number;
    offset: number;
    total: number;
    items: {
      id: string;
      type: "track";
      name: string;
      duration_ms: number;
      explicit: boolean;
      artists: { name: string }[];
    }[];
  };
  copyrights: { text: string; type: string }[];
  genres: string[];
  label: string;
  popularity: number;
};

export type ArtistResponseType = {
  id: string;
  type: "artist";
  uri: string;
  name: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  genres: string[];
  popularity: number;
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  external_urls: {
    spotify: string;
  };
};
