import * as React from "react";
import { Login, BackgroundGradient } from "@components";

export type LoginScreenPropsType = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const LoginScreen = ({ setIsLoggedIn }: LoginScreenPropsType) => {
  return (
    <>
      <BackgroundGradient />
      <Login setIsLoggedIn={setIsLoggedIn} />
    </>
  );
};
