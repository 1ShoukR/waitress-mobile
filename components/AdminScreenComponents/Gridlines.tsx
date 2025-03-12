import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';
import Svg, { Defs, Pattern, Rect, Line } from 'react-native-svg';
import { COLORS } from '../../constants';

interface Dimensions {
  width: number;
  height: number;
}

interface GridlinesProps {
  style?: ViewStyle;
  width?: number;
  height?: number;
  scale?: number;
  cellSize?: number;
  quadrantSize?: number;
  lineColor?: string;
  thickLineColor?: string;
  thinLineWidth?: number;
  thickLineWidth?: number;
  children?: React.ReactNode;
}

const GridPattern = ({ 
  width, 
  height, 
  cellSize,
  quadrantSize,
  lineColor, 
  thickLineColor,
  thinLineWidth,
  thickLineWidth
}: {
  width: number;
  height: number;
  cellSize: number;
  quadrantSize: number;
  lineColor: string;
  thickLineColor: string;
  thinLineWidth: number;
  thickLineWidth: number;
}) => {
  return (
    <Pattern id="GridPattern" x={0} y={0} width={width} height={height} patternUnits="userSpaceOnUse">
      {/* Thin vertical lines */}
      {Array.from({ length: width / cellSize + 1 }).map((_, index) => (
        <Line
          key={`v-${index}`}
          x1={index * cellSize}
          y1={0}
          x2={index * cellSize}
          y2={height}
          stroke={lineColor}
          strokeWidth={thinLineWidth}
        />
      ))}
      
      {/* Thin horizontal lines */}
      {Array.from({ length: height / cellSize + 1 }).map((_, index) => (
        <Line
          key={`h-${index}`}
          x1={0}
          y1={index * cellSize}
          x2={width}
          y2={index * cellSize}
          stroke={lineColor}
          strokeWidth={thinLineWidth}
        />
      ))}

      {/* Thick vertical lines */}
      {Array.from({ length: width / (cellSize * quadrantSize) + 1 }).map((_, index) => (
        <Line
          key={`v-thick-${index}`}
          x1={index * cellSize * quadrantSize}
          y1={0}
          x2={index * cellSize * quadrantSize}
          y2={height}
          stroke={thickLineColor}
          strokeWidth={thickLineWidth}
        />
      ))}

      {/* Thick horizontal lines */}
      {Array.from({ length: height / (cellSize * quadrantSize) + 1 }).map((_, index) => (
        <Line
          key={`h-thick-${index}`}
          x1={0}
          y1={index * cellSize * quadrantSize}
          x2={width}
          y2={index * cellSize * quadrantSize}
          stroke={thickLineColor}
          strokeWidth={thickLineWidth}
        />
      ))}
    </Pattern>
  );
};

export const Gridlines = ({
  style,
  width: propWidth,
  height: propHeight,
  scale = 1,
  cellSize = 40,
  quadrantSize = 3,
  lineColor = COLORS.gray || "#ddd",
  thickLineColor = COLORS.black || "#000",
  thinLineWidth = 1,
  thickLineWidth = 2,
  children,
  ...rest
}: GridlinesProps) => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  useLayoutEffect(() => {
    const updateDimensions = () => {
      const styleWidth = typeof style?.width === 'number' ? style.width : undefined;
      const styleHeight = typeof style?.height === 'number' ? style.height : undefined;
      
      const width = propWidth || styleWidth || 600;
      const height = propHeight || styleHeight || 900;

      setDimensions({ width, height });
    };

    updateDimensions();
  }, [style, propWidth, propHeight, scale]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (!dimensions || (dimensions.width === 0 && dimensions.height === 0)) {
      setDimensions({ width, height });
    }
  };

  if (!dimensions) return null;

  return (
    <View style={[styles.container, style, { width: dimensions.width, height: dimensions.height }]} onLayout={handleLayout} {...rest}>
      <Svg width={dimensions.width} height={dimensions.height}>
        <Defs>
          <GridPattern
            width={dimensions.width}
            height={dimensions.height}
            cellSize={cellSize * scale}
            quadrantSize={quadrantSize}
            lineColor={lineColor}
            thickLineColor={thickLineColor}
            thinLineWidth={thinLineWidth}
            thickLineWidth={thickLineWidth}
          />
        </Defs>
        <Rect width="100%" height="100%" fill="url(#GridPattern)" />
      </Svg>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Gridlines;