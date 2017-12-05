import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup, Radio } from 'react-bootstrap';

import PlantPresetFormGroup from './plant_preset_form_group.react';

class FormContainer extends Component {
  state = {
    selectedChamber: '',
    selectedPlant:'',
    selectedPreset:''
  }

  componentDidUpdate() {
    console.log('componentDidUpdate form container');
    this.handleRadioChange();
  }
  handleRadioChange = (e) => {
    this.handlePlantRadioChange(e);
    this.handlePresetRadioChange(e);
    this.handleChamberRadioChange(e);
  }

  handlePlantRadioChange = (e) => {
    e.preventDefault();
    console.log(`handlePlantRadioChange: ${e.target.nextSibling}`);
    debugger
    this.setState({ selectedPlant: e.target.nextSibling.data })
  }

  handlePresetRadio = (e) => {
    e.preventDefault();
    this.setState({ selectedPreset: e.target.nextSibling.data })
    console.log(`handlePresetRadio: ${e.target.nextSibling.data}`);
  }

  handleChamberRadio = (e) => {
    e.preventDefault();
    console.log(`handleChamberRadio: ${e.target.nextSibling.data}`);
    this.setState({ selectedChamber: e.target.nextSibling.data });
  }

  render() {

    const chamberOptions = this.props.chamberOptions.map(chamber => { // eslint-disable-line
      return (
        <Radio name='radioGroup3' key={chamber} className={`${chamber} link`} onChange={this.handleRadioChange} inline-block>
          {chamber}
        </Radio>
      )
    });


    return (
      <Form>
        { this.state.selectedPlant === '' && this.state.selectedPreset === '' ?
          <PlantPresetFormGroup
            presetOptions={this.props.presetOptions}
            plantTypes={this.props.plantTypes}
            onChange={(e) => this.handleRadioChange(e)}/> : <div>hi</div> }
        <div className={`${this.state.selectedPreset} controls`}>
          Slider here
        </div>
        <FormGroup>
          {chamberOptions}
        </FormGroup>
      </Form>
    )
  }
}
FormContainer.propTypes = {
  plantTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  chamberOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  presetOptions: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default FormContainer;
