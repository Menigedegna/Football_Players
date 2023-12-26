import { useSpring, animated } from "@react-spring/web";


export const BarItem = ( {name, value, barHeight, barWidth, x, y, maxX, quarterX}) => {
   /**
   * @description This component renders animated rectangles for barplot
   * @param {string} name attribute associated with rectangle
   * @param {number} value is the value of attribute
   * @param {number} barHeight is the height of each rectangle
   * @param {number} barWidth is the width of rectangle depending on value
   * @param {number} x is the start position of rectangle in x axis
   * @param {number} y is the start position of rectangle in y axis
   * @param {number} maxX is the maximum size of rectangle
   * @param {number} quarterX is the size of rectangle containing labels for each bar item
   * @returns {ReactNode} A React element which renders a bar item
   */

  const springProps = useSpring({
    // set parameters for animation : from and to position and opacity of each rectangle
    from: {
      value: 0,
      barWidth: 0,
      valueOpacity: 0,
    },
    to: {
      value: value,
      barWidth: barWidth,
      valueOpacity: barWidth > 80 ? 1 : 0,
      y,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <g>
      <animated.rect
        x={x}
        y={springProps.y}
        width={maxX}
        height={barHeight}
        opacity={0.8}
        fill='white'
        stroke='white'
        strokeWidth={2}
        rx={2}
      />

      <animated.rect
        x={x}
        y={springProps.y}
        width={springProps.barWidth}
        height={barHeight}
        opacity={1}
        stroke='var(--barplot-color)'
        fill='var(--barplot-color)'
        fillOpacity={1}
        strokeWidth={1}
        rx={2}
      />
      <animated.rect
        x={x-25}
        y={springProps.y}
        width={quarterX}
        height={barHeight}
        opacity={1}
        fill='black'
        stroke='black'
        strokeWidth={1}
        fillOpacity={1}
        rx={1}
      />
      <animated.text
        x={x-20}
        y={springProps.y?.to((y) => y + barHeight / 2)}
        textAnchor="start"
        alignmentBaseline="central"
        fontFamily='var(--instruction-font)'
        fontSize='.5rem'
        fill='white'
        stroke='white'
        strokeWidth={.1}

      >
        {name}
      </animated.text>
    </g>
  );
};

