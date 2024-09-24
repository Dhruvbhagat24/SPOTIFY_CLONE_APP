declare global {
  import { StackNavigationProp } from "@react-navigation/stack";
  type RootStackParamList = {
    list: undefined;
  };

  type AppNavigationProps = StackNavigationProp<RootStackParamList>;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.otf";
declare module "*.mp3";

export {};
