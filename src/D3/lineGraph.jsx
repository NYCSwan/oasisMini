import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Graph from '../js/graph.react';
import DataSeries from './data_series';

class LineGraph extends Component {
  state = {
    xScale: scaleTime(),
    yScale: scaleLinear()
  }

  render() {
    const { sensor_data, graphWidth, graphHeight, data } = this.props;
    const size = { width: graphWidth, height: graphHeight };
    {/* max/min */}
    {/* hard coded temp temperary */}

    {/*
      const xExtent = d3.extent(data, d => d.time);
      const yExtent = d3.extent(sensor_data, d=> d.temperature); */}
    {/* scales (y is the sensor data, x is the time (day, week, full)) */}
    const yScale = d3.scaleLinear().domain([70, 90]).range([graphHeight, 0]);
      {/* yscale=

        need to fix so axis is to nearest 10s above/below sensor */}
    const xScale = d3.scaleTime().domain(xExtent).range([0, graphWidth]);

    const path = d3.svg.line()
      .x((data) => xScale(data.x))
      .y((data) => yScale(data.y))
      .interpolate(interpolate);

    return (
      <Graph width={graphWidth} height={graphHeight}>
        <DataSeries
          sensor_data={sensor_data.temperature}
          size={size}
          xScale={xScale}
          yScale={yScale}
          path={path}
          ref={(input) => { sensor_data.sensors.temperature = input; }}
          color="white"
        />
      </Graph>
    );
  }
};

LineGraph.defaultProps = {
  interpolate: 'linear'
}

LineGraph.propTypes = {
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  sensor_data: PropTypes.arrayOf(PropTypes.string).isRequired,
  path: PropTypes.element.isRequired,
  interpolate: PropTypes.string
}

export default LineGraph;
