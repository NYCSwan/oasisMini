import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, } from 'recharts';


class LineGraph extends Component {
  state = {

      updateCurrentData = () => {
        console.log('updateCurrentData');
        const dataByChamber = pickBy(this.props.sensorData,
          (data) => data.chamber_id === this.state.chamberId);
        const tempData = [];

        forIn(dataByChamber, (value) => {
          const valToNum = parseInt(value.sensors.temperature);
          tempData.push({time: value.time, value: valToNum});
        }) // to array of objects [{time, temp}] NEEDS TO CHANGE BASED ON SENSOR

        this.setState({
          currentData: tempData
        }, () => {
          console.log(`currentData: ${this.state.currentData}`);
        })

      }
  }
  render() {
    return (

      <div>
      <LineChart
      width={this.props.graphWidth}
      height={this.props.graphHeight}
      data={this.props.currentData}
      margin={{ top: this.props.margin.top, right: this.props.margin.right, bottom: this.props.margin.bottom, left: this.props.margin.left }}
      >
      <Line type="monotone" dataKey="value" stroke="#fff" />
      <XAxis dataKey="time" label="Date" />
      <YAxis domain={['value', 'value']} label={this.props.sensor} />
      </LineChart>
      </div>
    )
  }

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
  margin: PropTypes.objectOf(PropTypes.number),
  sensor: PropTypes.string.isRequired,
  chamberId: PropTypes.string.isRequired
}

export default LineGraph;
