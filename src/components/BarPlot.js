import { useMemo } from "react";
import * as d3 from "d3";
import { BarItem } from "./BarItem";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;


export const Barplot = ({ width, height, data }) => {
   /**
   * @description This component renders a responsive barplot
   * @param {number} width of barplot
   * @param {number} height of barplot
   * @param {object} data is an object containing name and value for each attribute of a player
   * @returns {ReactNode} A React element which renders a barplot
   */

  //create canvas for barplot
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  //Prepare data for barplot data in format: [{name:, value:}, ...]
  const barData = Object.entries(data).map(([key, value]) => ({name: key, value: value}));

  // Y axis is labels for attributes of player ( barplot is horizontal )
  const groups = barData.sort((a, b) => b.value - a.value).map((d) => d.name);
  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }, [boundsHeight, groups]);

  // X axis is for values of each attribute, prepare scale
  const max = d3.max(barData.map((d) => d.value));
  const xScale = d3.scaleLinear().domain([0, max]).range([0, boundsWidth]);

  // for each item in barData, create shapes
  const allShapes = barData.map((d) => {
    return (
      <BarItem className="attributeBarItem"
        key={d.name}
        name={d.name}
        value={d.value}
        barHeight={yScale.bandwidth()}
        barWidth={xScale(d.value)}
        x={xScale(0)}
        y={yScale(d.name)}
        maxX = {xScale(100)}
        quarterX = {xScale(18)}
      />
    );
  });

  // create grid
  const grid = xScale
    .ticks(10)
    .slice(1)
    .map((value, i) => (
      <g key={i}>
        <line
          x1={xScale(value)}
          x2={xScale(value)}
          y1={0}
          y2={boundsHeight}
          stroke="#304352"
          opacity={0.2}
        />
        <text
          x={xScale(value)}
          y={boundsHeight + 10}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={9}
          stroke="black"
          opacity={0.7}
        >
          {value}
        </text>
      </g>
    ));

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allShapes}
          {grid}
        </g>
      </svg>
    </div>
  );
};
