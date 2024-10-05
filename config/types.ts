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

export type UserProfileResponseType = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null | string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
};

export type UserFollowedArtistsResponseType = {
  artists: {
    href: string;
    limit: 1;
    next: string;
    cursors: {
      after: string;
    };
    total: number;
    items: ArtistResponseType[];
  };
};
