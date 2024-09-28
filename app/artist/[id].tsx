import * as React from "react";
import { Text } from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function Artist() {
  const local = useLocalSearchParams();
  console.log(local);

  return <Text>{}</Text>;
}
