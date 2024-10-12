import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { SEPARATOR } from '@config';
import { translations } from '@data';

import { AnimatedPressable } from '../../AnimatedPressable';
import { styles } from './styles';
import { checkSavedAlbums } from '@api';

export type PlaylistInfoPropsType = {
  id: string;
  name: string;
  artists: string;
  albumType: 'album' | 'single' | 'compilation';
  releaseDate: string;
};

export const PlaylistInfo = ({
  id,
  name,
  artists,
  albumType,
  releaseDate,
}: PlaylistInfoPropsType) => {
  const [isSaved, setIsSaved] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        const savedAlbums = await checkSavedAlbums([id]);
        setIsSaved(savedAlbums[0]);
      } catch (error) {
        setIsSaved(false);
        console.error('Failed to check if album is saved:', error);
      }
    })();
  }, [id]);

  return (
    <View style={styles.albumInfo}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.artistsText}>{artists}</Text>
      <View style={styles.albumTypeReleaseDateView}>
        <Text style={styles.albumTypeReleaseDateText}>
          {translations.type[albumType]}
        </Text>
        <Text style={[styles.albumTypeReleaseDateText, styles.separator]}>
          {SEPARATOR}
        </Text>
        <Text style={[styles.albumTypeReleaseDateText, styles.releaseDateText]}>
          {releaseDate}
        </Text>
      </View>

      <View style={styles.pressablesView}>
        <AnimatedPressable
          defaultIcon="plus"
          activeIcon="check"
          isActive={isSaved}
        />
        <AnimatedPressable
          defaultIcon="arrow-down"
          activeIcon="arrow-down"
          // TODO: removed this true value and check if tracks are downloaded instead
          isActive={true}
        />
        <Pressable>
          <Entypo style={styles.moreIcon} name="dots-three-horizontal" />
        </Pressable>
      </View>
    </View>
  );
};
