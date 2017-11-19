import React, { Component } from 'react';
import PropTypes from 'prop-types';

import findLastIndex from 'lodash/findLastIndex';
import pickBy from 'lodash/pickBy';
import forIn from 'lodash/forIn';
import toPairsIn from 'lodash/toPairsIn';
import forEach from 'lodash/forEach';

import { Col, Row } from 'react-bootstrap';

import SiteHeader from './Header.react';
import LineGraph from '../D3/lineGraph';
import ErrorBoundary from './helpers/error_boundary.react';

class Monitor extends Component {
  state = {
    chamberId: '2',
    graphWidth: 600,
    graphHeight: 300,
    currentData: []
  };

  componentDidMount(){
    this.updateChamberData();
  }

  handleChamberChange = (event) => {
    this.handleChamberIdChange(event);
    this.updateChamberData();
  }

  handleChamberIdChange = (event) => {
    this.setState({
      chamberId: event.target.value
     });
  }

  updateChamberData = () => {
    const  dataByChamber = pickBy(this.props.sensor_data,
      (data) => data.chamber_id === this.state.chamberId)
    const tempData = [];

    forIn(dataByChamber, (value) => {
      tempData.push([value.time, value.sensors.temperature]);
    })

    this.setState({
      currentData: tempData
    })
  }

  render() {
    const { sensor_data, plants } = this.props;
    const { chamberId, graphWidth, graphHeight, currentData } = this.state;
    const plantByChamber = pickBy(plants, (plant) => plant.chamber_id === chamberId);
    const lastPhReading = findLastIndex(sensor_data, (sensor) => sensor.pH !== 'na');
    const lastPpmReading = findLastIndex(sensor_data, (sensor) => sensor.PPM !== 'na');
    const today = new Date(2017,8,4);
    const oneWeekAgo = new Date(today - (1000*60*60*24*7));
    const plantByChamberArray=[];
    const dayOfCycle = [];

    forIn(plantByChamber, (value) => {
      if (value != null) {
        plantByChamberArray.push(toPairsIn(value));
      }
      return plantByChamberArray;
    });

    forEach(plantByChamberArray,
       (plantInfo, index) => {
         if (plantInfo[index][0] === plantInfo[index].day_of_cycle) {
           dayOfCycle.push(plantInfo[index].day_of_cycle)
        }
        return this.dayOfCycle;
    })

    return (
      <ErrorBoundary>
        <div className="monitor container">
          <SiteHeader title="Monitor"/>

          <div className="graphs container">
            <div className="filter">
              <input
                value={chamberId}
                onChange={this.handleChamberChange}
                type="text"
                placeholder="Which chamber?"
              />
              <p>{currentData}</p>
            </div>

            <LineGraph
              size={[graphWidth, graphHeight]}
              data={currentData}
              dates={[{today}, {oneWeekAgo}]}
              {...this.props}
             />
          </div>

          <div className="bottom container readings">
              <Col className="ph">
               <Row><h3>{lastPhReading} </h3></Row>
                <Row><h3>pH</h3></Row>
               </Col>
              <Col className="dayOfCycle">
                <Row><h3>day {dayOfCycle}</h3></Row>
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
  sensor: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  plants: PropTypes.shape({
    plant: PropTypes.string.isRequired
  }).isRequired,
  currentData: PropTypes.arrayOf(PropTypes.array).isRequired,
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  match: PropTypes.string.isRequired,
  chamberId: PropTypes.string.isRequired,
  plantByChamberArray: PropTypes.arrayOf(PropTypes.array).isRequired
}

export default Monitor;
