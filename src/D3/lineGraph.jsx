import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { max, extent } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';

class LineGraph extends Component {

        componentDidMount() {
           this.createLineGraph();
           this.updateLineData();
        }
        componentDidUpdate() {
           this.createLineGraph();
           this.updateLineData();
        }

        updateLineData = () => {
          line()
            .x((d) => this.xScale(d.dates) )
            .y((d) => this.yScale(d.temperature) )
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

        createLineGraph() {
          const { node } = this.node;
          const dataMax = max(this.props.data);


          select(node)
             .selectAll('path')
             .data(this.props.data)
             .enter()
             .append('path')
             .attr('d', this.line())

          select(node)
             .selectAll('path')
             .data(this.props.data)
             .exit()
             .remove()

             {/* debugger; */}
          select(node)
             .selectAll('path')
             .data(this.props.data)
             .style('fill', 'none')
             .attr('stroke', '#fff')
        }

     render() {
       return (
          <svg
            ref={node => this.node = node}
            width={500}
            height={500}
            {...props}
          />
        )
      }
};



LineGraph.propTypes = {
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  sensor_data: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired
}

export default LineGraph;
