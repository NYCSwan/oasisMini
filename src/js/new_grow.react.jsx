import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { form } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';
import pickBy from 'lodash/pickBy';
import findIndex from 'lodash/findIndex';

import SiteHeader from './Header.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
import FormGrouping from './form_group.react';
import PresetSensors from './preset_sensors.react';

class NewGrow extends Component {
  static propTypes = {
    presets: PropTypes.arrayOf(PropTypes.object).isRequired,
    chambers: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    selectedPreset:'',
    selectedChamber:''
  }
  componentDidMount() {
    console.log('component did mount new grow');

  }

  shouldComponentUpdate (newProps, newState) {
    console.log('shouldComponentUpdate new grow');
    return this.state.selectedChamber !== newState.selectedChamber || this.state.selectedPlant !== newState.selectedPlant || this.state.selectedPreset !== newState.selectedPreset
  }

  componentDidUpdate() {
    console.log('componentDidUpdate new grow');
    this.handlePresetSelection();
  }

  handlePlantRadioClick = (e) => {
    console.log(`handlePlantRadioClick: ${e.target.labels[0].innerText}`, this);
    this.setState({ selectedPlant: e.target.labels[0].innerText}, () => {
      this.handlePresetSelection();
    });
  }

  handlePresetSelection = () => {
    console.log('handlePresetSelection');
    const { presets } = this.props;
    const currentPlantState = upperFirst(this.state.selectedPlant);
    const idx = findIndex(presets, (plant) => plant.name === currentPlantState);
    const currentPlantType = pickBy(presets, (plant) => plant.name === currentPlantState );

      if (currentPlantState === currentPlantType[idx].name) {
        console.log('setstate');
        this.setState({ selectedPreset: currentPlantType[idx].climate_id });
      }
  }

  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio: ${e.target.labels[0].innerText}`, this);
    this.setState({ selectedChamber: e.target.labels[0].innerText });
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
          <PresetSensors
            presets={this.props.presets}
            climates={this.props.climates}
            selectedPlant={this.state.selectedPlant}
            selectedPreset={this.state.selectedPreset}
            />
          }
          { (this.state.selectedChamber === '' && this.state.selectedPlant !== '')
            ?
          <FormGrouping
            id={2}
            options={this.state.chamberOptions}
            onClick={this.handleChamberRadioClick} />
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
