import React from 'react';
import preload from '../../data.json';
import Header from './Header.react';
import MonitoredDataPoint from './monitored_data_point.react'

const Monitor = () => (
  <div className="monitor">
    <Header />
    <h1>Monitor</h1>
    <div className="container">
      <div>filter function by chamber</div>
    <div className="D3Graph temperature">
      {preload.sensor_data.map( data => (
        <h3>{data.temperature}</h3>
      ))}
    </div>
    <div className="D3Graph humidity">
      {preload.sensor_data.map( data => (
        <h3>{data.humidity}</h3>
      ))}
    </div>
    <div className="d3Graph height">
      {preload.sensor_data.map( data => (
        <h3>{data.height}</h3>
      ))}
    </div>*/}
    <div className="pH">
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
    </div>
  </div>
)

export default Monitor;
