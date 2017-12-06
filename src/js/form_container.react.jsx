import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

import FormGrouping from './form_group.react';

class FormContainer extends Component {

  componentWillReceiveProps({ onPlantRadioClick, onPresetRadioClick, onChamberRadioClick, chamberOptions, plantTypes, presetOptions }) {
    console.log('componentWillReceiveProps form container');

    if (onPlantRadioClick !== this.props.onPlantRadioClick) {
      console.log('chamber function changed');
      this.handlePlantRadioClick();
    } else if (onPresetRadioClick !== this.props.onPresetRadioClick) {
      console.log('preset function changed');

      this.handlePresetRadioClick();
    } else if (onChamberRadioClick !== this.props.onChamberRadioClick) {
      console.log('chamber function changed');
      this.handleChamberRadioClick();
    } else if (chamberOptions !== this.props.chamberOptions || presetOptions !== this.props.presetOptions || plantTypes !== this.props.plantTypes) {
      console.log('chamber, plants, presets changed');
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate form container');
  }

  handleRadioChange = (e) => {
    console.log('handle radio click form container');
    this.handlePlantRadioClick(e);
    this.handlePresetRadioClick(e);
    this.handleChamberRadioClick(e);
  }
  handleChamberRadioClick = (e) => {
    console.log('handle chamber click form container');

    this.props.onChamberRadioClick(e);
  }

  handlePlantRadioClick = (e) => {
    console.log('handleplant click form container');

    this.props.onPlantRadioClick(e);
  }

  handlePresetRadioClick = (e) => {
    console.log('handlepreset click form container');

    this.props.onPresetRadioClick(e);
  }
  render() {
    console.log('form_container render');
    return (
      // <Form>
      //   <div>
      //     <FormGrouping
      //       options={this.props.plantTypes} onClick={this.handlePlantRadioClick} />
      //     <FormGrouping
      //       options={this.props.presetOptions} onClick={this.handlePresetRadioClick} />
      //   </div>
      //   {/* props.selectedPlant
      //     ?
      //     <PlantPresetFormGroup
      //       presetOptions={this.props.presetOptions}
      //       plantTypes={this.props.plantTypes}
      //       onPresetClick={this.handlePresetRadioClick}
      //       onPlantClick={this.handlePlantRadioClick}
      //     />
      //     :
      //     <div>hi</div>
      //   */}
      //   <div className='controls'>
      //     Slider here
      //   </div>
      //   {/* (this.props.selectedPlant.length > 1 && this.props.selectedChamber === '')
      //     ? */}
      //     <FormGrouping
      //       options={this.props.chamberOptions}
      //       onClick={this.handleChamberRadioClick} />
      //     {/*  :
      //     <div>oh oh</div>
      //   */}
      // </Form>
    )
  }
}

FormContainer.propTypes = {
  plantTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  chamberOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  presetOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPlantRadioClick: PropTypes.func.isRequired,
  onPresetRadioClick: PropTypes.func.isRequired,
  onChamberRadioClick: PropTypes.func.isRequired
}

export default FormContainer;
