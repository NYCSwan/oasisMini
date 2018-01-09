import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import findLastIndex from 'lodash/findLastIndex';
// import forIn from 'lodash/forIn';
// import toPairsIn from 'lodash/toPairsIn';
import forEach from 'lodash/forEach';
import pickBy from 'lodash/pickBy';
// import { Col, Row, Button } from 'react-bootstrap';

import FilterButtonGroup from './filter_button.react';
import { getAllSensorMeasurementsChamber1, getAllSensorMeasurementsChamber3, getAllSensorMeasurementsChamber2, getGrowingPlants, getChamberData } from '../utils/api_calls';

class Monitor extends Component {
  // static propTypes = {
    // sensorData: PropTypes.arrayOf(PropTypes.object).isRequired,
    // plants: PropTypes.arrayOf(PropTypes.object).isRequired,
    // chambers: PropTypes.arrayOf(PropTypes.object).isRequired
  // }

  state = {
    chamberId: '1',
    graphWidth: 300,
    graphHeight: 200,
    chamberData: [],
    growingPlants: [],
    plantInChamber: []
  };
  //
  // componentWillMount(){
  //   console.log('component will mount');
  // }

  componentDidMount(){
    console.log('componentDidMount monitor');
    this.getSensorMeasurementData();
    this.getGrowingPlantsData();
    this.getAllChamberData();
  }

  shouldComponentUpdate (newState) {
    console.log('shouldComponentUpdate monitor');
    return this.state.chamberId !== newState.chamberId || this.state.graphWidth !== newState.graphWidth || this.state.graphHeight !== newState.graphHeight || this.state.chamberData !== newState.chamberData || this.state.plantInChamber !== newState.plantInChamber || this.state.sensorData !== newState.sensorData
  }

  componentDidUpdate(newState) {
    console.log('componentDidUpdate monitor');
    if (this.state.chamberId !== newState.chamberId) {
      this.updateSensorMeasurementData(newState);
      this.setPlantDataByChamber();
    }
  }

  getSensorMeasurementData = () => {
    console.log('get sensor measurement data');

    getAllSensorMeasurementsChamber1().then((sensorMeasurements) => {
      this.setState({ chamberData: sensorMeasurements });
    })
  }

  getGrowingPlantsData = () => {
    console.log('get sensor measurement data');

    getGrowingPlants().then((plants) => {
      this.setState({ growingPlants: plants });
      this.setPlantDataByChamber();
    })
  }

  getAllChamberData = () => {
    console.log('get chamber info');

    getChamberData().then((chamber) => {
      this.setState({ chambers: chamber });
    })
  }

  setPlantDataByChamber = () => {
    console.log('set plant data with default chamber 1 -- necessary???');

    const tempPlantData = pickBy(this.state.growingPlants, (plant) => plant.chamber_id === this.state.chamberId);
    const plantDataArray = [];

    forEach(tempPlantData, (entry) => {
      plantDataArray.push(entry);
    })

    this.setState({ plantInChamber: plantDataArray })
  }

  updateSensorMeasurementData = () => {
    console.log('update sensor measurents by chamber id');
    const { chamber } = this.state.chamberId;

    if (chamber === '1' ) {
      getAllSensorMeasurementsChamber1().then((sensorMeasurements) => {
        this.setState({ chamberData: sensorMeasurements });
      })
    } else if (chamber === '2') {
      getAllSensorMeasurementsChamber2.then((sensorMeasurements) => {
        this.setState({ chamberData: sensorMeasurements });
      })
    } else {
      getAllSensorMeasurementsChamber3.then((sensorMeasurements) => {
        this.setState({ chamberData: sensorMeasurements });
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
      }, ()=>console.log(`chamber ${this.state.chamberId}`))
    }
  }

  render() {
    // const plantByChamber = pickBy(plants, (plant) => plant.chamber_id === this.state.chamberId);
    // const phReadingIdx = findLastIndex(this.state.chamberData, (data) => data.sensors.pH !== "na");
    // // debugger
    // const ppmReadingIdx = findLastIndex(this.state.chamberData, (data) => data.sensors.PPM !== 'na');
    // const temperatureReadingIdx = findLastIndex(this.state.chamberData, (data) =>  data.sensors.temperature !== 'na');
    // const humidityReadingIdx = findLastIndex(this.state.chamberData, (data) => data.sensors.humidity !== 'na');
    // const plantByChamberArray=[];
    //
    // forIn(plantByChamber, (value) => {
    //   if (value != null) {
    //     plantByChamberArray.push(toPairsIn(value));
    //   }
    //   return plantByChamberArray;
    // });
    // const dayOfCycle = plantByChamberArray[0][3][1];


    // forEach(plantByChamberArray,
    //    (plantInfo, index) => {
    //      if (plantInfo[index][0] === plantInfo[index].day_of_cycle) {
    //        dayOfCycle = plantInfo[index].day_of_cycle
    //     } else {
    //       dayOfCycle  = 1;
    //     }
    //     return dayOfCycle;
    // })
    console.log('render monitor')
    // console.log(`plants ${this.state.chamberData}`);
    // console.log(`plantByChamberArray ${plantByChamberArray}`);
    // console.log(`phReadingIdx ${phReadingIdx}`);
    // console.log(`ppmReadingIdx ${ppmReadingIdx}`);
    // console.log(`temperatureReadingIdx ${temperatureReadingIdx}`);
    // console.log(`chamber ${this.state.chamberId}`);
// Not filtering in proper way. Something snags - compW stackoverflow,
    return (
      <div className="monitor container">

        <FilterButtonGroup
          onChange={this.handleChamberIdChange}
          chamberId={this.state.chamberId}
          options={this.state.chamberData} />
          {JSON.stringify(this.state.chamberData)}
        {/* (this.state.plantInChamber.length >= 1)
        ?
        <Row className="readings">
          <Col className="bubble ph" xs={12} md={10} mdOffset={2}>
            <a href="/sensors/ph">
              <h2 className="xBigFont">
                {this.state.chamberData[phReadingIdx].sensors.pH}
              </h2>
              <h4>pH</h4>
            </a>
          </Col>
          <Col className="bubble empty small" />
          <Col className="bubble ppm" xs={6} xsOffset={6} md={6}>
            <a href="/sensors/ppm">
              <h2 className="xBigFont">
                {this.state.chamberData[ppmReadingIdx].sensors.PPM}
              </h2>
              <h4>PPM</h4>
            </a>
          </Col>
          <Col className="bubble temperature" xs={4} md={4} mdOffset={8} xsOffset={8}>
            <a href="/sensors/temperature">
              <h2 className="xBigFont">{this.state.chamberData[temperatureReadingIdx].sensors.temperature}*</h2>
              <h4>F</h4>
            </a>
          </Col>
          <Col className="bubble empty md" />
          <Col className="bubble empty small" />
          <Col className="bubble humidity" xs={8} md={8} xsOffset={4} mdOffset={4}>
            <a href="/sensors/humidity">
              <h2 className="xBigFont">
                {this.state.chamberData[humidityReadingIdx].sensors.humidity}%
              </h2>
            <h4>humidity</h4>
            </a>
          </Col>
          <Col className="bubble dayOfCycle" xs={3} md={3}>
            <h4 className="xBigFont">Day {dayOfCycle}</h4>
          </Col>
        </Row>
        :
        <div>
          <h2>Sorry. You are not growing anything in this chamber right now.</h2>
          <a href="/newgrow" alt="grow something in this chamber">
            <Button>Start New Grow</Button>
          </a>
        </div>
        */}
      </div>
    );
  }
}

export default Monitor;
