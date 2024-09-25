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

import { styles } from "./styles";

export type BackgroundGradientPropsType = {
  colors?: AnimatedProp<Color[]>;
};

export const BackgroundGradient = ({
  colors = ["#2e335a", "#1c1b33"],
}: BackgroundGradientPropsType) => {
  const { width, height } = useApplicationDimensions();

  return (
    <Canvas style={styles.backgroundCanvas}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(0, height - 350)}
          colors={colors}
        />
      </Rect>
    </Canvas>
  );
};
