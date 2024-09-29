declare global {
  import { StackNavigationProp } from '@react-navigation/stack';
  type RootStackParamList = {
    home: undefined;
    library: undefined;
    search: undefined;
    albums: undefined;
    artists: undefined;
    'albums/[albumId]': { albumId: string };
    'artists/[artistId]': { artistId: string };
  };

  type AppNavigationProps = StackNavigationProp<RootStackParamList>;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.otf';
declare module '*.mp3';

export {};
