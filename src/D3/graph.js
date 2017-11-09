import * as d3 from 'd3';
import d3request from 'd3-request';

import dataFile from '../../data.json';

const width=900
const height = 300;

d3.json('../../data.json', (err, data) => {
  //   clean the data
    data.sensor_data.forEach(d => {
      d.date = d3.timeParse("%Y%m%d %I:%M")(d.time);
      d.date = new Date(d.time);//x
      ++d["temperature"]; //y
    });

      // max/min
  const xExtent = d3.extent(data.sensor_data, d => d.date);
  const yExtent = d3.extent(data.sensor_data, d=> d.temperature);

  // scales
  const yScale = d3.scaleLinear()
    .domain([0, 90])
    .range([height, 0]);

  const yScaleLine = d3.scaleLinear()
    .domain(yExtent).range([height, 0]);

  const xScale = d3.scaleTime()
    .domain(xExtent)
    .range([40, width]);

  const yAxis = d3.axisLeft()
    .scale(yScale);

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.timeFormat('%a %I:%M %p'));

  //       Append to svg
  //       Temp line

  const svg = d3.select('svg').append('g')
    .attr('transform', 'translate(40, 20)');

  const line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d["temperature"]));

  svg.selectAll('path')
    .data([data.sensor_data]).enter().append('path')
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', 'blue');

  //     axes
  svg.append('g')
    .call(yAxis);

  svg.append('g')
    .attr('transform', 'translate('+[-40, (height)]+')')
    .call(xAxis);

});
