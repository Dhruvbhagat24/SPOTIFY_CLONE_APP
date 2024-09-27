import * as React from "react";
import { Image, View } from "react-native";

import { styles } from "./styles";

export type AlbumBackgroundPropsType = {
  url: string;
  darkness?: number;
};

export const AlbumBackground = ({
  url,
  darkness = 0,
}: AlbumBackgroundPropsType) => {
  return (
    <View style={styles.albumBackground}>
      <View
        style={[
          styles.albumBackgroundDarkOverlay,
          { backgroundColor: `rgba(0, 0, 0, ${darkness})` },
        ]}
      />
      <Image
        blurRadius={100}
        style={styles.albumBackgroundBlurredImage}
        source={{ url }}
        resizeMode="cover"
      />
    </View>
  );
};
