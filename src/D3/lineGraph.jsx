import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';

class LineGraph extends Component {

        componentDidMount() {
           this.createLineGraph();
        }

        xExtent = () => {
          extent(this.props.data, d => d.dates);
        }

        yExtent = () => {
          extent(this.props.data, d => d.temperature)
        }

        xScale = () => {
          scaleTime()
            .domain(this.xExtent())
            .range([0, this.props.size[2]]);

        }

        yScale = () => {
          scaleLinear()
            .domain(this.yExtent())
            .range([this.props.size[1], 0])
        }

        createLineGraph = () => {
          const { node } = this.node;
          const drawLine = line()
            .x((d) => this.xScale(d.dates) )
            .y((d) => this.yScale(d.temperature) );

          select(node)
             .selectAll('path')
             .data(this.props.data)
             .enter()
             .append('path')
             .attr('d', drawLine)


          select(node)
             .selectAll('path')
             .data(this.props.data)
             .exit()
             .remove()

          select(node)
             .selectAll('path')
             .data(this.props.data)
             .style('fill', 'none')
             .attr('stroke', '#fff')
        }

     render() {
       return (
          <svg
            ref= { node => {this.node = node} }
            width={this.props.size[0]}
            height={this.props.size[1]}
          />
        )
      }
};



LineGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  size: PropTypes.arrayOf(PropTypes.numbers).isRequired
}

export default LineGraph;
