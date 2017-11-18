import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class LineGraph extends Component {
  state = {
    xScale: scaleTime(),
    yScale: scaleLinear()
  }

  componentDidMount() {
    this.createLineGraph()
  }

  componentDidUpdate() {
    this.createLineGraph()
  }

  createLineGraph() {
    debugger;
    const { node } = this.node;
    const dataMax = max(props.tempData);
    const yScale = scaleLinear()
      .domain([70, dataMax])
      .range([graphHeight, 0]);
    const xScale = scaleTime()
      .domeain(xExtent)
      .range(props.graphWidth);

    select(node)
      .selectAll('path')
      .data(props.sensor_data)
      .enter()
      .append('g')
      .attr('transform', 'translate(40, 20)');

    select(node)
      .selectAll('path')
      .data(props.sensor_data)
      .exit()
      .remove();

    select(node)
      .selectAll('path')
      .data(props.sensor_data)
      .attr('d', props.line)
      .attr('fill', 'none')
      .attr('stroke', 'white');
  }

  render() {
    const { sensor_data, graphWidth, graphHeight, tempData } = this.props;
    const size = { width: graphWidth, height: graphHeight };
    {/* max/min */}

    {/* scales (y is the sensor data, x is the time (day, week, full)) */}
      {/* yscale=
        const xExtent = extent(d, d => d.time);
        const yExtent = extent(d, d=> d.temperature);

        const xScale = d3.scaleTime().domain(xExtent).range([0, graphWidth]);

        const path = d3.svg.line()
        .x((data) => xScale(data.x))
        .y((data) => yScale(data.y))
        .interpolate(interpolate);
        need to fix so axis is to nearest 10s above/below sensor */}

    return (
      <svg ref={node => this.node === node}
        width={size.graphWidth} height={size.graphHeight} />
    );
  }
};



LineGraph.propTypes = {
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  sensor_data: PropTypes.arrayOf(PropTypes.string).isRequired,
  tempData: PropTypes.arrayOf(PropTypes.array).isRequired
}

export default LineGraph;
