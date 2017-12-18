import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { form } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';
import pickBy from 'lodash/pickBy';
import findIndex from 'lodash/findIndex';
import findKey from 'lodash/findKey';

import SiteHeader from './Header.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
import CustomizeSensors from './customize_sensors.react';
import FormGrouping from './form_group.react';
import Directions from './directions.react';

class NewGrow extends Component {
  static propTypes = {
    presets: PropTypes.arrayOf(PropTypes.object).isRequired,
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
      'Chamber1',
      'Chamber2',
      'Chamber3'
    ],
    isBalanced: false,
    selectedPlant:'',
    selectedChamber:'',
    settings: [],
    phValue:0,
    directions: []
  }

  componentDidMount() {
    console.log('component did mount new grow');
  }

  shouldComponentUpdate (newState) {
    console.log('shouldComponentUpdate new grow');
    return this.state.selectedChamber !== newState.selectedChamber || this.state.settings !== newState.settings || this.state.selectedPresetId !== newState.selectedPresetId || this.state.selectedPlant !== newState.selectedPlant || this.state.directions !== newState.directions
  }

  componentDidUpdate() {
    console.log('componentDidUpdate new grow');
  }

  handleFormCalcsByPlant = () => {
    if ( this.state.selectedChamber !== '') {
      this.updateSettings();
      this.updateDirections();
    }
  }

  handlePlantRadioClick = (e) => {
    console.log(`handlePlantRadioClick: ${e.target.labels[0].innerText}`);
    this.setState({ selectedPlant: e.target.labels[0].innerText })
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
    }  else if (this.state.selectedPresetId === '') {
      const tempPlant = this.state.selectedPlant;
      const idx = findIndex(presets, (plant) => plant.name === tempPlant);
      const currentPlantType = pickBy(presets, (plant) => plant.name === tempPlant );
      console.log(`else setstate: ${currentPlantType[idx].climate_id}`);

      this.setState({ selectedPresetId: currentPlantType[idx].climate_id});
    } else {
      console.log('what the hell')
    }
  }

  updateSettings = () => {
    console.log('update settings new grow');
    // update state.settings with plantTypes info
    const { presets, climates } = this.props;

    const chamber = this.state.selectedChamber;
    const currentPlantState = upperFirst(this.state.selectedPlant);
    const currentPresetId = this.state.selectedPresetId;
    const currentPlantType = pickBy(presets, (plant) => plant.name === currentPlantState );
    const currentClimate = pickBy(climates, (climate) => climate.id === currentPresetId )
    const key = findKey(currentClimate);
    const climateName = currentClimate[key].type;
    const currentSettings = [];
    const plantKey = findKey(currentPlantType);

    currentSettings.push(currentPlantType[plantKey].name);
    currentSettings.push(`${upperFirst(climateName)}, ${currentPlantType[plantKey].temperature}`);
    currentSettings.push(`pH ${currentPlantType[plantKey].pH}`);
    currentSettings.push(`Chamber ${chamber}`);
    this.setState({ settings: currentSettings });
  }

  updateDirections = () => {
    console.log('update directions new grow');
    const { presets } = this.props;
    const currentPlantState = upperFirst(this.state.selectedPlant);
    const currentPlantType = pickBy(presets, (plant) => plant.name === currentPlantState );
    const tempDirections = [];
    const key = findKey(currentPlantType);
    tempDirections.push(currentPlantType[key].grow_directions);
    tempDirections.push("This may take about 5 minutes...");
    this.setState({ directions: tempDirections });
  }

  updatePhBalance = (e) => {
    console.log('timeout 0');
    setTimeout(20000);
    console.log('timeout 20000');
    console.log(e);
    this.setState({ isBalanced: true });
  }

  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio: ${e.target.labels[0].innerText}`);
    this.setState({
      selectedChamber: e.target.labels[0].innerText }, () => { this.handleFormCalcsByPlant();
      console.log('handel form shoudl have chamber state')  });
  }

  updateSliderVal = (phValue) => {
    console.log(`phValue ${phValue}`);
    debugger;
    this.setState({ phValue });
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
            <CustomizeSensors
              climates={this.props.climates}
              presets={this.props.presets}
              selectedPlant={this.state.selectedPlant}
              selectedPreset={this.state.selectedPreset}
              updateSlider={this.updateSliderVal}
            />
            :
            ''
          }
          {/* (this.state.selectedPlant !== '' && this.state.selectedPlant !== 'customize' && this.state.selectedChamber === '')
            ?
            <PresetSensors
              climates={this.props.climates}
              presets={this.props.presets}
              selectedPlant={this.state.selectedPlant}
              selectedPreset={this.state.selectedPreset}
              updateSlider={this.updateSliderVal}
            />
            :
            ''
          */}
          { (this.state.selectedChamber === '' && this.state.selectedPlant !== '')
            ?
            <div className="chamberOptions">
              <div className="chamberImage">
                <FormGrouping
                  id={2}
                  options={this.state.chamberOptions}
                  onClick={this.handleChamberRadioClick} />
              </div>
              <h3 id="chamber directions" className="Futura-Lig">Select A Chamber</h3>
            </div>
            :
             ''
          }
        </form>
        { (this.state.selectedChamber !== '' && this.state.selectedPlant !== '' && this.state.selectedPreset !== '')
        ?
          <Directions
            settings={this.state.settings}
            directions={this.state.directions}
            plant={this.state.selectedPlant}
            handleClick={this.updatePhBalance}
            isBalanced={this.state.isBalanced}
          />
        :
        ''
        }
        <div className="pagers">
          <PagerBack />
          <PagerFwd />
        </div>
      </div>
    )
  }
}

export default NewGrow;
