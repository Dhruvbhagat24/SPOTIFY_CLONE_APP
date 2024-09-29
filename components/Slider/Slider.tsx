// import * as React from 'react';
// import { Pressable, Text, View } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useRouter } from 'expo-router';

// import { styles } from './styles';

// export type SliderPropsType<SlidesType> = {
//   slides: SlidesType;
//   type: 'album' | 'artist';
//   slideSize: 'small' | 'medium' | 'big';
//   title: string;
//   withShowAll: boolean;
// };

// export const Slider = <SlidesType extends object[]>({
//   slides,
// }: SliderPropsType<SlidesType>) => {
//   const router = useRouter();

//   return (
//     <View style={styles.container} testID="recommended-albums-section">
//       <View style={styles.header}>
//         <Text
//           numberOfLines={1}
//           style={styles.headerTitleText}
//           testID="header-title-text"
//         >
//           {`${translations.album.artistRecommendedAlbums.headerText} ${artist}`}
//         </Text>
//         <Pressable style={styles.headerPressable}>
//           <Text
//             style={styles.headerPressableText}
//             testID="header-pressable-text"
//           >
//             {translations.album.artistRecommendedAlbums.pressableText}
//           </Text>
//         </Pressable>
//       </View>
//       <ScrollView
//         style={styles.scrollView}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         testID="albums-scroll-view"
//       >
//         {slides.map((slides, index) => (

//         ))}
//       </ScrollView>
//     </View>
//   );
// };
