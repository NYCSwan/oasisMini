import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { axisLeft, axisBottom } from 'd3-axis';
import { timeFormat } from 'd3-time-format';
import 'd3-transition';

import forIn from 'lodash/forIn';
import pickBy from 'lodash/pickBy';


class LineGraph extends Component {
    state = {
      shouldUpdateSize: true,
      maxX: null,
      minX: null,
      maxY: null,
      minY: null,
      widthWithMargin:this.props.graphWidth,
      heightWithMargin:this.props.graphHeight,
      currentData: []

    };

    componentDidMount() {
      console.log('comonpent mounted linegraph');
        this.init();

    }

    componentWillReceiveProps({ margin, graphWidth, graphHeight, sensorData, chamberId, endDate, startDate, sensor }) {
      console.log('componentWillReceiveProps linegraph');
      if (margin !== this.props.margin || graphWidth !== this.props.graphWidth || graphHeight !== this.props.graphHeight) {
        console.log('change size');
        this.setState({ shouldUpdateSize: true });
        this.extractSize();
        this.extractMaxMin();
      }
      if (sensorData !== this.props.sensorData && this.props.sensorData.length >0 || sensor !== this.props.sensor || chamberId !== this.props.chamberId) {
        console.log('change data, data, sensor or chamber changed');
        this.updateCurrentData();
      }
      if (endDate !== this.props.endDate || startDate !== this.props.startDate) {
        console.log('change data, dates changed');
        this.updateCurrentData();
      }
    }

    componentDidUpdate() {
      console.log('componentDidUpdate linegraph');
      if(this.state.widthWithMargin === this.props.graphWidth || this.state.heightWithMargin === this.props.graphHeight) {
        this.extractSize();
        this.update();
      }
    }

    extractSize = () => {
      console.log('extractSize');
      const { margin, graphWidth, graphHeight } = this.props;
      const tempWidth = graphWidth - margin.left - margin.right;
      const tempHeight = graphHeight - margin.top - margin.bottom;

      this.setState({
        widthWithMargin: tempWidth,
        heightWithMargin: tempHeight
      });
    }

    extractMaxMin = () => {
      console.log('extractMaxMin');
      const { startDate, endDate } = this.props;
      const dates = [];
      dates.push(startDate);
      dates.push(endDate);

      const tempMaxX = max(dates);
      const tempMaxY = max(this.state.currentData, (d) => d.value);
      const tempMinX = min(dates);
      const tempMinY = min(this.state.currentData, (d) => d.value);

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
      if (tempMinY !== this.state.minY) {
        this.setState({ minY: tempMinY })
      }
    }

    init = () => {
      console.log('init');
      console.log(this.rootNode)
      this.lineGroup = this.rootNode.append('g');
      this.axisLeftGroup = this.lineGroup.append('g');
      this.axisBottomGroup = this.lineGroup.append('g');
      this.updateCurrentData();
    }

    updateCurrentData = () => {
      console.log('updateCurrentData lineGraph');
      const dataByChamber = pickBy(this.props.sensorData,
        (data) => data.chamber_id === this.props.chamberId);
      const tempData = [];
      forIn(dataByChamber, (value) => {
        tempData.push({time: value.time, value: value.sensors.temperature});
      }) // to array of objects [{time, temp}] NEEDS TO CHANGE BASED ON SENSOR

      this.setState({
        currentData: tempData
      }, () => {
        console.log(`currentData: ${this.state.currentData[0][0]}`);
      })

    }


    updateSize = () => {
      console.log('updateSize');
      const { margin } = this.props;

      {/* set range and domain for axis when domain is hard coded it shows ticks */}
      const xScale = scaleTime().domain([this.state.minX, this.state.maxX]).range([0, this.state.widthWithMargin]);
      const yScale = scaleLinear().domain([this.state.minY, this.state.maxY]).range([this.state.heightWithMargin, 0]);

      {/* resize/re-align root nodes */}

      this.rootNode
      .attr('width', this.state.widthWithMargin)
      .attr('height', this.state.heightWithMargin);

      this.lineGroup
      .attr('transform',
      `translate(${margin.left}, ${margin.top})`);

      if(this.state.currentData.length < 1) {
        this.updateCurrentData();
        this.extractMaxMin();
      } else {
        this.extractMaxMin();
      }

      this.line = line() //
      .x( (d) => xScale(d.time) )
      .y( (d) => yScale(d.value) )

      this.setState({ shouldUpdateSize: false });

      // Update the X Axis (time)
       this.axisBottomGroup.transition()
         .attr('class', 'axis axis-x')
         .attr('transform', `translate(0, ${this.props.graphHeight})`)
         .call(axisBottom(xScale))
         {/* / prevent from having too much ticks on small screens with .ticks(width > 500 ? Math.floor(width / 80) : 4)); // prevent from having too much ticks on small screens
             try:
         xScale.ticks(5).tickFormat(timeFormat("%a"))
         yscale.ticks(5)
 */}

       // Update the Y Axis

       this.axisLeftGroup.transition()
         .attr('class', 'axis axis-y')
         .call(axisLeft(yScale))
      //  // this.line is not called directy since it's used as a callback and is re-assigned. It is wrapped inside this.lineReference


      }

     updateLine = () => {
       console.log('update line');
       const { currentData } = this.state;
       const drawLine = this.line(currentData);
       // generate line path
       const linePath = this.lineGroup.selectAll('line').data([currentData]);

       // [Update] transition from previous paths to new paths
       this.lineGroup.selectAll('line')
         .transition()
         .style('stroke', '#fff')
         .attr('d', drawLine);

       // [Enter] any new data
       linePath.selectAll('line').enter()
         .append('path')
         .attr('d', drawLine)
         .attr('class', 'line')
         .style('stroke-width', '2px')
         .style('fill', 'none')
         .style('stroke', '#fff')

       // [Exit]
       linePath.exit()
         .remove();

     }
     update = () => {
       console.log('update');
       // only call this.updateSize() if some props involving size have changed (check is done on componentWillReceiveProps)
       this.updateCurrentData();
       if (this.state.shouldUpdateSize === true) {
         this.updateSize();
         this.setState({ shouldUpdateSize: false })
       }
       this.updateLine();
     }

     render() {

console.log('render lineGraph');
console.log(`w ${this.state.widthWithMargin} h ${this.state.heightWithMargin}`);

       return (
         <div>
            <svg ref={ (node) => { this.rootNode = select(node) } } />
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
  sensorData: PropTypes.arrayOf(PropTypes.object).isRequired,
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  margin: PropTypes.shape({
    params:PropTypes.number,
    isExact: PropTypes.bool
  }),
  sensor: PropTypes.string.isRequired,
  chamberId: PropTypes.string.isRequired
}

export default LineGraph;
