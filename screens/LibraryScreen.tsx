import * as React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@config';

export const LibraryScreen = () => {
  const { top: statusBarOffset } = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: statusBarOffset,
        backgroundColor: COLORS.PRIMARY,
        height: '100%',
      }}
    >
      <Text>Library Screen</Text>
    </View>
  );
};
