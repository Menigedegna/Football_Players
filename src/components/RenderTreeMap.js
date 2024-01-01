import { useMemo } from "react";
import * as d3 from "d3";

const RenderTreeMap = ({data, width, height}) => {
   /**
   * @description This component renders a treemap using data
   * @param {object} data: node and leaf objects representing each county/club and their players
   * @param {number} width of treemap
   * @param {number} height of treemap
   * @returns {ReactNode} A React element which renders a d3.treemap
   */

  // generate hierarchy
  const hierarchy = useMemo(() => {
    return d3.hierarchy(data).sum((d) => d.value);
  }, [data]);

  // generate treemap
  const root = useMemo(() => {
    const treeGenerator = d3.treemap().size([width, height]).padding(4);
    return treeGenerator(hierarchy);
  }, [hierarchy, width, height]);

const colors = ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ac', '#439894', '#f47642', '#dede00', '#800080', '#aaffc3', '#000075', '#a9a9a9', '#000000', '#808080', '#6a3d9a', '#ffcc00', '#008000', '#a0522d', '#ff4500', '#da70d6', '#7cfc00', '#4682b4', '#dda0dd', '#20b2aa', '#40e0d0', '#ff6347', '#e9967a', '#1e90ff', '#f0e68c'];

// You can use this single line of code in your React component.

 // create shapes
  const allShapes = root.leaves().map((leaf, id) => {
    return (
      <g key={Math.random()} className='treeShape'>
        <rect
          x={leaf.x0}
          y={leaf.y0}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
          stroke="transparent"
          fill={colors[id]}
          opacity={0.5}
        >
        <title className="tooltip">{leaf.data.players.join(', ')}</title>
         </rect>

        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 3}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="black"
          className="treeFontName"
        >
          {leaf.data.name}
        </text>

        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 18}
          fontSize={10}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="black"
          className="treeFontValue"
        >
          {leaf.data.value}
        </text>

        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 35}
          fontSize={8}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
          className="treeFontPlayers"
        >
        {leaf.data.players.map((player, index) => (
            <tspan className="treePlayersList" x={leaf.x0 + 3} dy={index * 2+10} key={index}>
              {player}
            </tspan>
          ))}
        </text>

      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height} className="treeContainer">
        {allShapes}
      </svg>
    </div>
  );
};
export default RenderTreeMap;