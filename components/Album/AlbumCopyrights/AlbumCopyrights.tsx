import * as React from "react";
import { Text, View } from "react-native";

import { COPYRIGHT_SIGN, SOUND_COPYRIGHT_SIGN } from "@config";
import { styles } from "./styles";

export type AlbumCopyrightsPropsType = {
  copyrights: { text: string; type: string }[];
};

const getDisplayText = (text: string, type: string) => {
  if (text[0] === COPYRIGHT_SIGN || text[0] === SOUND_COPYRIGHT_SIGN) {
    return text;
  }

  if (type === "P") {
    return `${SOUND_COPYRIGHT_SIGN} ${text}`;
  }

  if (type === "C") {
    return `${COPYRIGHT_SIGN} ${text}`;
  }

  return text;
};

export const AlbumCopyrights = ({ copyrights }: AlbumCopyrightsPropsType) => {
  return (
    <View style={styles.view} testID="copyright-view">
      {copyrights.map((copyright, index) => (
        <Text
          key={index}
          style={styles.text}
          testID={`copyright-text-${index}`}
        >
          {getDisplayText(copyright.text, copyright.type)}
        </Text>
      ))}
    </View>
  );
};
