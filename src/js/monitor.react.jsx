import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import findLastIndex from 'lodash/findLastIndex';
import pickBy from 'lodash/pickBy';
import map from 'lodash/map';
import forIn from 'lodash/forIn';

import { Col, Row } from 'react-bootstrap';

import Header from './Header.react';
import LineGraph from '../D3/lineGraph';

class Monitor extends Component {
  state = {
    chamber_id: '2',
    graphWidth: 600,
    graphHeight: 300,
    tempData: []
  };

  componentDidMount() {
    forIn(dataByChamber, (value) => {
      const temp = value.sensors.temperature;
      const time = value.time;
      this.setState({
        tempData: tempData.push([time, temp])
      })
    });
  }

  handleChamberChange = (event) => {
    this.setState({ chamber_id: event.target.value });
  };

  render() {
    const { sensor_data, plants } = this.props;

    const plantByChamber = pickBy(plants, (plant) => plant.chamber_id === this.state.chamber_id);
    const lastPhReading = findLastIndex(sensor_data, (sensor) => sensor.pH !== 'na');
    const lastPpmReading = findLastIndex(sensor_data, (sensor) => sensor.PPM !== 'na');
    const today = new Date(2017,8,4);
    const weekAgo = new Date(today - (1000*60*60*24*7));
    const dataByChamber = pickBy(sensor_data, (data) => data.chamber_id === this.state.chamber_id);

    return (
      <div className="monitor container">
        <Header />
        <h1>Monitor</h1>

        <div className="graphs container">
          <div className="filter">
            <input
              value={this.state.chamber_id}
              onChange={this.handleChamberChange}
              type="text"
              placeholder="chamber id"
            />
          </div>
          <div className="d3Graph humidity">
            <h3>Humidity (%)</h3>
            {map(dataByChamber, (data) => (
              <LineGraph
                key={data.id}
                startDate={today.toLocaleString()}
                endDate={weekAgo.toLocaleString()}
                sensor_data={data.sensors.temperature}
                graphHeight={this.state.graphHeight}
                graphWidth={this.state.graphWidth}
                {...data}
              />
            ))}
          </div>
          <div className="d3Graph height">
          <h3>Plant Height (In.)</h3>
          {map(dataByChamber, (data) => (
            <LineGraph
              key={data.id}
              startDate={today.toLocaleString()}
              endDate={weekAgo.toLocaleString()}
              sensor_data={data.sensors.height}
              graphHeight={this.state.graphHeight}
              graphWidth={this.state.graphWidth}
              {...data}
            />
          ))}
          </div>
          <div className="d3graph temperature">
          <h3>Temperature (*F)</h3>
          {map(dataByChamber, (data) => (
            <LineGraph
              key={data.id}
              startDate={today.toLocaleString()}
              endDate={weekAgo.toLocaleString()}
              sensor_data={data.sensors.temperature}
              graphHeight={this.state.graphHeight}
              graphWidth={this.state.graphWidth}
              {...data}
            />
          ))}
          </div>
        </div>

        <div className="bottom container readings">
            <Col className="ph">
             <Row><h3>{lastPhReading} </h3></Row>
              <Row><h3>pH</h3></Row>
             </Col>
            <Col className="dayOfCycle">
               <Row><h3>day {plantByChamber[0].day_of_cycle}</h3></Row>
            </Col>
            <Col className="PPM">
              <Row><h3>{lastPpmReading}</h3></Row>
              <Row><h3>PPM</h3></Row>
            </Col>
          </div>
      </div>
    );
  }
};

Monitor.propTypes = {
  sensor_data: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  sensor: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  plants: PropTypes.shape({
    plant: PropTypes.string.isRequired
  }).isRequired,
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  chamber_id: PropTypes.string.isRequired
}

export default Monitor;
