import * as React from "react";
import {
  AnimatedProp,
  Canvas,
  Color,
  LinearGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { useApplicationDimensions } from "@hooks";

import { styles as defaultStyles } from "./styles";

export type BackgroundGradientPropsType = {
  colors?: AnimatedProp<Color[]>;
  width?: number;
  height?: number;
  styles?: object;
};

export const BackgroundGradient = ({
  colors = ["#2e335a", "#1c1b33"],
  width,
  height,
  styles = {},
}: BackgroundGradientPropsType) => {
  const { width: appWidth, height: appHeight } = useApplicationDimensions();

  return (
    <Canvas style={[defaultStyles.backgroundCanvas, styles]}>
      <Rect x={0} y={0} width={width || appWidth} height={height || appHeight}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(0, height || appHeight)}
          colors={colors}
        />
      </Rect>
    </Canvas>
  );
};
