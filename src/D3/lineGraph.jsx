import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { axisLeft, axisBottom } from 'd3-axis';
import 'd3-transition';

class LineGraph extends Component {
    state = {
      initialized: false,
      shouldUpdateSize: false,
      maxX: null,
      minX: null,
      maxY: null
    };

    componentDidMount() {
      console.log('comonpent mounted linegraph');
      this.init();
      {/* the code bellow is to trigger componentDidUpdate (which is not called at first render) */}
        setTimeout(() => {
          this.setState({
            initialized: true
          });
        });
    }

    componentWillReceiveProps({ margin, graphWidth, graphHeight }) {
      console.log('componentWillReceiveProps linegraph');
      if (margin !== this.props.margin || graphWidth !== this.props.graphWidth || graphHeight !== this.props.graphHeight) {
        console.log('change size');
        this.setState({ shouldUpdateSize: true })
      }
    }

    componentDidUpdate() {
      console.log('componentDidUpdate linegraph');
      if (this.state.initialized === true) {
        this.update();
      }
    }

    extractSize = () => {
      console.log('extractSize');
      const { margin, graphWidth, graphHeight } = this.props;
      let widthWithMargin=0;
      let heightWithMargin=0;
      if(this.state.shouldUpdateSize  === true) {
        widthWithMargin = graphWidth - margin.left - margin.right;
        heightWithMargin = graphHeight - margin.top - margin.bottom;
      }
      console.log(`w ${widthWithMargin} h ${heightWithMargin}`);
    }

    extractMaxMin = () => {
      console.log('extractMaxMin');
      const { currentData, startDate, endDate } = this.props;
      const dates = [];
      dates.push(startDate);
      dates.push(endDate);
      console.log(dates);

      const tempMaxX = max(dates, (d) => d.time);
      const tempMaxY = max(currentData, (d) => d.value);
      const tempMinX = min(dates, (d) => d.time);
      console.log(`tempMaxX: ${tempMaxX}, tempMinX ${tempMinX}, tempMaxY: ${tempMaxY}`)

      if (tempMaxX !== this.state.maxX) {
        this.setState({ maxX: tempMaxX })
      }
      if (tempMaxY !== this.state.maxY) {
        this.setState({ maxY: tempMaxY })
      }
      if (tempMinX !== this.state.minX) {
        this.setState({ minX: tempMinX })
      }
    }

    init = () => {
      console.log('init');
      this.lineGroup = this.rootNode.append('g');
      this.axisLeftGroup = this.lineGroup.append('g');
      this.axisBottomGroup = this.lineGroup.append('g');
    }

    updateSize = () => {
      console.log('updateSize');
      const { margin } = this.props;
      this.extractSize()
      {/* resize/re-align root nodes */}
      this.rootNode
       .attr('width', this.widthWithMargin)
       .attr('height', this.heightWithMargin);

      this.lineGroup
       .attr('transform',
         `translate(${margin.left},${margin.top})`);

      {/* set domain for axis */}
      const xScale = scaleTime().range([0, this.widthWithMargin]);
      const yScale = scaleLinear().range([this.heightWithMargin, 0]);

      this.extractMaxMin()
      {/* Scale the range of the data */}
      xScale.domain([this.state.minX, this.state.maxX]);
      yScale.domain([0, this.state.maxY]);
      debugger
     // Update the X Axis
       this.axisBottomGroup.transition()
         .attr('transform', `translate(0, ${this.heightWithMargin})`)
         .call(axisBottom(xScale).ticks(this.widthWithMargin > 500 ? Math.floor(this.widthWithMargin / 80) : 4)); // prevent from having too much ticks on small screens

       // Update the Y Axis
       this.axisLeftGroup.transition()
         .call(axisLeft(yScale));

       // this.line is not called directy since it's used as a callback and is re-assigned. It is wrapped inside this.lineReference
       this.lineGroup = line() // .interpolate("monotone")
         .x(d => xScale(d.x))
         .y(d => yScale(d.y));
      }

     updateData = () => {
       console.log('updateData');
       const { currentData } = this.props;
       const drawLine = this.lineGroup;
       // generate line paths
       this.lineGroup.selectAll('line').data(currentData);

       // [Update] transition from previous paths to new paths
       this.lineGroup.selectAll('line')
         .transition()
         .style('stroke', '#fff')
         .attr('d', drawLine);

       // [Enter] any new data
       this.lineGroup.enter()
         .append('path')
         .attr('class', 'line')
         .style('stroke-width', '2px')
         .style('fill', 'none')
         .style('stroke', 'white')
         .attr('d', drawLine);

       // [Exit]
       this.lineGroup.exit()
         .remove();
     }

     update = () => {
       console.log('update');
       // only call this.updateSize() if some props involving size have changed (check is done on componentWillReceiveProps)
       if (this.shouldUpdateSize === true) {
         this.updateSize();
         this.shouldUpdateSize = false;
       }
       this.updateData();
     }

     render() {
       return (
         <div>
            <svg ref={(node) => {this.rootNode = select(node)}}
            />
            <h4>{this.props.currentData}</h4>
            <p>{this.props.sensor}</p>
            <p>{this.props.panelText}</p>
          </div>
        )
      }
};

LineGraph.defaultProps = {
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    }
}


LineGraph.propTypes = {
  currentData: PropTypes.arrayOf(PropTypes.object).isRequired,
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  margin: PropTypes.shape({
    params:PropTypes.number,
    isExact: PropTypes.bool
  }),
  sensor: PropTypes.string.isRequired,
  panelText: PropTypes.string.isRequired
}

export default LineGraph;
