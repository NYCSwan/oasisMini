import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AreaChart, Area, XAxis, YAxis, LabelList } from 'recharts';
import { max, min } from 'd3-array';

import moment from 'moment';

import forIn from 'lodash/forIn';
import pickBy from 'lodash/pickBy';
import get from 'lodash/get';

class LineGraph extends Component {
  state = {
    currentData: [],
    maxY: null,
    minY: null,
    minX: null,
    maxX: null
  }

  componentDidMount() {
    console.log('comonpent mounted linegraph');
      this.updateCurrentData();

  }

  componentWillReceiveProps({ margin, graphWidth, graphHeight, sensorData, chamberId, endDate, startDate, sensor }) {
    console.log('componentWillReceiveProps linegraph');

    if (sensorData !== this.props.sensorData && this.props.sensorData.length >0 || sensor !== this.props.sensor || chamberId !== this.props.chamberId) {
      console.log('change data, data, sensor or chamber changed');
      this.updateCurrentData();
      this.extractMaxMin();
    }
    if (endDate !== this.props.endDate || startDate !== this.props.startDate) {
      console.log('change data, dates changed');
      this.updateCurrentData();
    }
    if (margin !== this.props.margin || graphWidth !== this.props.graphWidth || graphHeight !== this.props.graphHeight) {
     console.log('change size');
    }
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

    updateCurrentData = () => {
      console.log('updateCurrentData');
      const { sensor } = this.props;
      const dataByChamber = pickBy(this.props.sensorData,
        (data) => data.chamber_id === this.props.chamberId);
      const tempData = [];

      forIn(dataByChamber, (value) => {
        // pick out sensor vals
          const tempValue = get(value.sensors, sensor)
          tempData.push({time: value.time, value: parseInt(tempValue, 10)});

      })
      // to array of objects [{time, sensor}]
      this.setState({
        currentData: tempData
      }, () => {
        this.extractMaxMin();
      })

    }

  render() {
    const { graphHeight, graphWidth, margin, sensor} = this.props;
    const dataMinRound = (Math.round(this.state.minY / 10) * 10);
    const dataMaxRound = (Math.round(this.state.maxY / 10) * 10);
    const dateFormat = (time) => {
      if( this.props.endDate - this.props.startDate === 8640000) {
        return moment(time).format('hA')
      } else if (this.props.endDate - this.props.startDate === 604800000 ){
        return moment(time).format('dd')
      } else if (this.props.endDate - this.props.startDate > 604800000){
        return moment(time).format('dd')
      } else {  // eslint-disable-line
        return moment(time).format('dd')
      }
    };  // eslint-disable-line

    return (
      <div>

        <AreaChart
          width={graphWidth}
          height={graphHeight}
          data={this.state.currentData}
          margin={{ top: margin.top, right: margin.right, bottom: margin.bottom, left: margin.left }}
        >
          <defs>
            <linearGradient id="valueColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" label={{ value: sensor, position: 'outside'}} tickCount={3} tick={{ stroke:'#fff', strokeWidth: 1 }} tickLine={false} tickFormatter={dateFormat} stroke='#fff' />
          <YAxis domain={[dataMinRound, dataMaxRound]} tick={{ stroke:'#fff', strokeWidth: 1 }} tickCount={3} tickLine={false} stroke='#fff' />
          <LabelList dataKey={sensor} position="bottom center" />
          <Area type='monotone' dataKey='value' stroke='#fff' fillOpacity={1} fill="url(#valueColor)"/>
        </AreaChart>

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
