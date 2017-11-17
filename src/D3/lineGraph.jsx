import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import d3request from 'd3-request';

import Graph from '../js/graph.react';
import DataSeries from './data_series';

class LineGraph extends Component {

  render() {
    const { sensor_data, graphWidth, graphHeight, startDate, endDate } = this.props;
    const size = { width: graphWidth, height: graphHeight };
    {/* max/min */}
    {/* hard coded temp temperary */}
    const xExtent = d3.extent(sensor_data, d => d.time);
    {/* const yExtent = d3.extent(sensor_data, d=> d.temperature); */}

    {/* scales (y is the sensor data, x is the time (day, week, full)) */}
    const yScale = d3.scaleLinear().domain([70, 90]).range([graphHeight, 0]);
      {/* need to fix so axis is to nearest 10s above/below sensor */}
    const xScale = d3.scaleTime().domain(xExtent).range([0, graphWidth]);

    const path = d3.svg.line()
      .x((d) => props.xScale(d.x))
      .y((d) => props.yScale(d.y))
      .interpolate(props.interpolate);

    return (
      <Graph width={graphWidth} height={graphHeight}>
        <DataSeries
          sensor_data={sensor_data.temperature}
          size={size}
          xScale={xScale}
          yScale={yScale}
          path={path}
          ref='temperature'
          color="white"
          {...sensor_data}
        />
      </Graph>
    );
  }
};

LineGraph.propTypes = {
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  sensor_data: PropTypes.arrayOf(PropTypes.string).isRequired,
  path: PropTypes.element.isRequired
}

export default LineGraph;
