import React, { Component } from 'react';
import PropTypes from 'prop-types';

import findLastIndex from 'lodash/findLastIndex';
import pickBy from 'lodash/pickBy';
import map from 'lodash/map';


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
    const plantByChamber = pickBy(this.props.plants, (plant, key) => plant.chamber_id === this.state.chamber_id);
    const lastPhReading = findLastIndex(this.props.sensor_data, (sensor) => sensor.pH !== 'na');
    const lastPpmReading = findLastIndex(this.props.sensor_data, (sensor) => sensor.PPM !== 'na');
    const today = new Date;
    const weekAgoToday = new Date().setDate(today.getDate() - 7);
    const dataByChamber = pickBy(this.props.sensor_data, (data, key) => data.chamber_id === this.state.chamber_id);

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
            map(dataByChamber, data => {
               <Graph
                key={data.id}
                id={data.id}
                sensor={data.humidity}
                startDate={today}
                endDate={weekAgoToday}
                />
              })
           </div>
          <div className="d3Graph height">
            <h3>Plant Height (In.)</h3>
              map({dataByChamber}, data => {
                 <Graph
                  key={data.id}
                  id={data.id}
                  sensor={data.height}
                  startDate={today}
                  endDate={weekAgoToday}
                />
              })
          </div>
          <div className="d3graph temperature">
            <h3>Temperature (*F)</h3>
              map({dataByChamber}, data => {
                 <Graph
                  key={data.id}
                  id={data.id}
                  sensor={data.temperature}
                  startDate={today}
                  endDate={weekAgoToday}
                />
              })
          </div>
        </div>

        <div className="bottom container readings">
            <Col className="ph">
             <Row><h3>{lastPhReading} </h3></Row>
              <Row><h3>pH</h3></Row>
             </Col>
            <Col className="dayOfCycle">
            {/* if state.chamber_id matches plant.chamber_id  <h3>{plant.day_of_cycle}</h3> */}
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
  data: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  sensor: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  plants: PropTypes.object.isRequired,
  plant: PropTypes.object.isRequired,
  chamber_id: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired


}

export default Monitor;
