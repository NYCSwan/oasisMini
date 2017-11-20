import React from 'react';
import { PropTypes, string } from 'prop-types';

const MonitoredDataPoint = props => (
  <div className="monitor_chamber">
    <h2>{props.time}</h2>
    <h3>{`temp: ${props.temperature}`}</h3>
    <h3>{`humidity: ${props.humidity}`}</h3>
  </div>
);
MonitoredDataPoint.propTypes = {
  time: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired
};

export default MonitoredDataPoint;
