import React from 'react';
import preload from '../../data.json';
import Header from './header.react';
import MonitoredDataPoint from './monitored_data_point.react'

const Monitor = () => (
  <div className="monitor">
    <Header />
    {preload.sensor_data.map( data => (
      <MonitoredDataPoint key={data.time} {...data} />
    ))}
  </div>
)

export default Monitor;
