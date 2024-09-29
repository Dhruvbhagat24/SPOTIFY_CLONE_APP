import * as React from 'react';
import {
  AnimatedProp,
  Canvas,
  Color,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';
import Animated from 'react-native-reanimated';

import { useApplicationDimensions } from '@hooks';
import { styles as defaultStyles } from './styles';

export type BackgroundGradientPropsType = {
  colors?: AnimatedProp<Color[]>;
  width?: number;
  height?: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  styles?: object;
};

export const BackgroundGradient = ({
  colors = ['#2e335a', '#1c1b33'],
  width,
  height,
  startX,
  startY,
  endX,
  endY,
  styles = {},
}: BackgroundGradientPropsType) => {
  const { width: appWidth, height: appHeight } = useApplicationDimensions();
  const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

  return (
    <AnimatedCanvas style={[defaultStyles.backgroundCanvas, styles]}>
      <Rect x={0} y={0} width={width || appWidth} height={height || appHeight}>
        <LinearGradient
          start={vec(startX || 0, startY || 0)}
          end={vec(endX || 0, endY || height || appHeight)}
          colors={colors}
        />
      </Rect>
    </AnimatedCanvas>
  );
};
