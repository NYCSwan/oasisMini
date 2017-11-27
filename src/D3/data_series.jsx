import React from 'react';
import PropTypes from 'prop-types';

import Line from './line';

const DataSeries = ( props ) => (
      <Line
        key={props.id}
        path={props.path}
        color={props.color}
        {...props.sensor_data}/>
);

DataSeries.propTypes = {
  sensor_data: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  path: PropTypes.element.isRequired
}

export default DataSeries;
