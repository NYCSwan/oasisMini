import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { form, FormGroup, Radio, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
// import upperFirst from 'lodash/upperFirst';
// import pickBy from 'lodash/pickBy';
// import findIndex from 'lodash/findIndex';
// import slice from 'lodash/slice';

import SiteHeader from './Header.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
// import FormGrouping from './form_group.react';

class ExistingGrow extends Component {
  static propTypes = {
    plantTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
    chambers: PropTypes.arrayOf(PropTypes.object).isRequired,
    climates: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentGrows: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  state = {
    filledChambers: this.props.currentGrows,
    selectedPlant:'',
    selectedPresetId:'',
    selectedChamber:'',
    settings: []
  }

  componentDidMount() {
    console.log('component did mount existing grow');
    this.setChambers()
  }


  shouldComponentUpdate (newProps, newState) {
    console.log('shouldComponentUpdate existing grow');
    return this.state.filledChambers !== newState.filledChambers || this.state.selectedPlant !== newState.selectedPlant || this.state.settings !== newState.settings || this.state.selectedPreset !== newState.selectedPreset
  }

  componentDidUpdate() {
    console.log('componentDidUpdate existing grow');
      // this.handleFormCalcsByPlant();
  }

  setChambers = () => {
    const currentData = this.props.currentGrows;
    this.setState({ filledChambers: currentData });
  }
  handleFormCalcsByPlant = () => {
    this.handlePresetSelection();
    if (this.state.isCalculated === false) {
      this.updateSettings()
      this.setState({ isCalculated: true })
    }
  }

  // handlePlantRadioClick = (e) => {
  //   console.log(`handlePlantRadioClick: ${e.target.labels[0].innerText}`);
  //   this.setState({ selectedPlant: e.target.labels[0].innerText, isCalculated:false })
  //   this.handlePresetSelection(e);
  // }
  //
  // handlePresetSelection = (value) => {
  //   console.log('handlePresetSelection existing grow');
  //   const { presets } = this.props;
  //
  //   if (value) {
  //     const tempPlant = value.target.labels[0].innerText;
  //     const idx = findIndex(presets, (plant) => plant.name === tempPlant);
  //     const currentPlantType = pickBy(presets, (plant) => plant.name === tempPlant );
  //     this.setState({ selectedPresetId: currentPlantType[idx].climate_id}, () => { console.log(this.state.selectedPresetId) });
  //   } else {
  //     const tempPlant = this.state.selectedPlant;
  //     const idx = findIndex(presets, (plant) => plant.name === tempPlant);
  //     const currentPlantType = pickBy(presets, (plant) => plant.name === tempPlant );
  //     console.log(`else setstate: ${currentPlantType[idx].climate_id}`);
  //
  //     this.setState({ selectedPresetId: currentPlantType[idx].climate_id});
  //   }
  // }
  //
  // updateSettings = () => {
  //   // update state.settings with plantTypes info
  //   const { presets } = this.props;
  //   const currentPlantState = upperFirst(this.state.selectedPlant);
  //   const currentPlantType = pickBy(presets, (plant) => plant.name === currentPlantState );
  //   const currentSettings = slice(currentPlantType, 4);
  //   this.setState({ settings: currentSettings });
  // }
  //
  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio: ${e.target.labels[0].innerText}`, this);
    debugger
    this.setState({ selectedChamber: e.target.labels[0].innerText });
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
            {this.props.currentGrows.map(plant => {
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

        <PagerBack />
        <PagerFwd />
      </div>
    )
  }
}

export default ExistingGrow;
