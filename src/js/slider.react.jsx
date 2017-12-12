import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, ControlLabel } from 'react-bootstrap';
import pickBy from 'lodash/pickBy';
import keysIn from 'lodash/keysIn';

class Slider extends Component {
  static propTypes = {
    updateSlider: PropTypes.func.isRequired,
    climates: PropTypes.arrayOf(PropTypes.object).isRequired,
    plantType: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedPreset: PropTypes.string.isRequired,
    sensor: PropTypes.string.isRequired
  }

  updateSliderVal = (e) => {
    this.props.updateSlider(e);
  }

  render() {
    // find range
    const { climates, selectedPreset, sensor, plantType } = this.props;
    const currentClimate = pickBy(climates, (climate) => climate.id === selectedPreset );
    const idx = keysIn(plantType);
    const startingSlideDotVal= plantType[idx].pH;
    const currentSensorMin = currentClimate[selectedPreset-1].phMin;
    const currentSensorMax = currentClimate[selectedPreset-1].phMax;

    return (
      <Row className="slider">
        <ControlLabel htmlFor={sensor}>{ sensor }</ControlLabel>
        <p>{currentSensorMin}</p>
        <input
          id="slide"
          type="range"
          min={currentSensorMin}
          max={currentSensorMax}
          step="5"
          onChange={this.updateSliderVal}
          value={startingSlideDotVal}
        />
        <p>{currentSensorMax}</p>
      </Row>
    )
  }
}

export default Slider;
