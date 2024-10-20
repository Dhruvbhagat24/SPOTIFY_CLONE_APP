import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { useRouter } from 'expo-router';

import { useApplicationDimensions } from '@hooks';
import { getRecentlyPlayed } from '@api';
import { RecentlyPlayedModel } from '@models';
import { RECENTLY_PLAYED_COVER_SIZE, RecentlyPlayedFallback } from '@config';
import { getFallbackImage } from '@utils';

import { styles } from './styles';

export const RecentlyPlayed = () => {
  const [recentlyPlayedData, setRecentlyPlayedData] = React.useState<
    RecentlyPlayedModel[] | null
  >(RecentlyPlayedFallback);
  const { width } = useApplicationDimensions();
  const router = useRouter();

  const gap = 8;
  const paddingHorizontal = 16;

  React.useEffect(() => {
    (async () => {
      try {
        const recentlyPlayed = await getRecentlyPlayed();
        setRecentlyPlayedData(recentlyPlayed);
      } catch (error) {
        setRecentlyPlayedData(null);
        console.error(error);
      }
    })();
  }, []);

  const fallbackImageSource = React.useMemo(
    () => getFallbackImage('single'),
    []
  );

  // TODO: get rid of this
  if (!recentlyPlayedData) {
    return null;
  }

  return (
    <View style={[styles.container, { gap, paddingHorizontal }]}>
      {recentlyPlayedData.map(({ id, title, imageURL }, index) => (
        <Pressable
          onPress={() => router.push(`/album/${id}`)}
          key={index}
          style={[
            styles.link,
            {
              width: width / 2 - paddingHorizontal - gap / 2,
            },
          ]}
        >
          <View
            style={[
              styles.imageView,
              {
                width: RECENTLY_PLAYED_COVER_SIZE,
                height: RECENTLY_PLAYED_COVER_SIZE,
              },
            ]}
          >
            <Image
              style={styles.image}
              source={imageURL ? { uri: imageURL } : fallbackImageSource}
            />
          </View>
          <Text
            numberOfLines={2}
            style={[
              styles.text,
              {
                width:
                  width / 2 -
                  paddingHorizontal -
                  gap / 2 -
                  RECENTLY_PLAYED_COVER_SIZE,
              },
            ]}
          >
            {title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
