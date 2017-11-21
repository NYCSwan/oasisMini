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
import FilterButtonGroup from './filter_button.react';

class Monitor extends Component {
  state = {
    chamberId: '2',
    graphWidth: 600,
    graphHeight: 300,
    currentTemperatureData: [],
    currentHumidityData: [],
    currentHeightData: [],
    sensor1: 'temperature',
    sensor2: 'humidity',
    sensor3: 'height'
  };

  componentDidMount(){
    console.log('componentDidMount monitor');
    this.updateChamberData();
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps monitor');
    if (nextProps.sensor_data && nextProps.sensor_data.length > 0) {
      this.updateChamberData(nextProps);
      console.log(nextProps);
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate monitor');
  }

  handleChamberChange = (event) => {
    console.log('handleChamberChange monitor');
    this.handleChamberIdChange(event);
    this.updateChamberData();
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

  updateChamberData = () => {
    console.log('updateChamberData monitor');
    this.updateTemperatureChamberData();
    this.updateHumidityChamberData();
    this.updateHeightChamberData()
  }

  updateTemperatureChamberData = () => {
    const dataByChamber = pickBy(this.props.sensor_data,
      (data) => data.chamber_id === this.state.chamberId);
    const tempData = [];
    forIn(dataByChamber, (value) => {
      tempData.push({time: value.time, value: value.sensors.temperature});
    }) // to array of objects [{time, temp}]

    this.setState({
      currentTemperatureData: tempData
    })
    console.log(`temperature: ${tempData}`);
    return tempData;
  }
  updateHumidityChamberData = () => {
    const dataByChamber = pickBy(this.props.sensor_data,
      (data) => data.chamber_id === this.state.chamberId)
    const tempData = [];
    forIn(dataByChamber, (value) => {
      tempData.push({time: value.time, value: value.sensors.humidity});
    }) // to array of objects [{time, humidity}]

    this.setState({
      currentHumidityData: tempData
    })
    console.log(`humidity: ${tempData}`);
    return tempData;
  }

  updateHeightChamberData = () => {
    const  dataByChamber = pickBy(this.props.sensor_data,
      (data) => data.chamber_id === this.state.chamberId);
    const tempData = [];
    forIn(dataByChamber, (value) => {
      tempData.push({time: value.time, value: value.sensors.height});
    }) // to array of objects [{time, plant height}]

    this.setState({
      currentHeightData: tempData
    })
    console.log(`height: ${tempData}`);
    return tempData;
  }

  render() {
    const { sensor_data, plants } = this.props;
    const plantByChamber = pickBy(plants, (plant) => plant.chamber_id === this.state.chamberId);
    const lastPhReading = findLastIndex(sensor_data, (sensor) => sensor.pH !== 'na');
    const lastPpmReading = findLastIndex(sensor_data, (sensor) => sensor.PPM !== 'na');
    const today = new Date(2017,8,4);
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

    let temperatureLineGraphComponent;
        if(this.state.currentTemperatureData !== undefined) {
            temperatureLineGraphComponent = <LineGraph
                          graphWidth={this.state.graphWidth} graphHeight={this.state.graphHeight}
                          curentData={this.state.currentTemperatureData}
                          sensor={this.state.sensor1}
                          endDate={today}
                          startDate={oneWeekAgo}
                          {...this.props}
                         />
        } else {
            temperatureLineGraphComponent = null
        }

    let humidityLineGraphComponent;
      if(this.state.currentHumidityData !== undefined) {
          humidityLineGraphComponent = <LineGraph
                        graphWidth={this.state.graphWidth} graphHeight={this.state.graphHeight}
                        sensor={this.state.sensor2}
                        curentData={this.state.currentHumidityData}
                        endDate={today}
                        startDate={oneWeekAgo}
                        {...this.props}
                       />
      } else {
          humidityLineGraphComponent = null
      }

      let heightLineGraphComponent;
        if(this.state.currentHeightData !== undefined) {
            heightLineGraphComponent = <LineGraph
                          graphWidth={this.state.graphWidth} graphHeight={this.state.graphHeight}
                          sensor={this.state.sensor3}
                          curentData={this.state.currentHeightData}
                          endDate={today}
                          startDate={oneWeekAgo}
                          {...this.props}
                         />
        } else {
            heightLineGraphComponent = null
        }

    return (
      <div className="monitor container">
        <SiteHeader title="Monitor"/>
        <div className="graphs container">
          <FilterButtonGroup onChange={this.handleChamberChange} chamberId={this.state.chamberId} value={this.state.chamberId}/>
          {/*  <input
              type="text"
              placeholder="Which chamber?"
            /> */}
            <p>{this.state.sensor_data}</p>
          {temperatureLineGraphComponent}
          {humidityLineGraphComponent}
          {heightLineGraphComponent}
        </div>

        <Row className="bottom container readings">
          <Col className="ph" xs={4} sm={4} md={4}>
            <h2 className="xBigFont">{lastPhReading}</h2>
            <h4>pH</h4>
          </Col>
          <Col className="dayOfCycle half-circle" xs={4} sm={4} md={4}>
            <h4>day {dayOfCycle}</h4>
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
  sensor_data: PropTypes.arrayOf(PropTypes.object).isRequired,
  plants: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired
}

export default Monitor;
