import { ImageSourcePropType } from 'react-native';

export const getFallbackImage = (key: string) =>
  (
    ({
      album: require(`@assets/covers/disc.png`),
      single: require(`@assets/covers/note.png`),
      artist: require(`@assets/covers/user.png`),
      compilation: require(`@assets/covers/note.png`),
      episode: require(`@assets/covers/radio.png`),
      playlist: require(`@assets/covers/note.png`),
      podcast: require(`@assets/covers/radio.png`),
      show: require(`@assets/covers/radio.png`),
    }) as unknown as { [key: string]: ImageSourcePropType }
  )[key];
