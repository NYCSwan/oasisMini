import React, { Component } from 'react';
import { form } from 'react-bootstrap';
import pickBy from 'lodash/pickBy';

import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
import CustomizeSensors from './customize_sensors.react';
import PlantFormGroup from './planttype_form_group.react';
import ChamberFormGroup from './chamber_options_form.react';
import Directions from './directions.react';
import PlantingDirections from './planting_directions.react';
import { getPlantRecipeData, getChamberData, getClimateData, postNewGrowingPlant } from '../utils/api_calls';

class NewGrow extends Component {
  // static propTypes = {
  //   match: PropTypes.shape({
  //     params: PropTypes.object
  //   }).isRequired,
  //   auth: PropTypes.shape({
  //     isAuthenticated: PropTypes.func,
  //     auth0: PropTypes.object
  //   }).isRequired
  // }

  state = {
    plantTypes: [],
    chamberOptions: [],
    climates: [],
    isBalanced: false,
    selectedPlant:'',
    selectedChamber:'',
    showDirections: false,
    newGrowPlant: []
  }

  componentDidMount() {
    console.log('component did mount new grow');
    this.getPlantRecipes();
    this.getChamberOptions();
    this.getClimates();
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

  getClimates = () => {
    console.log('get chambers');

    getClimateData().then((climates) => {
    console.log(climates);
    this.setState({ climates });
    });
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

  updatePhBalance = () => {
    console.log('timeout 0');
    setTimeout(20000);
    console.log('timeout 20000');
    this.setState({ isBalanced: true });
  }

  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio: ${e.target.labels[0].innerText}`);
    this.setState({
      selectedChamber: e.target.labels[0].innerText })
      console.log('handel form shoudl have chamber state');
  }

  showGrowDirections = () => {
    this.setState({
      showDirections: true
     })
  }

  submitGrowChange = () => {
    console.log('submit new grow plant -- device_id hardcoded');
    const response = {};
    response.chamber_id = this.state.chamberId;
    response.plant_recipe_id = this.state.newGrowPlant.r_id;
    response.climate_id = this.state.newGrowPlant.climate_id;
    response.device_id = 1;
    response.user_id = 1;

    postNewGrowingPlant(response);
  }

  render() {
    console.log('render new grow');

    return (
      <div className="newGrow container">

        <form className='new_grow_form'>
          { (this.state.selectedPlant === '') && (
            <div className='selectedPlant'>
              <h3>Select A Plant</h3>
              <h3>OR</h3>
              <h3>Customize Your Own Settings</h3>
              <PlantFormGroup
                options={this.state.plantTypes} onClick={this.handlePlantRadioClick}
                />
              </div>
        )}
          { (this.state.selectedPlant === 'customize' && this.state.selectedChamber === '') && (
            <CustomizeSensors
              {...this.props}
            />
          )}
          { (this.state.selectedChamber === '' && this.state.selectedPlant !== '' && this.state.showDirections === false) && (
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
          )}
        </form>

        { (this.state.selectedChamber !== '' && this.state.selectedPlant !== '' && this.state.isBalanced === false) && (
          <Directions
            newGrowPlant={this.state.newGrowPlant}
            climates={this.state.climates}
            handleClick={this.updatePhBalance}
            isBalanced={this.state.isBalanced}
            selectedChamber={this.state.selectedChamber}
            onClick={this.showGrowDirections}
          />
        )}

        { (this.state.showDirections === true) && (
          <PlantingDirections
            newGrowPlant={this.state.newGrowPlant}
            climates={this.state.climates}
            isBalanced={this.state.isBalanced}
            selectedChamber={this.state.selectedChamber}

          />
        )}
          <PagerBack
            className="grow" />
          <PagerFwd
            className="grow" />

      </div>
    )
  }
}

export default NewGrow;
