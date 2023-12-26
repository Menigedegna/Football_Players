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

 // create shapes
  const allShapes = root.leaves().map((leaf) => {
    return (
      <g key={Math.random()} className='treeShape'>
        <rect
          x={leaf.x0}
          y={leaf.y0}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
          stroke="transparent"
          fill={"var(--tree-map-color)"}
          opacity={1}
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