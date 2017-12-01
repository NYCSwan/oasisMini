import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { max, min } from 'd3-array';

import moment from 'moment';

import forIn from 'lodash/forIn';
import pickBy from 'lodash/pickBy';
import get from 'lodash/get';

import ChartArea from './AreaChart.react';

class LineGraph extends Component {
  state = {
    currentData: [],
    maxY: 0,
    minY: 0,
    minX: 0,
    maxX: 0
  }

  componentDidMount() {
    console.log('comonpent mounted linegraph');
      this.updateData();
  }

  componentWillReceiveProps({ margin, graphWidth, graphHeight, sensorData, chamberId, endDate, startDate, sensor }) {
    console.log('componentWillReceiveProps linegraph');

    if (sensorData !== this.props.sensorData && this.props.sensorData.length >0 || sensor !== this.props.sensor || chamberId !== this.props.chamberId) {
      console.log('change data, data, sensor or chamber changed');
      this.updateData()
    }
    if (endDate !== this.props.endDate || startDate !== this.props.startDate) {
      console.log('change data, dates changed');
      this.updateData();

    }
    if (margin !== this.props.margin || graphWidth !== this.props.graphWidth || graphHeight !== this.props.graphHeight) {
     console.log('change size');
    }
  }

  shouldComponentUpdate (newProps, newState) {
    console.log('shouldComponentUpdate lineGraph');
    return this.props.endDate !== newProps.endDate || this.state.oneDay !== newState.oneDay || this.state.currentData !== newState.currentData || this.state.maxY !== newState.maxY || this.state.minY !== newState.minY
  }

  updateData = () => {
    console.log('updateData');
    this.updateCurrentData();
    this.extractMaxMin();
  }

  updateCurrentData = () => {
    console.log('updateCurrentData');
    const { sensor } = this.props;
    const dataByChamber = pickBy(this.props.sensorData,
      (data) => data.chamber_id === this.props.chamberId);
    const tempData = [];

    forIn(dataByChamber, (value) => {
      // pick out sensor vals
        const tempValue = get(value.sensors, sensor)
        if (tempValue !== 'na') {
        tempData.push({time: new Date(value.time), value: parseFloat(tempValue, 10), key: value.id , formattedDate: moment(value.time).format('YYYY-MM-DD')});
      }
    })
    // to array of objects [{time, sensor}]
    this.setState({
      currentData: tempData
    }, () => {
      this.extractMaxMin();
    });
  }


  extractMaxMin = () => {
    console.log('extractMaxMin');
    const { startDate, endDate } = this.props;
    const dates = [];

    dates.push(startDate);
    dates.push(endDate);

    if(this.state.currentData.length >0) {
      const tempMaxY = max(this.state.currentData, (d) => d.value);
      const tempMinY = min(this.state.currentData, (d) => d.value);
      const tempMaxX = max(dates);
      const tempMinX = min(dates);
      if (tempMaxX !== this.state.maxX) {
        this.setState({ maxX: tempMaxX })
      }
      if (tempMinX !== this.state.minX) {
        this.setState({ minX: tempMinX })
      }
      if (tempMaxY !== this.state.maxY) {
        this.setState({ maxY: tempMaxY })
      }
      if (tempMinY !== this.state.minY) {
        this.setState({ minY: tempMinY })
      }
    }
  }

  render() {
    console.log('render lineGraph');
    console.log(`currentData: ${this.state.currentData}`);
    const { graphHeight, graphWidth, margin, sensor, startDate, endDate } = this.props;


    return (
      <div className="areaChart container">
        <ChartArea graphWidth={graphWidth}
          graphHeight={graphHeight}
          currentData={this.state.currentData}
          margin={{ top: margin.top, right: margin.right, bottom: margin.bottom, left: margin.left }}
          endDate={endDate}
          startDate={startDate}
          sensor={sensor}
          maxY={this.state.maxY}
          minY={this.state.minY}
          {...this.props}
        />
      </div>
    )
  }
}

LineGraph.defaultProps = {
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 0
    }
}


LineGraph.propTypes = {
  sensorData: PropTypes.arrayOf(PropTypes.object).isRequired,
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number
  }),
  sensor: PropTypes.string.isRequired,
  chamberId: PropTypes.string.isRequired

}

export default LineGraph;
