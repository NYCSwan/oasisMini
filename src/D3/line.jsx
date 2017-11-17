import React from 'react';
import PropTypes from 'prop-types';

const Line = (props) => (
  <path
    d={props.path}
    stroke={props.color}
    strokeWidth={props.lineWidth}
    fill="none" />
);

Line.defaultProps = {
  path: '',
  color: 'white',
  lineWidth: 2
};

Line.propTypes = {
  color: PropTypes.string,
  path: PropTypes.element,
  lineWidth: PropTypes.number
}

export default Line;
