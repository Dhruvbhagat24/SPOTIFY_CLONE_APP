export enum PLATFORMS {
  IOS = 'ios',
  ANDROID = 'android',
  WINDOWS = 'windows',
  MACOS = 'macos',
  WEB = 'web',
}

export enum Pages {
  HOME = 'home',
  SEARCH = 'search',
  LIBRARY = 'library',
}

export enum Sizes {
  BIG = 152,
  MEDIUM = 140,
  SMALL = 120,
  VER_SMALL = 100,
}

export enum Shapes {
  SQUARE = 0,
  SQUARE_BORDER = 4,
  OVAL = 20,
  CIRCLE = 9999,
}

export enum Categories {
  SAVED_PLAYLISTS = 'playlist',
  SAVED_PODCASTS = 'show',
  SAVED_ALBUMS = 'album',
  FOLLOWED_ARTISTS = 'artist',
  DOWNLOADED = 'downloaded',
  ALL = 'all',
}

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

export const SEPARATOR = '\u2022';

export const SOUND_COPYRIGHT_SIGN = '\u2117';
export const COPYRIGHT_SIGN = '\u00A9';

export const ALBUM_HEADER_HEIGHT = 100;
export const LIBRARY_HEADER_HEIGHT = 135;
export const BOTTOM_NAVIGATION_HEIGHT = 90;

export const COVER_SIZE = 300;
export const TRACK_COVER_SIZE = 50;
export const RECENTLY_PLAYED_COVER_SIZE = 55;
