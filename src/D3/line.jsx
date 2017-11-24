import React from 'react';
import PropTypes from 'prop-types';


const Line = (props) => (
  <path
    d={props.d}
    height={props.height}
    width={props.width}
  />
);

Line.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  ref: PropTypes.string.isRequired
}

export default Line;
