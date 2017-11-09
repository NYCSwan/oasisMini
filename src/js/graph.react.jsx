import React from 'react';
import { PropTypes } from 'prop-types';

const Graph = props => (
    <div className="graph-detail container">
      <h3>{props.sensor}</h3>
    </div>
)

Graph.propTypes = {
    sensor: PropTypes.string.isRequired
}

export default Graph;