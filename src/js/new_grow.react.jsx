import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { form } from 'react-bootstrap';

import SiteHeader from './Header.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
import FormGrouping from './form_group.react';

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
      'green Beans'
    ],
    chamberOptions: [
      'chamber 1',
      'chamber 2',
      'chamber 3'
    ],
    presets: [
      'tropical',
      'temperate',
      'custom'
    ],
    selectedChamber:'',
    selectedPlant:'',
    selectedPreset:''
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
    this.handleRadioChange();
  }

  handleRadioChange = (e) => {
    this.handlePlantRadioChange(e);
    this.handlePresetRadioChange(e);
    this.handleChamberRadioChange(e);
  }

  handlePlantRadioClick = (e) => {
    console.log(`handlePlantRadioClick: ${e}`, this);
    this.setState({ selectedPlant: e });
  }

  handlePresetRadioClick = (e) => {
    this.setState({ selectedPreset: e });
    console.log(`handlePresetRadio: ${e}`, this);
  }

  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio: ${e}`, this);
    debugger
    this.setState({ selectedChamber: e });
  }

  render() {
    console.log('render new grow');
    return (
      <div className="newGrow container">
        <SiteHeader title="New Grow" />

        <form>
            <FormGrouping
              options={this.state.plantTypes} onClick={this.handlePlantRadioClick}
              />
            <FormGrouping
              options={this.state.presets} onClick={this.handlePresetRadioClick} />
          {/* props.selectedPlant
            ?
            <PlantPresetFormGroup
              presetOptions={this.props.presetOptions}
              plantTypes={this.props.plantTypes}
              onPresetClick={this.handlePresetRadioClick}
              onPlantClick={this.handlePlantRadioClick}
            />
            :
            <div>hi</div>
          */}
          <div className='controls'>
            Slider here
          </div>
          {/* (this.props.selectedPlant.length > 1 && this.props.selectedChamber === '')
            ? */}
          <FormGrouping
            options={this.state.chamberOptions}
            onClick={this.handleChamberRadioClick} />
            {/*  :
            <div>oh oh</div>
          */}
        </form>
        <PagerBack />
        <PagerFwd />
      </div>
    )
  }
}

NewGrow
export default NewGrow;
