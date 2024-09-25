import * as React from "react";

// eslint-disable-next-line import/no-unresolved
import { auth } from "@api";

import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

export type LoginPropsType = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const Login = ({ setIsLoggedIn }: LoginPropsType) => {
  const handlePress = async () => {
    try {
      await auth();
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to get auth token:", error);
      setIsLoggedIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pessable} onPress={handlePress}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </View>
  );
};
