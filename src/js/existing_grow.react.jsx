import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { form, FormGroup, Radio, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';
import pickBy from 'lodash/pickBy';
import findKey from 'lodash/findKey';
// import slice from 'lodash/slice';

import SiteHeader from './Header.react';
import Directions from './directions.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
// import FormGrouping from './form_group.react';

class ExistingGrow extends Component {
  static propTypes = {
    plantTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
    // chambers: PropTypes.arrayOf(PropTypes.object).isRequired,
    climates: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentGrows: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  state = {
    filledChambers: this.props.currentGrows,
    selectedPlant:'',
    selectedClimateId:'',
    selectedChamber:'',
    settings: [],
    directions: []
  }

  componentDidMount() {
    console.log('component did mount existing grow');
    // this.setChambers()
  }


  shouldComponentUpdate (newProps, newState) {
    console.log('shouldComponentUpdate existing grow');
    return this.state.filledChambers !== newState.filledChambers || this.state.selectedPlant !== newState.selectedPlant || this.state.settings !== newState.settings || this.state.selectedPreset !== newState.selectedPreset
  }

  componentDidUpdate() {
    console.log('componentDidUpdate existing grow');
    this.updateFormWithChamberData();
  }

  updateFormWithChamberData = () => {
    if (this.state.selectedChamber !== "") {
      this.updatePlantSelection();
    }
    if (this.state.selectedPlant !== "") {
      this.updateSettings();
      this.updateDirections();
    }
  }

  updatePlantSelection = () => {
    console.log('handlePlant selection');
    const tempFilledChambers = this.state.filledChambers;
    const currentChamber = this.state.selectedChamber;
    const selectedPlantData = pickBy(tempFilledChambers, (plant) => plant.chamber_id === currentChamber.toString() );
    const key = findKey(selectedPlantData);
    this.setState({ selectedPlant: selectedPlantData[key].name })
  }

  updateClimateId = () => {
    console.log('update climate id existing grow');
    // const tempFilledChambers
  }
  //
  // handlePresetSelection = (value) => {
  //   console.log('handlePresetSelection existing grow');
  //   const { plantTypes } = this.props;
  //
  //   if (value) {
  //     const tempPlant = value.target.labels[0].innerText;
  //     const idx = findIndex(plantTypes, (plant) => plant.name === tempPlant);
  //     const currentPlantType = pickBy(plantTypes, (plant) => plant.name === tempPlant );
  //     this.setState({ selectedPresetId: currentPlantType[idx].climate_id}, () => { console.log(this.state.selectedPresetId) });
  //   } else {
  //     const tempPlant = this.state.selectedPlant;
  //     const idx = findIndex(plantTypes, (plant) => plant.name === tempPlant);
  //     const currentPlantType = pickBy(plantTypes, (plant) => plant.name === tempPlant );
  //     console.log(`else setstate: ${currentPlantType[idx].climate_id}`);
  //
  //     this.setState({ selectedPresetId: currentPlantType[idx].climate_id});
  //   }
  // }
  //
  updateSettings = () => {
    console.log('update settings existing grow');
    // update state.settings with plantTypes info
    const { plantTypes, climates } = this.props;

    const chamber = this.state.selectedChamber;
    const currentPlantState = upperFirst(this.state.selectedPlant);
    const currentPresetId = this.state.selectedPresetId;
    const currentPlantType = pickBy(plantTypes, (plant) => plant.name === currentPlantState );
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
    console.log('update directions existing grow');
    const { plantTypes } = this.props;
    const currentPlantState = upperFirst(this.state.selectedPlant);
    const currentPlantType = pickBy(plantTypes, (plant) => plant.name === currentPlantState );
    const tempDirections = [];
    const key = findKey(currentPlantType);
    tempDirections.push(currentPlantType[key].grow_directions);
    tempDirections.push("This may take about 5 minutes...");
    this.setState({ directions: tempDirections });
  }

  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio existingGrow: ${e.nativeEvent.which}`);
    this.setState({ selectedChamber: e.nativeEvent.which }, () => { this.updateFormWithChamberData() });
  }

  // updateSlider = (phValue) => {
  //   console.log(`phValue ${phValue}`);
  //   this.setState({
  //     phValue
  //   })
  // }

  render() {
    console.log('render existing grow');


    return (
      <div className="existingGrow container">
        <SiteHeader title="Existing Gardens" />

        <form className='existing_grow_form'>
        {/* chamber selection */}
          <HelpBlock>Select a Chamber.</HelpBlock>
          <div className="existing-grow chambers">
            <FormGroup
            label="garden">
            {this.props.currentGrows.map(plant => { // eslint-disable-line
              return <Radio
                name={`radioGroup${plant.id}`}
                key={plant.id}
                className={`${plant.name} link`}
                onChange={this.handleChamberRadioClick}>
                {plant.chamber_id}
              </Radio>
            })}
            </FormGroup>
          </div>
          <FormGroup
            help="What would you like to change?"
            controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="pH">Change pH</option>
              <option value="chamber">Change chamber</option>
              <option value="ppm">Change PPM</option>
            </FormControl>
          </FormGroup>
        </form>
        <Directions
          settings={this.state.settings}
          directions={this.state.directions}
          plant={this.state.selectedPlant}
          handleClick={this.updatePhBalance} />
        <PagerBack />
        <PagerFwd />
      </div>
    )
  }
}

export default ExistingGrow;
