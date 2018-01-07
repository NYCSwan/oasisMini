import React, { Component } from 'react';
import PropTypes from 'prop-types';

import findLastIndex from 'lodash/findLastIndex';
import forIn from 'lodash/forIn';
import toPairsIn from 'lodash/toPairsIn';
import forEach from 'lodash/forEach';
import pickBy from 'lodash/pickBy';
import { Col, Row, Button } from 'react-bootstrap';

import SiteHeader from './Header.react';
import FilterButtonGroup from './filter_button.react';

class Monitor extends Component {
  static propTypes = {
    sensorData: PropTypes.arrayOf(PropTypes.object).isRequired,
    plants: PropTypes.arrayOf(PropTypes.object).isRequired,
    chambers: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  state = {
    chamberId: '1',
    graphWidth: 300,
    graphHeight: 200,
    chamberData: [],
    optionsForFilter: this.props.chambers
  };

  componentWillMount(){
    console.log('component will mount');
    this.updateChamberData();
  }

  componentDidMount(){
    console.log('componentDidMount monitor');

  }

  shouldComponentUpdate (newProps, newState) {
    console.log('shouldComponentUpdate monitor');
    return this.props.sensorData !== newProps.sensorData || this.state.chamberId !== newState.chamberId || this.state.graphWidth !== newState.graphWidth || this.state.graphHeight !== newState.graphHeight || this.state.chamberData !== newState.chamberData
  }

  componentDidUpdate(newState) {
    console.log('componentDidUpdate monitor');
    if (this.state.chamberId !== newState.chamberId) {
      this.updateChamberData();
    }
  }

  updateChamberData = () => {
    console.log('update chamber data');
    const tempPlantData = pickBy(this.props.sensorData, (data) => data.chamber_id === this.state.chamberId);
    const plantDataArray = [];
    forEach(tempPlantData, (entry) => {
      plantDataArray.push(entry);
    })
    debugger
    this.setState({ chamberData: plantDataArray })
  }

  handleChamberIdChange = (newChamber) => {
    console.log('handleChamberIdChange');
    console.log(newChamber);
    let tempChamber = ''
    if (newChamber != null) {
      tempChamber = newChamber.target.value;
      this.setState({
        chamberId: tempChamber
      }, ()=>console.log(this.state.chamberId))
    }
    debugger

     // this.updateChamberData();
  }

  render() {
    const { plants } = this.props;
    const plantByChamber = pickBy(plants, (plant) => plant.chamber_id === this.state.chamberId);
    const phReadingIdx = findLastIndex(this.state.chamberData, (data) => data.sensors.pH !== "na");
    // debugger
    const ppmReadingIdx = findLastIndex(this.state.chamberData, (data) => data.sensors.PPM !== 'na');
    const temperatureReadingIdx = findLastIndex(this.state.chamberData, (data) =>  data.sensors.temperature !== 'na');
    const humidityReadingIdx = findLastIndex(this.state.chamberData, (data) => data.sensors.humidity !== 'na');
    const plantByChamberArray=[];

    forIn(plantByChamber, (value) => {
      if (value != null) {
        plantByChamberArray.push(toPairsIn(value));
      }
      return plantByChamberArray;
    });
    const dayOfCycle = plantByChamberArray[0][3][1];

debugger
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

        <SiteHeader title="Monitor" />
          <FilterButtonGroup
            onChange={this.handleChamberIdChange}
            chamberId={this.state.chamberId}
            options={this.state.optionsForFilter} />

        { (plantByChamber.length >= 1)
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
        }
      </div>
    );
  }
}

export default Monitor;
