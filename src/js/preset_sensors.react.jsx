import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Slider from './slider.react';

class PresetSensors extends Component {
  static propTypes = {
    presets: PropTypes.arrayOf(PropTypes.object).isRequired,
    climates: PropTypes.arrayOf(PropTypes.object).isRequired

  }

  render() {
    const { presets, climates } = this.props;
    return (
      <div>
        <h3>preset_sensors</h3>
        <Slider />
      </div>
    )
  }
}

export default PresetSensors;
