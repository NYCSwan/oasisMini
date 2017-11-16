import React, { Component } from 'react';
import PropTypes from 'prop-types';

import findLastIndex from 'lodash/findLastIndex';
import pickBy from 'lodash/pickBy';
import map from 'lodash/map';
import toArray from 'lodash/toArray';
import entries from 'lodash/entries';
import forEach from 'lodash/forEach';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import mapValues from 'lodash/mapValues';
import { Col, Row } from 'react-bootstrap';

import Header from './Header.react';
import Graph from './graph.react';
import { getFormattedDate } from './helpers/dates';

class Monitor extends Component {
  state = {
    chamber_id: '2'
  };

  handleChamberChange = (event) => {
    this.setState({ chamber_id: event.target.value });
  };

  render() {
    const { sensor_data, plants } = this.props;

    const plantByChamber = pickBy(plants, (plant, key) => plant.chamber_id === this.state.chamber_id);
    const lastPhReading = findLastIndex(sensor_data, (sensor) => sensor.pH !== 'na');
    const lastPpmReading = findLastIndex(sensor_data, (sensor) => sensor.PPM !== 'na');
    const today = new Date();
    const weekAgo = new Date(today - (1000*60*60*24*7));
    const dataByChamber = pickBy(sensor_data, (data, key) => data.chamber_id === this.state.chamber_id);
    const humidityByChamber = map(dataByChamber, "humidity");
    const timeChamber = map(dataByChamber, "time");
debugger;
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
            {map(sensor_data, (data) => {
               return <Graph key={data.id}
                        startDate={today.toLocaleString()}
                        endDate={weekAgo.toLocaleString()}
                        {...data}
                      />
            })}
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
  sensor_data: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  sensor: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  plants: PropTypes.object.isRequired,
  plant: PropTypes.object.isRequired,
  chamber_id: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.number.isRequired
}

export default Monitor;
