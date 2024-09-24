import * as React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SearchScreen = () => {
  const { top: statusBarOffset } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: statusBarOffset, backgroundColor: "red" }}>
      <Text>Search Screen</Text>
    </View>
  );
};
