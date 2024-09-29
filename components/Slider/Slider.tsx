import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import { useRouter } from 'expo-router';

import { Album } from '../Album';

import { translations } from '@data';
import { ALBUM_IMAGE_SIZE_VARIANT, SEPARATOR } from '@config';
import { AlbumModel } from '@models';

import { styles } from './styles';

export type SliderPropsType = {
  title: string;
  slides: AlbumModel[];
  size?: 'small' | 'medium' | 'big';
  shape?: 'square' | 'squareBorder' | 'circle';
  withShowAll: boolean;
};

export const Slider = ({
  title,
  slides,
  size = 'big',
  shape = 'square',
  withShowAll = false,
}: SliderPropsType) => {
  // const router = useRouter();

  return (
    <View style={styles.container} testID="recommended-albums-section">
      <View style={styles.header}>
        <Text
          numberOfLines={1}
          style={styles.headerTitleText}
          testID="header-title-text"
        >
          {title}
        </Text>
        {withShowAll && (
          <Pressable style={styles.headerPressable}>
            <Text
              style={styles.headerPressableText}
              testID="header-pressable-text"
            >
              {translations.album.slider.pressableText}
            </Text>
          </Pressable>
        )}
      </View>
      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        testID="albums-scroll-view"
      >
        {slides.map(({ id, name, releaseDate, albumType, images }) => (
          <Album
            key={id}
            id={id}
            shape={shape}
            size={size}
            title={name}
            subtitle={`${releaseDate} ${SEPARATOR} ${translations.album.type[albumType]}`}
            imageUrl={images[ALBUM_IMAGE_SIZE_VARIANT].url}
          />
        ))}
      </ScrollView>
    </View>
  );
};
