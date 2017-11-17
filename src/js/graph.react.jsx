import React from 'react';
import PropTypes from 'prop-types';

const Graph = ( props ) => (
  <div>
    <svg
      width={props.graphWidth}
      height={props.graphHeight}>
      {props.children}
    </svg>
  </div>
);


Graph.propTypes = {
  graphWidth: PropTypes.number.isRequired,
  graphHeight: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired
};

export default Graph;
