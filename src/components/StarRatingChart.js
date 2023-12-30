import * as d3 from 'd3';
import React, { useEffect } from 'react';
import {attributeForStarChart} from "./CommonFunctions"
import starImage from "../img/ratings/star.png";

//const SERVER_PATH = '/static/ratings/star.png';


const StarRatingChart = ({ data }) => {
   /**
   * @description This component renders a star chart using images and data
   * @param {object} data is list of categorical values
   * @returns {ReactNode} A React element which renders an svg component
   */

  //fetch data from server
  useEffect(() => {
    const svg = d3.select('#star-rating-chart');
    const starSize = 30;
    const starPadding = 5;

    // Create a group for each value in data
    const starGroups = svg.selectAll('.star-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'star-group')
      .attr('transform', (d, i) => `translate(0, ${i * (starSize + starPadding)})`);

    // For each group, append stars based on value in data
    starGroups.selectAll('image')
      .data(d => Array.from({ length: d }, (_, index) => index))
      .enter()
      .append('svg:image')
      .attr('x', (_, i) =>130+ i * (starSize + starPadding))
      .attr('y', -1)
      .attr('width', starSize)
      .attr('height', starSize)
      .attr('xlink:href', starImage);

    starGroups.append('rect')
      .attr('x', 15)
      .attr('y', (starSize / 2) -15)
      .attr('width', '90px')
      .attr('height', '26px')
      .attr('fill', 'black')
      .attr('opacity', 1)
      .attr('rx', 5)

    // Append text labels to each group
    starGroups.append('text')
      .attr('x', 100)
      .attr('y', (starSize / 2))
      .attr("font-size", "1em")
      .attr('fill', 'white')
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'middle')
      .text((d, i) => attributeForStarChart[i].split("_").join(" ")); // You can replace this with your actual labels



  }, [data]);



  return (
    <div className="starChartContainer">
        <svg id="star-rating-chart" width="100%" height={data.length * 30} key={data[0]*10+data[1]}></svg>
    </div>
  );
};

export default StarRatingChart;



