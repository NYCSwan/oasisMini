import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import findKey from 'lodash/findKey';
import findLastIndex from 'lodash/findLastIndex';
import isEmpty from 'lodash/isEmpty';
import forIn from 'lodash/forIn';
import pickBy from 'lodash/pickBy';
import { Col, Row, Button } from 'react-bootstrap';

import FilterButtonGroup from './filter_button.react';
import { getAllSensorMeasurementsChamber1, getAllSensorMeasurementsChamber3, getAllSensorMeasurementsChamber2, getGrowingPlants, getChamberData } from '../utils/api_calls';

class Monitor extends Component {
  state = {
    chamberId: 1,
    chamberData: [],
    growingPlants: [],
    chambers: []
  };

  componentDidMount(){
    console.log('componentDidMount monitor');
    this.getSensorMeasurementData();
    this.getGrowingPlantsData();
    this.getAllChamberData();
  }

  shouldComponentUpdate (newState) {
    console.log('shouldComponentUpdate monitor');
    return this.state.chamberId !== newState.chamberId || this.state.chamberData !== newState.chamberData || this.state.growingPlants !== newState.growingPlants
  }

  // componentDidUpdate(newState) {
  //   console.log('componentDidUpdate monitor');
  //   if (this.state.chamberId !== newState.chamberId) {
  //     this.getSensorMeasurementData();
  //   }
  //   if (this.state.growingPlants !== newState.growingPlants) {
  //     this.getGrowingPlantsData();
  //   }
  // }

  getGrowingPlantsData = () => {
    console.log('get growing plant data- sensor measurement data');

    getGrowingPlants().then((plants) => {
      this.setState({ growingPlants: plants });
    });
  }

  getAllChamberData = () => {
    console.log('get chamber info');

    getChamberData().then((chambers) => {
      this.setState({ chambers });
    })
  }
  //
  // setPlantInChamber = (plants) => {
  //   console.log('set plant data with default chamber 1 -- necessary???');
  //   const plantKey = findKey(plants);
  //   const tempPlantData = pickBy(plants, (plant) => plant[plantKey].chamber_id === this.state.chamberId);
  //   debugger
  //       // const plantDataArray = [];
  //       //
  //       // forEach(tempPlantData, (entry) => {
  //       //   plantDataArray.push(entry);
  //       // })
  //       this.setState({ plantInChamber: tempPlantData })
  // }

  getSensorMeasurementData = () => {
    console.log('get sensor measurents by chamber id');
    const { chamberId } = this.state;
// debugger
    if (chamberId === 1) {
      getAllSensorMeasurementsChamber1().then((sensorMeasurements) => {
        this.setState({ chamberData: sensorMeasurements });
        return sensorMeasurements;
      })
    } else if (chamberId === 2) {
      getAllSensorMeasurementsChamber2.then((sensorMeasurements) => {
        this.setState({ chamberData: sensorMeasurements });
        return sensorMeasurements;

      })
    } else {
      getAllSensorMeasurementsChamber3.then((sensorMeasurements) => {
        this.setState({ chamberData: sensorMeasurements });
        return sensorMeasurements;

      })
    }
  }

  handleChamberIdChange = (newChamber) => {
    console.log('handleChamberIdChange');
    console.log(newChamber);
    let tempChamber = ''
    if (newChamber != null) {
      tempChamber = newChamber.target.value;
      this.setState({
        chamberId: tempChamber
      }, ()=>console.log(`chamberId ${this.state.chamberId}`))
    }
  }

  render() {
    console.log('render monitor')
    const { chamberData, chamberId, growingPlants } = this.state;
    const currentPlantDataByChamber = [];

    forIn(chamberData, (reading) => {
      if (reading.chamber_id === chamberId) {
        currentPlantDataByChamber.push(reading);
      }
      return currentPlantDataByChamber;
    });

    const phReadingIdx = findLastIndex(currentPlantDataByChamber, (data) => data.sensor_id === 3);
    const ppmReadingIdx = findLastIndex(currentPlantDataByChamber, (data) => data.sensor_id === 4);
    const temperatureReadingIdx = findLastIndex(currentPlantDataByChamber, (data) =>  data.sensor_id === 2);
    const humidityReadingIdx = findLastIndex(currentPlantDataByChamber, (data) => data.sensor_id === 1);
    //
    const currentPlantInfo = pickBy(growingPlants, (plant) => plant.chamber_id === chamberId);
    const plantKey = findKey(currentPlantInfo);
    const now = new Date().getTime();
    let dayOfCycle = 1;

    if (isEmpty(currentPlantInfo)=== false) {
      const startedOn = Date.parse(currentPlantInfo[plantKey].started_datetime);
      dayOfCycle = new Date(now - startedOn).getDate();
    }

    return (
      <div className="monitor container">

        <FilterButtonGroup
          onChange={this.handleChamberIdChange}
          chamberId={this.state.chamberId}
          options={this.state.chambers} />

        { (this.state.chamberData.length >= 1)
        ?
        <Row className="readings">
          <Col className="bubble ph" xs={12} md={10} mdOffset={2}>
            <a href="/sensors/ph">
              <h2 className="xBigFont" key={currentPlantDataByChamber[phReadingIdx].time}>
                {currentPlantDataByChamber[phReadingIdx].value}
              </h2>
              <h4>pH</h4>
            </a>
          </Col>
          <Col className="bubble empty small" />
          <Col className="bubble ppm" xs={6} xsOffset={6} md={6}>
            <a href="/sensors/ppm">
              <h2 className="xBigFont">
                {currentPlantDataByChamber[ppmReadingIdx].value}
              </h2>
              <h4>PPM</h4>
            </a>
          </Col>
          <Col className="bubble temperature" xs={4} md={4} mdOffset={8} xsOffset={8}>
            <a href="/sensors/temperature">
              <h2 className="xBigFont">{currentPlantDataByChamber[temperatureReadingIdx].value}*</h2>
              <h4>F</h4>
            </a>
          </Col>
          <Col className="bubble empty md" />
          <Col className="bubble empty small" />
          <Col className="bubble humidity" xs={8} md={8} xsOffset={4} mdOffset={4}>
            <a href="/sensors/humidity">
              <h2 className="xBigFont">
                {currentPlantDataByChamber[humidityReadingIdx].value}%
              </h2>
              <h4>RH</h4>
            </a>
          </Col>
          <Col className="bubble dayOfCycle" xs={3} md={3}>
            <h4 className="xBigFont">Day {dayOfCycle}</h4>
          </Col>
        </Row>
        :
        <div>
          <h2>Sorry. You are not growing anything in this chamber right now.</h2>
          <a href="controls/newgrow" alt="grow something in this chamber">
            <Button>Start New Garden</Button>
          </a>
        </div>
        }
      </div>
    );
  }
}

export default Monitor;
