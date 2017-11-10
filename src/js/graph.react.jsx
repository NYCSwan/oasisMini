import React from 'react';
import { PropTypes } from 'prop-types';

const Graph = props => (
  <div className="graph-detail container">
    <h3 className={props.id}>data:{props.sensor}</h3>
  </div>
);

Graph.propTypes = {
  sensor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Graph;
