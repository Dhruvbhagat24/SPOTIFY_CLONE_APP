import * as React from 'react';
import { Text } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

export default function Artist() {
  const local = useLocalSearchParams();

  return <Text>{local.artistId}</Text>;
}
