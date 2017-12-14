import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, ControlLabel } from 'react-bootstrap';
import pickBy from 'lodash/pickBy';

class Slider extends Component {
  static propTypes = {
    onUserInput: PropTypes.func.isRequired,
    climates: PropTypes.arrayOf(PropTypes.object).isRequired,
    // plantType: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedPreset: PropTypes.string.isRequired,
    sensor: PropTypes.string.isRequired,
    // phValue: PropTypes.number.isRequired
  }
  state = {
    phValue: 5.8,
    temperatureValue: "77",
    ppmValue: "355"
  }

  shouldComponentUpdate(newProps, newState) {
    console.log('shouldComponentUpdate slider');
    return this.props.selectedPreset !== newProps.selectedPreset || this.props.sensor !== newProps.sensor || this.state.phValue !== newState.phValue || this.state.temperatureValue !== newState.temperatureValue || this.state.ppmValue !== newState.ppmValue
  }

  updateSliderVal = (e) => {
    console.log('updateSliderVal slider');
    debugger
    this.setState({phValue: e.target.value});
    this.props.onUserInput(e);
  }

  render() {
    // find range
    const { climates, selectedPreset, sensor } = this.props;
    const currentClimate = pickBy(climates, (climate) => climate.id === selectedPreset );
    // const idx = keysIn(plantType);
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
          value={this.state.phValue}
        />
        <p>{currentSensorMax}</p>
      </Row>
    )
  }
}

export default Slider;
