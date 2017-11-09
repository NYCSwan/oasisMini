import React, { Component } from 'react';
import preload from '../../data.json';
import Header from './Header.react';
import Graph from './graph.react';

class Monitor extends Component {
  state = {
      chamber_id: '2'
    };

  handleChamberChange = (event) => {
    this.setState({chamber_id: event.target.value});
  };

  render () {
    return (
      <div className="monitor">
        <Header />
        <h1>Monitor</h1>
        <div className="container">
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
            .filter(data => `${data.chamber_id}`.indexOf(this.state.chamber_id) >=0)
            .map( data => (
            <Graph key={data.id} id={data.id} sensor={data.humidity} />
          ))}
        </div>
        <div className="d3Graph height">
          <h3>Plant Height (In.)</h3>

          {preload.sensor_data
            .filter(data => `${data.chamber_id}`.indexOf(this.state.chamber_id) >=0)
            .map( data => (
            <Graph key={data.id} id={data.id} sensor={data.height} />
          ))}
        </div>
    {/*    <div className="pH">
          {preload.sensor_data.map(data => <h3>pH: {data.pH}</h3>)}
        </div>
       <div className="PPM">
          {preload.sensor_data.map( data => (
            <h3>ppm: {data.PPM}</h3>
          ))}
        </div>
          <div className="dayOfCycle">
            {preload.plants.map( plant => (
              <h2>{plant.day_of_cycle}</h2>
            ))}
          </div>
    */}
         <div className="d3graph temperature">
          <h3>Temperature (*F)</h3>
          {preload.sensor_data
            .filter(data => `${data.chamber_id}`.indexOf(this.state.chamber_id) >=0)
            .map( data => (
              <Graph key={data.id} id={data.id} sensor={data.temperature} />
           ))}
         </div>
        </div>
      </div>
      );
    }
}

export default Monitor;
