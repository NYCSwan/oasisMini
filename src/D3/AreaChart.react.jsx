import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ComposedChart, Area, Line, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment';

import takeRightWhile from 'lodash/takeRightWhile';
import chunk from 'lodash/chunk';

class ChartArea extends Component {
  state = {
    oneDay: [],
    oneWeek: [],
    oneMonth: [],
    dataSeries: []
  }

  componentDidMount() {
    console.log('componentDidMount areaChart');
    this.updateAreaChartData();
  }

  componentWillReceiveProps({ margin, graphWidth, graphHeight, currentData, endDate, startDate, sensor, maxY, minY }) {
    console.log('componentWillReceiveProps area chart');

    if (currentData !== this.props.currentData || sensor !== this.props.sensor || maxY !== this.props.maxY || minY !== this.props.minY) {
      console.log('change data, data, sensor or chamber changed');
      this.updateAreaChartData();
    } else if (endDate !== this.props.endDate || startDate !== this.props.startDate) {
      console.log('change data, dates changed');
      this.updateAreaChartData();
    } else if (margin !== this.props.margin || graphWidth !== this.props.graphWidth || graphHeight !== this.props.graphHeight) {
     console.log('change size');
    }
  }

  shouldComponentUpdate (newProps, newState) {
    console.log('shouldComponentUpdate lineGraph');
    return this.props.endDate !== newProps.endDate || this.props.minY !== newProps.minY || this.props.sensor !== newProps.sensor || this.props.currentData !== newProps.currentData ||  this.state.oneDay !== newState.oneDay || this.state.dataSeries !== newState.dataSeries || this.state.oneWeek !== newState.oneWeek || this.state.oneMonth !== newState.oneMonth || this.props.maxY !== newProps.maxY

  }

  updateAreaChartData = () => {
    console.log('updateAreaChart data');
    this.getOneDayOfData();
    this.getOneWeekOfData();
    this.getOneMonthOfData();
    // this.updateDataSeries();
  }

  getOneDayOfData = () => {
    console.log('getOneDayOfData');
    const { startDate, sensor, currentData } = this.props;
  // debugger
  //   let oneDayOfDataPoints = [];
  //   if (sensor === 'humidity' && currentData.length > 0 || sensor === 'temperature' && currentData.length > 0) {
  //     // narrow currentData to the past 24 hours
  //     const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
  //     const oneDateData = takeRightWhile(currentData, (dataEntry) => { return dataEntry.formattedDate === modifiedStartDate}); // eslint-disable-line
  //     // slice by 7 data points
  //     const chunkedData = chunk(oneDateData, 7);
  //     // select 7 from 52 data points
  //     if (chunkedData.length !== 0) {
  //       oneDayOfDataPoints.push(chunkedData[0][0]);
  //       oneDayOfDataPoints.push(chunkedData[1][0]);
  //       oneDayOfDataPoints.push(chunkedData[2][0]);
  //       oneDayOfDataPoints.push(chunkedData[3][0]);
  //       oneDayOfDataPoints.push(chunkedData[4][0]);
  //       oneDayOfDataPoints.push(chunkedData[5][0]);
  //       oneDayOfDataPoints.push(chunkedData[6][0]);
  //       this.setState({
  //         oneDay: oneDayOfDataPoints,
  //         dataSeries: oneDayOfDataPoints
  //       });
  //     }
  //   } else if (sensor === 'pH') {
  //     const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
  //     const oneDateData = takeRightWhile(this.props.currentData, (dataEntry) => { return dataEntry.formattedDate === modifiedStartDate }); // eslint-disable-line
  //     oneDayOfDataPoints = oneDateData;
  //     this.setState({
  //       oneDay: oneDayOfDataPoints,
  //       dataSeries: oneDayOfDataPoints
  //     });
  //   } else {
  //     console.log('currentData empty');
  //   }
  }

  getOneWeekOfData = () => {
    console.log('getWeekOfData');
    const { startDate, endDate, sensor, currentData } = this.props;
  //   let oneWeekOfDataPoints = [];
  //   if (sensor === 'humidity' && endDate - startDate === 604800000 || sensor === 'temperature' && endDate - startDate === 604800000) {
  //     // narrow currentData to the past 24 hours
  //     const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
  //     const sevenDaysData = takeRightWhile(currentData, (dataEntry) => { return dataEntry.formattedDate >= modifiedStartDate}); // eslint-disable-line
  //     console.log(sevenDaysData);
  //     // slice by 7 data points
  //     const chunkedData = chunk(sevenDaysData, 7);
  //     // select 7 from 364 data points
  //     if (chunkedData.length !== 0) {
  //       oneWeekOfDataPoints.push(chunkedData[0][0]);
  //       oneWeekOfDataPoints.push(chunkedData[1][0]);
  //       oneWeekOfDataPoints.push(chunkedData[2][0]);
  //       oneWeekOfDataPoints.push(chunkedData[3][0]);
  //       oneWeekOfDataPoints.push(chunkedData[4][0]);
  //       oneWeekOfDataPoints.push(chunkedData[5][0]);
  //       oneWeekOfDataPoints.push(chunkedData[6][0]);
  //       this.setState({
  //         oneWeek: oneWeekOfDataPoints,
  //         dataSeries: oneWeekOfDataPoints
  //       });
  //     }
  //   } else if (sensor === 'pH' && endDate - startDate === 604800000) {
  //     const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
  //     const oneWeekData = takeRightWhile(currentData, (dataEntry) => { return dataEntry.formattedDate >= modifiedStartDate}); // eslint-disable-line
  //     const chunkedData = chunk(oneWeekData, 2);
  //     // select 7 from 364 data points
  //     if (chunkedData.length !== 0) {
  //       oneWeekOfDataPoints.push(chunkedData[0][0]);
  //       oneWeekOfDataPoints.push(chunkedData[1][0]);
  //       oneWeekOfDataPoints.push(chunkedData[2][0]);
  //       oneWeekOfDataPoints.push(chunkedData[3][0]);
  //       oneWeekOfDataPoints.push(chunkedData[4][0]);
  //       oneWeekOfDataPoints.push(chunkedData[5][0]);
  //       oneWeekOfDataPoints.push(chunkedData[6][0]);
  //       this.setState({
  //         oneWeek: oneWeekOfDataPoints,
  //         dataSeries: oneWeekOfDataPoints
  //       });
  //     }
  //   } else if (sensor === 'PPM' && endDate - startDate === 604800000 || sensor === 'water' && endDate - startDate === 604800000 || sensor === 'height' && endDate - startDate === 604800000) {
  //     const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
  //     const oneWeekData = takeRightWhile(currentData, (dataEntry) => { return dataEntry.formattedDate >= modifiedStartDate}); // eslint-disable-line
  //     oneWeekOfDataPoints = oneWeekData;
  //     this.setState({
  //       oneWeek: oneWeekOfDataPoints,
  //       dataSeries: oneWeekOfDataPoints
  //      });
  //   } else {
  //     console.log('currentData empty');
  //   }
  }

  getOneMonthOfData = () => {
    console.log('getMonthOfData');
    const { startDate, endDate, sensor, currentData } = this.props;
  //   let oneMonthOfDataPoints = [];
  //     if (sensor === 'humidity' && endDate - startDate > 604800000 || sensor === 'temperature' && endDate - startDate > 604800000) {
  //       // narrow currentData to the past 24 hours
  //       const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
  //       const oneMonthData = takeRightWhile(currentData, (dataEntry) => { return dataEntry.formattedDate >= modifiedStartDate }); // eslint-disable-line
  //       // slice by 7 data points
  //       const chunkedData = chunk(oneMonthData, 7);
  //       // select 7 from 52 data points
  //       if (chunkedData.length !== 0) {
  //         oneMonthOfDataPoints.push(chunkedData[0][0]);
  //         oneMonthOfDataPoints.push(chunkedData[1][0]);
  //         oneMonthOfDataPoints.push(chunkedData[2][0]);
  //         oneMonthOfDataPoints.push(chunkedData[3][0]);
  //         oneMonthOfDataPoints.push(chunkedData[4][0]);
  //         oneMonthOfDataPoints.push(chunkedData[5][0]);
  //         oneMonthOfDataPoints.push(chunkedData[6][0]);
  //         this.setState({
  //           oneMonth: oneMonthOfDataPoints,
  //           dataSeries: oneMonthOfDataPoints
  //         });
  //       }
  //     } else if (sensor === 'pH' && endDate - startDate > 604800000) {
  //       const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
  //       const oneMonthData = takeRightWhile(currentData, (dataEntry) => { return dataEntry.formattedDate >= modifiedStartDate}); // eslint-disable-line
  //       const chunkedData = chunk(oneMonthData, 2);
  //       // select 7 from 364 data points
  //       if (chunkedData.length !== 0) {
  //         oneMonthOfDataPoints.push(chunkedData[0][0]);
  //         oneMonthOfDataPoints.push(chunkedData[1][0]);
  //         oneMonthOfDataPoints.push(chunkedData[2][0]);
  //         oneMonthOfDataPoints.push(chunkedData[3][0]);
  //         oneMonthOfDataPoints.push(chunkedData[4][0]);
  //         oneMonthOfDataPoints.push(chunkedData[5][0]);
  //         oneMonthOfDataPoints.push(chunkedData[6][0]);
  //         this.setState({
  //           oneMonth: oneMonthOfDataPoints,
  //           dataSeries: oneMonthOfDataPoints
  //         });
  //       }
  //     } else if (sensor === 'PPM' && endDate - startDate > 604800000 || sensor === 'water' && endDate - startDate > 604800000 || sensor === 'height' && endDate - startDate > 604800000) {
  //       const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
  //       const oneMonthData = takeRightWhile(currentData, (dataEntry) => { return dataEntry.formattedDate >= modifiedStartDate}); // eslint-disable-line
  //       oneMonthOfDataPoints = oneMonthData;
  //       this.setState({
  //         oneMonth: oneMonthOfDataPoints,
  //         dataSeries: oneMonthOfDataPoints
  //       });
  //     } else {
  //       console.log('currentData empty');
  //     }
  }


  dateFormatter = (tick) => { // eslint-disable-line
    console.log(tick);
    const { endDate, startDate } = this.props;
    if( endDate - startDate === 86400000) {
      return moment(tick).format('h');
    } else if (endDate - startDate === 604800000 ){
      return moment(tick).format('dd');
    } else if (endDate - startDate > 604800000){
      return moment(tick).format('dd');
    }
  };

  render() {
    console.log('render areaChart');
    const { graphHeight, graphWidth, margin, minY, maxY, currentData } = this.props;

    const dataMinRound = (Math.round(minY / 10) * 10);
    const dataMaxRound = (Math.round(maxY / 10) * 10);
    console.log(currentData);

    return (
      <ComposedChart
        width={graphWidth}
        height={graphHeight}
        data={this.state.dataSeries}
        margin={{ top: margin.top, right: margin.right, bottom: margin.bottom, left: margin.left
       }}
      >
        <defs>
          <linearGradient id="valueColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fff" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          label={{ value: this.timeLabel, position:'outside'}} tickCount={3}
          tick={{ stroke:'#fff', strokeWidth: 1 }}
          tickLine={false}
          tickFormatter={this.dateFormatter}
          stroke='#fff'
        />
        <YAxis
          domain={[dataMinRound, dataMaxRound]}
          tick={{ stroke:'#fff', strokeWidth: 1 }}
          tickCount={3}
          tickLine={false}
          stroke='#fff' />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='value'
          stroke='#fff'
          fillOpacity={1}
          fill='url(#valueColor)' />
        <Line
          type='monotone'
          dataKey='value'
          stroke='#fff' />
      </ComposedChart>
    )
  }
}

ChartArea.propTypes = {
  currentData: PropTypes.arrayOf(PropTypes.object).isRequired,
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number
  }).isRequired,
  sensor: PropTypes.string.isRequired,
  maxY: PropTypes.number.isRequired,
  minY: PropTypes.number.isRequired
}

export default ChartArea;
