import * as React from 'react';
import { View } from 'react-native';

import { LibraryHeader } from '@components';
import { useApplicationDimensions } from '@hooks';

export type LibraryScreenPropsType = {
  children: React.ReactNode;
};

export const LibraryScreen = ({ children }: LibraryScreenPropsType) => {
  const { width, height } = useApplicationDimensions();

  return (
    <View style={{ width, height }}>
      <LibraryHeader />
      {children}
    </View>
  );
};
