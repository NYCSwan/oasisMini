import React, { Component } from 'react';
import PropTypes from 'prop-types';

import findLastIndex from 'lodash/findLastIndex';
import forIn from 'lodash/forIn';
import toPairsIn from 'lodash/toPairsIn';
import forEach from 'lodash/forEach';
import pickBy from 'lodash/pickBy';

import { Col, Row } from 'react-bootstrap';

import SiteHeader from './Header.react';
import LineGraph from '../D3/lineGraph';
import FilterButtonGroup from './filter_button.react';

class Monitor extends Component {
  state = {
    chamberId: '2',
    graphWidth: 300,
    graphHeight: 200,
    sensor1: 'temperature',
    sensor2: 'humidity',
    sensor3: 'height',
    optionsForFilter: [1,2,3]
  };

  componentDidMount(){
    console.log('componentDidMount monitor');

  }

  componentDidUpdate() {
    console.log('componentDidUpdate monitor');
    this.handleChamberIdChange();

  }

  handleChamberIdChange = (newChamber) => {
    console.log('handleChamberIdChange')
    let tempChamber = ''
    if (newChamber == null) {
      tempChamber = '1'
    } else {
      tempChamber = newChamber.toString();
    }

    this.setState({
      chamberId: tempChamber
     })
  }


  render() {
    const { sensorData, plants } = this.props;
    const plantByChamber = pickBy(plants, (plant) => plant.chamber_id === this.state.chamberId);
    const lastPhReading = findLastIndex(sensorData, (sensor) => sensor.pH !== 'na');
    const lastPpmReading = findLastIndex(sensorData, (sensor) => sensor.PPM !== 'na');
    const today = new Date(2017,7,4);
    const yesterday = new Date(today - (1000*60*60*24*1));
    const oneWeekAgo = new Date(today - (1000*60*60*24*7));
    const plantByChamberArray=[];
    let dayOfCycle;

    forIn(plantByChamber, (value) => {
      if (value != null) {
        plantByChamberArray.push(toPairsIn(value));
      }
      return plantByChamberArray;
    });

    forEach(plantByChamberArray,
       (plantInfo, index) => {
         if (plantInfo[index][0] === plantInfo[index].day_of_cycle) {
           dayOfCycle = plantInfo[index].day_of_cycle
        } else {
          dayOfCycle  = 1;
        }
        return dayOfCycle;
    })
    console.log('render monitor')

    return (
      <div className="monitor container">

        <SiteHeader title="Monitor"/>
          <FilterButtonGroup
            onChange={this.handleChamberIdChange}
            chamberId={this.state.chamberId}
            options={this.state.optionsForFilter} />
          <LineGraph
            chamberId={this.state.chamberId}
            sensorData={this.props.sensorData}
            sensor={this.state.sensor1}
            graphHeight={this.state.graphHeight}
            graphWidth={this.state.graphWidth}
            endDate={today}
            startDate={yesterday}
          />
        <LineGraph
            chamberId={this.state.chamberId}
            sensorData={this.props.sensorData}
            graphHeight={this.state.graphHeight}
            graphWidth={this.state.graphWidth}
            endDate={today}
            startDate={yesterday}
            sensor={this.state.sensor2}
          />
          <LineGraph
            chamberId={this.state.chamberId}
            sensorData={this.props.sensorData}
            graphHeight={this.state.graphHeight}
            graphWidth={this.state.graphWidth}
            endDate={today}
            startDate={oneWeekAgo}
            sensor={this.state.sensor3}

          />

        <Row className="bottom container readings">
          <Col className="ph" xs={4} sm={4} md={4}>
            <h2 className="xBigFont">{lastPhReading}</h2>
            <h4>pH</h4>
          </Col>
          <Col className="dayOfCycle half-circle" xs={4} sm={4} md={4}>
            <h4>Day</h4>
            <h4>{dayOfCycle}</h4>
          </Col>
          <Col className="PPM" xs={4} sm={4} md={4}>
            <h2 className="xBigFont">{lastPpmReading}</h2>
            <h4>PPM</h4>
          </Col>
        </Row>
      </div>
    );
  }
};

Monitor.propTypes = {
  sensorData: PropTypes.arrayOf(PropTypes.object).isRequired,
  plants: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Monitor;
