import { COLORS } from "@config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pessable: {
    paddingVertical: 12,
    paddingHorizontal: 42,
    borderRadius: 8,
    backgroundColor: COLORS.TINT,
  },
  text: {
    color: COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "SF-Bold",
    fontSize: 24,
    fontWeight: "bold",
  },
});
