import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { form, Button } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';
import pickBy from 'lodash/pickBy';
import findKey from 'lodash/findKey';

import SiteHeader from './Header.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
import CustomizeSensors from './customize_sensors.react';
import PlantFormGroup from './planttype_form_group.react';
import ChamberFormGroup from './chamber_options_form.react';
import Directions from './directions.react';
import PlantingDirections from './planting_directions.react';
import { getPlantRecipeData, getChamberData } from '../utils/api_calls';

class NewGrow extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object
    }).isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func,
      auth0: PropTypes.object
    }).isRequired
  }

  state = {
    plantTypes: [],
    chamberOptions: [],
    isBalanced: false,
    selectedPlant:'',
    selectedChamber:'',
    showDirections: false,
    newGrowPlant: null
  }

  componentDidMount() {
    console.log('component did mount new grow');
    this.getPlantRecipes();
    this.getChamberOptions();
  }

  shouldComponentUpdate (newState) {
    console.log('shouldComponentUpdate new grow');
    return this.state.selectedChamber !== newState.selectedChamber || this.state.selectedPlant !== newState.selectedPlant || this.state.plantTypes !== newState.plantTypes || this.state.newGrowPlant !== newState.newGrowPlant || this.state.chamberOptions !== newState.chamberOptions
  }

  componentDidUpdate() {
    console.log('componentDidUpdate new grow');
  }

  getPlantRecipes = () => {
    console.log('get plant recipes');

  getPlantRecipeData().then((plantRecipes) => {
    console.log(plantRecipes);
    this.setState({ plantTypes: plantRecipes });
    });
  }

  getChamberOptions = () => {
    console.log('get chamber options');

    getChamberData().then((chamberOptions) => {
      console.log(chamberOptions);
      this.setState({ chamberOptions });
    });
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
    this.handleNewPlantSelection(e);
  }

  handleNewPlantSelection = (e) => {
    console.log('handleNewPlantSelection new grow');
    const tempPlant = e.target.labels[0].innerText;
    const currentPlantType = pickBy(this.state.plantTypes, (plant) => plant.shortname === tempPlant );
    this.setState({ newGrowPlant: currentPlantType });
  }

  // handlePresetSelection = (value) => {
  //   const { presets } = this.props;
  //
  //   if (value) {
  //     const tempPlant = value.target.labels[0].innerText;
  //     const idx = findIndex(presets, (plant) => plant.name === tempPlant);
  //     this.setState({ selectedPresetId: currentPlantType[idx].climate_id}, () => { console.log(this.state.selectedPresetId) });
  //   }  else if (this.state.selectedPresetId === '') {
  //     const tempPlant = this.state.selectedPlant;
  //     const idx = findIndex(presets, (plant) => plant.name === tempPlant);
  //     const currentPlantType = pickBy(presets, (plant) => plant.name === tempPlant );
  //     console.log(`else setstate: ${currentPlantType[idx].climate_id}`);
  //
  //     this.setState({ selectedPresetId: currentPlantType[idx].climate_id});
  //   } else {
  //     console.log('what the hell');
  //   }
  // }

  // updateSettings = () => {
    // console.log('update settings new grow');
  //   // update state.settings with plantTypes info
  //   const { presets, climates } = this.props;
  //
  //   const chamber = this.state.selectedChamber;
  //   const currentPlantState = upperFirst(this.state.selectedPlant);
  //   const currentPresetId = this.state.selectedPresetId;
  //   const currentPlantType = pickBy(presets, (plant) => plant.name === currentPlantState );
  //   const currentClimate = pickBy(climates, (climate) => climate.id === currentPresetId )
  //   const key = findKey(currentClimate);
  //   const climateName = currentClimate[key].type;
  //   const currentSettings = [];
  //   const plantKey = findKey(currentPlantType);
  //
  //   currentSettings.push(currentPlantType[plantKey].name);
  //   currentSettings.push(`${upperFirst(climateName)}, ${currentPlantType[plantKey].temperature}`);
  //   currentSettings.push(`pH ${currentPlantType[plantKey].pH}`);
  //   currentSettings.push(`Chamber ${chamber}`);
  //   this.setState({ settings: currentSettings });
  // }
  //
  // updateDirections = () => {
  //   console.log('update directions new grow');
  //   const { presets } = this.props;
  //   const currentPlantState = upperFirst(this.state.selectedPlant);
  //   const currentPlantType = pickBy(presets, (plant) => plant.name === currentPlantState );
  //   const tempDirections = [];
  //   const key = findKey(currentPlantType);
  //   tempDirections.push(currentPlantType[key].grow_directions);
  //   tempDirections.push("This may take about 5 minutes...");
  //   this.setState({ directions: tempDirections });
  // }

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

  showGrowDirections = () => {
    this.setState({
      showDirections: true,
      isBalanced: false
     })
  }

  render() {
    console.log('render new grow');

    return (
      <div className="newGrow container">
        <SiteHeader title="New Grow" auth={this.props.auth} match={this.props.match} />

        <form className='new_grow_form'>
          { (this.state.selectedPlant === '')
            ?
            <div className='selectedPlant'>
              <h3>Select A Plant</h3>
              <h3>OR</h3>
              <h3>Customize Your Own Settings</h3>
              <PlantFormGroup
                options={this.state.plantTypes} onClick={this.handlePlantRadioClick}
                />
              </div>
            :
            null
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
            null
          }
          { (this.state.selectedChamber === '' && this.state.selectedPlant !== '')
            ?
            <div className="chamberOptions">
              <div className="chamberImage">
                <ChamberFormGroup
                  options={this.state.chamberOptions}
                  onClick={this.handleChamberRadioClick}
                />
              </div>
              <h3 id="chamber" className="directions Futura-Lig">Select A Chamber</h3>
              <a href='/directions' className="btn btn-default">Submit
              </a>
            </div>
            :
             null
          }
        </form>

        { (this.state.selectedChamber !== '' && this.state.selectedPlant !== '' && this.state.selectedPreset !== '' && this.state.isBalanced === false )
        ?
          <Directions
            settings={this.state.settings}
            directions={this.state.directions}
            plant={this.state.selectedPlant}
            handleClick={this.updatePhBalance}
            isBalanced={this.state.isBalanced}
          />
        :
        null
        }
        { (this.state.isBalanced === true)
          ?
          <Button
            onClick={this.showDirections}>Next</Button>
          :
          null
        }
        { (this.state.showDirections === true)
          ?
          <PlantingDirections
            directions={this.state.directions}
            isBalanced={this.state.isBalanced}
            handleClick={this.submitGrowChange}
            settings={this.state.settings}
          />
          :
          null
        }
          <PagerBack
            className="grow" />
          <PagerFwd
            className="grow" />

      </div>
    )
  }
}

export default NewGrow;
