import React from 'react';
import PropTypes from 'prop-types';

const Graph = (props) => (
  <div>
    <h3>Humidity (%)</h3>
    <div className="graph-detail container">
      <h3 className={props.id}>data:{props.humidity}</h3>
      <h4>{props.startDate}-{props.endDate}</h4>
    </div>
  </div>
);


Graph.propTypes = {
  id: PropTypes.string.isRequired,
  sensor: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired
};

export default Graph;
