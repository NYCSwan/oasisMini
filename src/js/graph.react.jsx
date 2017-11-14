import React from 'react';
import PropTypes from 'prop-types';

const Graph = (props) => (
  <div className="graph-detail container">
    <h3 className={props.id}>data:{props.sensor}</h3>
  </div>
);


Graph.propTypes = {
  id: PropTypes.string.isRequired,
  sensor: PropTypes.string.isRequired
};

export default Graph;
