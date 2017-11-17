import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Line from './line';

const DataSeries = ( props ) => (
      <Line
        key={props.id} path={path(props.sensor_data)} color={props.color} />
);

DataSeries.defaultProps = {
  interpolate: 'linear'
}

DataSeries.propTypes = {
  sensor_data: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  sensor: PropTypes.string.isRequired,
  yScale: PropTypes.arrayOf(PropTypes.string).isRequired,
  xScale: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string.isRequired
}

export default DataSeries;
