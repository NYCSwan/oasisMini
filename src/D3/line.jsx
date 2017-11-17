import React from 'react';
import * as d3 from 'd3';

const Line = (props) => (
  <path
    d={this.props.path}
    stroke={this.props.color} strokeWidth={this.props.lineWidth}
    fill="none" />
);

Line.defaultProps = {
  path: '',
  color: 'white',
  lineWidth: 2
};

export default Line;
