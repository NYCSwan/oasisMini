import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash/pickBy';
import findIndex from 'lodash/findIndex';

import Slider from './slider.react';

class PresetSensors extends Component {
  static propTypes = {
    climates: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedPreset: PropTypes.string.isRequired,
    selectedPlant: PropTypes.string.isRequired,
    phValue: PropTypes.number.isRequired,
    updateSlider: PropTypes.func.isRequired,
    presets: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  state = {
    currentSetting:''
  }

  updateSlider(e) {
    this.props.updateSlider(e);
  }

  render() {
    console.log('render preset sensors');
    const { climates, selectedPreset, updateSlider, selectedPlant, presets, phValue } = this.props;
    const sensor = 'pH'
    const idx = findIndex(presets, (plant) => plant.name === selectedPlant);
    const currentPlantType = pickBy(presets, (plant) => plant.name === selectedPlant );

    return (
      <div className={this.state.currentSetting}>
        <h3>preset sensors</h3>
        { (selectedPreset === undefined)
          ?
            <Slider
              climates={climates}
              selectedPlant={selectedPlant}
              plantType={currentPlantType}
              selectedPreset={currentPlantType[idx].climate_id}
              onUserInput={updateSlider}
              sensor={sensor}
              phValue={phValue}
            />
          :
            <Slider
              climates={climates}
              selectedPlant={selectedPlant}
              selectedPreset={selectedPreset}
              onUserInput={updateSlider}
              sensor={sensor}
              phValue={phValue}
            />
        }
      </div>
    )
  }
}

export default PresetSensors;
