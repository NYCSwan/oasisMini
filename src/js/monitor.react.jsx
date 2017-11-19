import React, { Component } from 'react';
import PropTypes from 'prop-types';

import findLastIndex from 'lodash/findLastIndex';
import pickBy from 'lodash/pickBy';
import forIn from 'lodash/forIn';

import { Col, Row } from 'react-bootstrap';

import Header from './Header.react';
import LineGraph from '../D3/lineGraph';
import ErrorBoundary from './helpers/error_boundary.react';

class Monitor extends Component {
  state = {
    chamber_id: '2',
    graphWidth: 600,
    graphHeight: 300,
    currentData: []
  };

  componentDidMount(){
    this.updateChamberData();
  }

  componentDidUpdate() {
    this.updateChamberData();
  }

  handleChamberChange = () => {
    handleChamberIdChange();
    handleChamberDataChange();
  }

  handleChamberIdChange = (event) => {
    this.setState({
      chamber_id: event.target.value
     });
  };

  handleChamberDataChange = () => {
    this.setState({
      currentData: this.updateChamberData()
    });
  }

  updateChamberData = () => {
    const dataByChamber = pickBy(this.props.sensor_data,
      (data) => data.chamber_id === this.state.chamber_id);
    const tempData = [];

    forIn(dataByChamber, (value) => {
      const {temp} = value.sensors.temperature;
      const {time} = value.time;
      tempData.push([time, temp])
    })

    this.setState({
      currentData: tempData
    })
  }

  render() {
    const { sensor_data, plants } = this.props;

    const plantByChamber = pickBy(plants, (plant) => plant.chamber_id === this.state.chamber_id);
    const lastPhReading = findLastIndex(sensor_data, (sensor) => sensor.pH !== 'na');
    const lastPpmReading = findLastIndex(sensor_data, (sensor) => sensor.PPM !== 'na');
    const today = new Date(2017,8,4);
    const oneWeekAgo = new Date(today - (1000*60*60*24*7));

    return (
      <ErrorBoundary>
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

          {/*  data to sub out for currentData */}
            <LineGraph
              key={this.props.id}
              data={currentData}
              size={[this.state.graphWidth, this.state.graphHeight]}
              dates={[{today}, {oneWeekAgo}]}
             />
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
      </ErrorBoundary>
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
  currentData: PropTypes.arrayOf(PropTypes.array).isRequired,
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  chamber_id: PropTypes.string.isRequired
}

export default Monitor;
