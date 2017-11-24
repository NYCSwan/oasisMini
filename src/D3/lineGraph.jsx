import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { axisLeft, axisBottom } from 'd3-axis';
import 'd3-transition';

import forIn from 'lodash/forIn';
import pickBy from 'lodash/pickBy';


class LineGraph extends Component {
    state = {
      initialized: false,
      shouldUpdateSize: true,
      maxX: null,
      minX: null,
      maxY: null,
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
      }
      this.update();
    }

    extractSize = () => {
      console.log('extractSize');
      const { margin, graphWidth, graphHeight } = this.props;
      const tempWidth = graphWidth - margin.left - margin.right;
      const tempHeight = graphHeight - margin.top - margin.bottom;

      this.setState({
        widthWithMargin: tempWidth,
        heightWithMargin: tempHeight,
        shouldUpdateSize: false
      }, () => {
        this.updateSize();
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
      this.setState({ initialized: true })
      this.updateCurrentData();
    }

    updateCurrentData = () => {
      console.log('updateCurrentData lineGraph');
      const dataByChamber = pickBy(this.props.sensorData,
        (data) => data.chamber_id === this.props.chamberId);
      const tempData = [];
      forIn(dataByChamber, (value) => {
        tempData.push({time: value.time, value: value.sensors.temperature});
      }) // to array of objects [{time, temp}]

      this.setState({
        currentData: tempData
      }, () => {
        console.log(`currentData: ${tthis.state.currentData[0]}`);
      })

    }


    updateSize = () => {
      console.log('updateSize');
      const { margin } = this.props;
      {/* resize/re-align root nodes */}
      this.rootNode
       .attr('width', this.state.widthWithMargin)
       .attr('height', this.state.heightWithMargin);
debugger
      this.lineGroup
       .attr('transform',
         `translate(${margin.left}, ${margin.top})`);
      if(this.state.currentData.length < 1) {
        this.updateCurrentData()
      } else {
        this.extractMaxMin()
      }
      {/* set domain for axis */}
      const xScale = scaleTime().domain([this.state.minX, this.state.maxX]).range([0, this.state.widthWithMargin]);
      const yScale = scaleLinear().domain([0, this.state.maxY]).range([this.state.heightWithMargin, 0]);

      {/* Scale the range of the data */}
      xScale;
      yScale;

     // Update the X Axis
       this.axisBottomGroup.transition()
         .attr('transform', `translate(0, ${this.state.heightWithMargin})`)
         .call(axisBottom(xScale).ticks(5)) // prevent from having too much ticks on small screens

       // Update the Y Axis
       this.axisLeftGroup.transition()
         .call(axisLeft(yScale));
       // this.line is not called directy since it's used as a callback and is re-assigned. It is wrapped inside this.lineReference
       this.lineGroup = line() //
         .x( (d) => xScale(d.time) )
         .y( (d) => yScale(d.value) );

       console.log(this.lineGroup.y( (d) => yScale(d.value) ))

       this.setState({ shouldUpdateSize: false });

      }

     updateLine = () => {
       console.log('updateCurrentData');
       const { currentData } = this.state;
       const drawLine = this.lineGroup;
       // generate line paths

       const linePath = this.lineGroup.selectAll('path').data(currentData);

       // [Update] transition from previous paths to new paths
       linePath.selectAll('path')
         .transition()
         .style('stroke', '#fff')
         .attr('d', drawLine);

       // [Enter] any new data
       linePath.enter()
         .append('path')
         .attr('class', 'line')
         .style('stroke-width', '2px')
         .style('fill', 'none')
         .style('stroke', 'white')
         .attr('d', drawLine);

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
            <svg ref={ (node) => { this.rootNode = select(node) } }/>
            <p>{this.props.sensor}</p>
            <p>{JSON.stringify(this.state.currentData)}</p>
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
