import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AreaChart, Area, Line, XAxis, YAxis, Tooltip } from 'recharts';
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

    if (currentData !== this.props.currentData|| sensor !== this.props.sensor || maxY !== this.props.maxY || minY !== this.props.minY) {
      console.log('change data, data, sensor or chamber changed');
      this.updateAreaChartData()
    }
    if (endDate !== this.props.endDate || startDate !== this.props.startDate) {
      console.log('change data, dates changed');
      this.updateAreaChartData();

    }
    if (margin !== this.props.margin || graphWidth !== this.props.graphWidth || graphHeight !== this.props.graphHeight) {
     console.log('change size');
    }
  }

  shouldComponentUpdate (newProps, newState) {
    console.log('shouldComponentUpdate lineGraph');
    return this.props.endDate !== newProps.endDate || this.props.currentData !== newProps.currentData ||  this.state.oneDay !== newState.oneDay || this.state.dataSeries !== newState.dataSeries || this.state.oneWeek !== newState.oneWeek || this.state.oneMonth !== newState.oneMonth
  }

  updateAreaChartData = () => {
    console.log('updateAreaChart data');
    this.extractOneDayOfData();
    this.extractOneWeekOfData();
    this.extractOneMonthOfData();
    this.updateDataSeries();
  }

  extractOneDayOfData = () => {
    console.log('extractOneDayOfData');
    const { startDate, sensor, currentData } = this.props;
    let oneDayOfDataPoints = [];
    if (sensor === 'humidity' && currentData.length > 0|| sensor === 'temperature' && currentData.length > 0) {
      // narrow currentData to the past 24 hours
      const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
      const oneDateData = takeRightWhile(currentData, (dataEntry) => { return dataEntry.formattedDate === modifiedStartDate}); // eslint-disable-line
      // slice by 7 data points
      const chunkedData = chunk(oneDateData, 7);
      // select 7 from 52 data points
      if (chunkedData.length !== 0) {
        oneDayOfDataPoints.push(chunkedData[0][0]);
        oneDayOfDataPoints.push(chunkedData[1][0]);
        oneDayOfDataPoints.push(chunkedData[2][0]);
        oneDayOfDataPoints.push(chunkedData[3][0]);
        oneDayOfDataPoints.push(chunkedData[4][0]);
        oneDayOfDataPoints.push(chunkedData[5][0]);
        oneDayOfDataPoints.push(chunkedData[6][0]);
        this.setState({ oneDay: oneDayOfDataPoints }, () => {

          this.updateDataSeries();
          console.log(this.state.oneDay);
        });
      }
    } else if (sensor === 'pH'){
      const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
      const oneDateData = takeRightWhile(this.props.currentData, (dataEntry) => { return dataEntry.formattedDate === modifiedStartDate}); // eslint-disable-line
      oneDayOfDataPoints = oneDateData;
      this.setState({ oneDay: oneDayOfDataPoints }, () => { this.updateDataSeries(); });
    } else {
      console.log('currentData empty');
    }
  }

  extractOneWeekOfData = () => {
    console.log('extractWeekOfData');
    const { startDate, sensor } = this.props;
    let oneWeekOfDataPoints = [];
    if (sensor === 'humidity' || sensor === 'temperature') {
      // narrow currentData to the past 24 hours
      const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
      const oneDateData = takeRightWhile(this.props.currentData, (dataEntry) => { return dataEntry.formattedDate === modifiedStartDate}); // eslint-disable-line
      // slice by 7 data points
      const chunkedData = chunk(oneDateData, 7);
      // select 7 from 52 data points
      if (chunkedData.length !== 0) {
        oneWeekOfDataPoints.push(chunkedData[0][0]);
        oneWeekOfDataPoints.push(chunkedData[1][0]);
        oneWeekOfDataPoints.push(chunkedData[2][0]);
        oneWeekOfDataPoints.push(chunkedData[3][0]);
        oneWeekOfDataPoints.push(chunkedData[4][0]);
        oneWeekOfDataPoints.push(chunkedData[5][0]);
        oneWeekOfDataPoints.push(chunkedData[6][0]);
        this.setState({ oneWeek: oneWeekOfDataPoints }, () => {  console.log(`oneWeek in fn: ${this.state.oneWeek}`) });

      }
    } else if (sensor === 'pH'){
      const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
      const oneWeekData = takeRightWhile(this.props.currentData, (dataEntry) => { return dataEntry.formattedDate === modifiedStartDate}); // eslint-disable-line
      oneWeekOfDataPoints = oneWeekData;
      this.setState({ oneWeek: oneWeekOfDataPoints });
    } else {
      console.log('currentData empty');
    }
  }

  extractOneMonthOfData = () => {
    console.log('extractMonthOfData');
    const { startDate, sensor } = this.props;
    let oneMonthOfDataPoints = [];
    if (sensor === 'humidity' || sensor === 'temperature') {
      // narrow currentData to the past 24 hours
      const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
      const oneDateData = takeRightWhile(this.props.currentData, (dataEntry) => { return dataEntry.formattedDate === modifiedStartDate}); // eslint-disable-line
      // slice by 7 data points
      const chunkedData = chunk(oneDateData, 7);
      // select 7 from 52 data points
      if (chunkedData.length !== 0) {
        oneMonthOfDataPoints.push(chunkedData[0][0]);
        oneMonthOfDataPoints.push(chunkedData[1][0]);
        oneMonthOfDataPoints.push(chunkedData[2][0]);
        oneMonthOfDataPoints.push(chunkedData[3][0]);
        oneMonthOfDataPoints.push(chunkedData[4][0]);
        oneMonthOfDataPoints.push(chunkedData[5][0]);
        oneMonthOfDataPoints.push(chunkedData[6][0]);
        this.setState({ oneMonth: oneMonthOfDataPoints }, () => {  console.log(`oneMonth in fn: ${this.state.oneMonth}`) });

      }
    } else if (sensor === 'pH'){
      const modifiedStartDate = moment(startDate).format('YYYY-MM-DD');
      const oneMonthData = takeRightWhile(this.props.currentData, (dataEntry) => { return dataEntry.formattedDate === modifiedStartDate}); // eslint-disable-line
      oneMonthOfDataPoints = oneMonthData;
      this.setState({ oneMonth: oneMonthOfDataPoints });
    } else {
      console.log('currentData empty');
    }
  }

  updateDataSeries = () => {
    console.log('updateDataSeries');
    const { startDate, endDate } = this.props;
    // if (this.state.oneDay === null) {
    //   this.extractOneDayOfData();
    // } else
    let tempData = [];
    if( endDate - startDate === 86400000 && this.state.oneDay>0) {

      tempData = this.state.oneDay;
      console.log(`data: ${tempData}`);
      this.setState({ dataSeries: tempData });
    } else if (endDate - startDate === 604800000 && this.state.oneWeek>0){
      tempData = this.state.oneWeek;
      this.setState({ dataSeries: tempData });
    } else if (this.state.oneMonth != null){
      tempData = this.state.oneMonth;
      this.setState({ dataSeries: tempData });
    }  // eslint-disable-line

  }

  render() {
    const { graphHeight, graphWidth, margin, sensor, startDate, endDate, minY, maxY } = this.props;

    console.log('render areaChart');
    const dateFormat = (time) => {
      if( endDate - startDate === 8640000) {
        return moment(time).format('hA')
      } else if (endDate - startDate === 604800000 ){
        return moment(time).format('dd')
      } else if (endDate - startDate > 604800000){
        return moment(time).format('dd')
      } else {  // eslint-disable-line
        return moment(time).format('dd')
      }
    };  // eslint-disable-line

    const dataMinRound = (Math.round(minY / 10) * 10);
    const dataMaxRound = (Math.round(maxY / 10) * 10);

    console.log(`1 day ${this.state.oneDay}`);
    console.log(`dataSeries ${this.state.dataSeries}`);

    return (
      <AreaChart
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
          label={{ value: sensor, position:'outside'}} tickCount={3}
          tick={{ stroke:'#fff', strokeWidth: 1 }}
          tickLine={false}
          tickFormatter={dateFormat}
          stroke='#fff' />
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
      </AreaChart>
    )
  }
};

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
