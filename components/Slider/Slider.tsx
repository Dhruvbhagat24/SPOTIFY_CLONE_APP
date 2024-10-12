import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import { useRouter } from 'expo-router';

import { Card } from '../Card';

import { translations } from '@data';
import { Shapes, Sizes } from '@config';
import { LibraryItemModel } from '@models';

import { styles } from './styles';

export type SliderPropsType = {
  title: string;
  slides: LibraryItemModel[];
  size?: Sizes;
  shape?: Shapes;
  withShowAll: boolean;
};

export const Slider = ({
  title,
  slides,
  size = Sizes.BIG,
  shape = Shapes.SQUARE,
  withShowAll = false,
}: SliderPropsType) => (
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
            {translations.showAll}
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
      <View style={styles.scrollViewContainer}>
        {slides.map(({ id, type, title, subtitle, imageURL }) => (
          <Card
            key={id}
            id={id}
            type={type}
            shape={shape}
            size={size}
            title={title}
            subtitle={subtitle}
            imageURL={imageURL}
          />
        ))}
      </View>
    </ScrollView>
  </View>
);
