export type ExpoConfigType = {
  extra: { [key: string]: string };
};

export enum AuthResponse {
  CANCEL = 'cancel',
  DISMISS = 'dismiss',
  OPENED = 'opened',
  LOCKED = 'locked',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum AlbumTypes {
  ALBUM = 'album',
  SINGLE = 'single',
  COMPILATION = 'compilation',
}

export enum SizeTypes {
  BIG = 152,
  MEDIUM = 140,
  SMALL = 120,
  VER_SMALL = 100,
}

export enum ShapeTypes {
  SQUARE = 'square',
  SQUARE_BORDER = 'squareBorder',
  CIRCLE = 'circle',
}

type ImageType = {
  url: string;
  height: number;
  width: number;
};

export type AlbumResponseType = {
  id: string;
  type: 'album';
  album_type: 'album' | 'single' | 'compilation';
  name: string;
  images: ImageType[];
  artists: {
    type: 'artist';
    name: string;
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
      type: 'track';
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
  type: 'artist';
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

export type AlbumsResponseType = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: 888;
  items: AlbumResponseType[];
};

export type SavedAlbumsResponseType = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: 888;
  items: { album: AlbumResponseType }[];
};
