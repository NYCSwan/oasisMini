import React, { Component } from 'react';
import findLastIndex from 'lodash/findLastIndex';
import { Col, Row } from 'react-bootstrap';

import preload from '../../data.json';
import Header from './Header.react';
import Graph from './graph.react';

class Monitor extends Component {
  state = {
    chamber_id: '2'
  };

  handleChamberChange = (event) => {
    this.setState({ chamber_id: event.target.value });
  };

  render() {
    const plantByChamber = preload.plants.filter(plant => (plant.chamber_id === this.state.chamber_id));
    const lastPhReading = findLastIndex(preload.sensor_data, function(sensor) { return sensor.pH != 'na'; });
    const lastPpmReading = findLastIndex(preload.sensor_data, function(sensor) { return sensor.PPM != 'na'; });

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
          <div className="D3Graph humidity">
            <h3>Humidity (%)</h3>
            {preload.sensor_data
              .filter(data => `${data.chamber_id}`.indexOf(this.state.chamber_id) >= 0)
              .map(data => <Graph key={data.id} id={data.id} sensor={data.humidity} />)}
          </div>
          <div className="d3Graph height">
            <h3>Plant Height (In.)</h3>

            {preload.sensor_data
              .filter(data => `${data.chamber_id}`.indexOf(this.state.chamber_id) >= 0)
              .map(data => <Graph key={data.id} id={data.id} sensor={data.height} />)}
          </div>
          <div className="d3graph temperature">
            <h3>Temperature (*F)</h3>
            {preload.sensor_data
              .filter(data => `${data.chamber_id}`.indexOf(this.state.chamber_id) >= 0)
              .map(data => <Graph key={data.id} id={data.id} sensor={data.temperature} />)}
          </div>
        </div>
        
        <div className="bottom container readings">
            <Col className="ph">
             <Row><h3>{lastPhReading} </h3></Row>
              <Row><h3>pH</h3></Row>
             </Col>
            <Col className="dayOfCycle">
            {/* if state.chamber_id matches plant.chamber_id return <h3>{plant.day_of_cycle}</h3> */}
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
}

export default Monitor;
