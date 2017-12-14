import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { form } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';
import pickBy from 'lodash/pickBy';
import findIndex from 'lodash/findIndex';
import slice from 'lodash/slice';

import SiteHeader from './Header.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
import FormGrouping from './form_group.react';
import PresetSensors from './preset_sensors.react';

class NewGrow extends Component {
  static propTypes = {
    presets: PropTypes.arrayOf(PropTypes.object).isRequired,
    // chambers: PropTypes.arrayOf(PropTypes.object).isRequired,
    climates: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  state = {
    plantTypes: [
      'basil',
      'tomato',
      'lettuce',
      'kale',
      'broccoli',
      'cilantro',
      'bell Pepper',
      'green Beans',
      'customize'
    ],
    chamberOptions: [
      'chamber 1',
      'chamber 2',
      'chamber 3'
    ],
    selectedPlant:'',
    selectedPresetId:'',
    selectedChamber:'',
    isCalculated:false,
    settings: [],

  }

  componentDidMount() {
    console.log('component did mount new grow');
  }

  shouldComponentUpdate (newProps, newState) {
    console.log('shouldComponentUpdate new grow');
    return this.state.selectedChamber !== newState.selectedChamber || this.state.selectedPlant !== newState.selectedPlant || this.state.settings !== newState.settings || this.state.selectedPreset !== newState.selectedPreset
  }

  componentDidUpdate() {
    console.log('componentDidUpdate new grow');
      this.handleFormCalcsByPlant();
  }

  handleFormCalcsByPlant = () => {
    this.handlePresetSelection();
    if (this.state.isCalculated === false) {
      this.updateSettings()
      this.setState({ isCalculated: true })
    }
  }

  handlePlantRadioClick = (e) => {
    console.log(`handlePlantRadioClick: ${e.target.labels[0].innerText}`);
    this.setState({ selectedPlant: e.target.labels[0].innerText, isCalculated:false })
    this.handlePresetSelection(e);
  }

  handlePresetSelection = (value) => {
    console.log('handlePresetSelection new grow');
    const { presets } = this.props;

    if (value) {
      const tempPlant = value.target.labels[0].innerText;
      const idx = findIndex(presets, (plant) => plant.name === tempPlant);
      const currentPlantType = pickBy(presets, (plant) => plant.name === tempPlant );
      this.setState({ selectedPresetId: currentPlantType[idx].climate_id}, () => { console.log(this.state.selectedPresetId) });
    } else {
      const tempPlant = this.state.selectedPlant;
      const idx = findIndex(presets, (plant) => plant.name === tempPlant);
      const currentPlantType = pickBy(presets, (plant) => plant.name === tempPlant );
      console.log(`else setstate: ${currentPlantType[idx].climate_id}`);

      this.setState({ selectedPresetId: currentPlantType[idx].climate_id});
    }
  }

  updateSettings = () => {
    // update state.settings with plantTypes info
    const { presets } = this.props;
    const currentPlantState = upperFirst(this.state.selectedPlant);
    const currentPlantType = pickBy(presets, (plant) => plant.name === currentPlantState );
    const currentSettings = slice(currentPlantType, 4);
    this.setState({ settings: currentSettings });
  }

  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio: ${e.target.labels[0].innerText}`, this);
    this.setState({ selectedChamber: e.target.labels[0].innerText });
  }

  updateSlider = (phValue) => {
    console.log(`phValue ${phValue}`);
    this.setState({
      phValue
    })
  }

  render() {
    console.log('render new grow');
    return (
      <div className="newGrow container">
        <SiteHeader title="New Grow" />

        <form className='new_grow_form'>
          { (this.state.selectedPlant === '')
            ?
            <div className='selectedPlant'>
              <h3>Select A Plant</h3>
              <h3>OR</h3>
              <h3>Customize Your Own Settings</h3>
              <FormGrouping
                id={1}
                options={this.state.plantTypes} onClick={this.handlePlantRadioClick}
                />
              </div>
            :
            ''
          }

          { (this.state.selectedPlant === 'customize' && this.state.selectedChamber === '')
            ?
          // <CustomizeSensors />
          <div> Customized Here </div>
            :
            ''
          }
          { (this.state.selectedPlant !== '' && this.state.selectedPlant !== 'customize' && this.state.selectedChamber === '')
            ?
            <PresetSensors
              climates={this.props.climates}
              presets={this.props.presets}
              selectedPlant={this.state.selectedPlant}
              selectedPreset={this.state.selectedPreset}
              updateSlider={this.updateSlider}
            />
            :
            ''
          }
          { (this.state.selectedChamber === '' && this.state.selectedPlant !== '')
            ?
          <div className="chamberOptions">
            <FormGrouping
              id={2}
              options={this.state.chamberOptions}
              onClick={this.handleChamberRadioClick} />
          </div>
             :
            ''
          }
        </form>
        <PagerBack />
        <PagerFwd />
      </div>
    )
  }
}

export default NewGrow;
