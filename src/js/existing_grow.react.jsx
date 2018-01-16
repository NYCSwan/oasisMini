import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { form, FormGroup, Radio, Button } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';
import pickBy from 'lodash/pickBy';
import findKey from 'lodash/findKey';
import isEmpty from 'lodash/isEmpty';

import ChamberFormGroup from './chamber_options_form.react';
import Directions from './directions.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
import Pause from './pause.react';
import PopUp from './popup.react';
import { getGrowingPlants, getChamberData, getClimateData } from '../utils/api_calls';

class ExistingGrow extends Component {
  state = {
    chamberOptions: [],
    selectedPlant:'',
    selectedChamber:'',
    plantTypes: [],
    climates: [],
    growingPlant: [],
    growingPlants: [],
    showBalance: false,
    showPause: false,
    showInitialPopup: false,
    showChambers: true,
    // showButton: false,
    isBalanced: false,
  }

  componentDidMount() {
    console.log('component did mount existing grow');
    this.getGrowingPlants();
    this.getChamberOptions();
    this.getClimates();
  }

  shouldComponentUpdate (newState) {
    console.log('shouldComponentUpdate existing grow');
    return this.state.chamberOptions !== newState.chamberOptions || this.state.selectedChamber !== newState.selectedChamber || this.state.showPause !== newState.showPause || this.state.showBalance !== newState.showBalance || this.state.showInitialPopup !== newState.showInitialPopup || this.state.growingPlant !== newState.growingPlant || this.state.isBalanced !== newState.isBalanced
  }

  componentDidUpdate() {
    console.log('componentDidUpdate existing grow');
    // if (this.state.selectedPlant !== "" && this.state.directions.length === 0) {
      // this.updateSettings();
      // this.updateDirections();
    // }
  }
  getGrowingPlants = () => {
    console.log('get plant recipes');

    getGrowingPlants().then((plantRecipes) => {
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


  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio: ${e.target.labels[0].innerText}`);
    // debugger
    this.setState({
      selectedChamber: e.target.labels[0].innerText
    })
      // console.log('handel form shoudl have chamber state');
      this.updateExistingPlant(e);
  }

  updateExistingPlant = (e) => {
    console.log('update existing plant existing grow');
    const target = e.target.labels[0].innerText;
    const tempPlant = parseInt(target.charAt((target.length -1)));

    const currentPlantType = pickBy(this.state.plantTypes, (plant) => plant.g_id === tempPlant );
    debugger
    this.setState({ growingPlant: currentPlantType });
  }

  updatePhBalance = () => {
    console.log('update ph balance existing plant');
  //   setTimeout(200000);
  //   console.log('timeout 20000');
  //   console.log(e);
    this.setState({ isBalanced: true });
  }

  // updateFormWithChamberData = () => {
  //   console.log('update form with chamber data');
  //   if (this.state.selectedChamber !== "" && this.state.selectedPlant === "") {
  //     console.log('update plant');
  //     this.updatePlantSelection();
  //   }
  //   if (this.state.selectedPlant !== "") {
  //     this.updateSettings();
  //     this.updateDirections();
  //   }
  // }
  //
  // updatePlantSelection = () => {
  //   console.log('update Plant selection');
  //   const tempFilledChambers = this.state.chamberOptions;
  //   const currentChamber = this.state.selectedChamber;
  //   const selectedPlantData = pickBy(tempFilledChambers, (plant) => plant.chamber_id === currentChamber.toString() );
  //   const key = findKey(selectedPlantData);
  //   this.setState({
  //     selectedPlant: selectedPlantData[key].name,
  //     selectedClimateId: selectedPlantData[key].climate_id
  //   })
  // }
  //
  handleNewPlantSelection = (e) => {
    console.log('handleNewPlantSelection new grow');
    const tempPlant = e.target.labels[0].innerText;
    const currentPlantType = pickBy(this.state.plantTypes, (plant) => plant.shortname === tempPlant );
    this.setState({ newGrowPlant: currentPlantType });
  }

  handleBalanceClick = (e) => {
    console.log('handle balance Click existingGrow');
    console.log(e);
    this.setState({
      showBalance: true,
      showInitialPopup: false,
      showButton: false,
      showChambers: false });
  }

  handlePauseClick = () => {
    console.log('handle pause Click existingGrow');
    this.setState({
      showPause: true,
      showButton: false,
      showInitialPopup: false,
      showChambers: false });
  }
  //
  // updateSettings = () => {
  //   console.log('update settings existing grow');
  //   // update state.settings with plantTypes info
  //   const { plantTypes, climates } = this.props;
  //
  //   const chamber = this.state.selectedChamber;
  //   const currentPlantState = upperFirst(this.state.selectedPlant);
  //   const currentClimateId = this.state.selectedClimateId;
  //   const currentPlantType = pickBy(plantTypes, (plant) => plant.name === currentPlantState );
  //   const currentClimate = pickBy(climates, (climate) => climate.id === currentClimateId )
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
  //
  // }
  //
  // updateDirections = () => {
  //   console.log('update directions existing grow');
  //   const { plantTypes } = this.props;
  //   const currentPlantState = upperFirst(this.state.selectedPlant);
  //   const currentPlantType = pickBy(plantTypes, (plant) => plant.name === currentPlantState );
  //   const tempDirections = [];
  //   const key = findKey(currentPlantType);
  //
  //   tempDirections.push(currentPlantType[key].grow_directions);
  //   tempDirections.push("This may take about 5 minutes...");
  //   tempDirections.push(currentPlantType[key].planting_directions);
  //   this.setState({ directions: tempDirections });
  // }
  //
  // handleChamberRadioClick = (e) => {
  //   console.log(`handleChamberRadio existingGrow: ${e.nativeEvent.which}`);
  //   this.setState({
  //     selectedChamber: e.nativeEvent.which,
  //     showButton: true
  //    }, () => {
  //     this.updateFormWithChamberData();
  //   });
  // }
  //
  // showGrowDirections = () => {
  //   console.log('show grow directions existing grow');
  //   this.setState({ showGrowDirections: true, showBalance: false });
  // }
  //
  // submitGrowChange = () => {
  //   console.log('submit grow changes');
  // }

  render() {
    console.log('render existing grow');

    return (
      <div className="existingGrow container">

        {/* chamber selection */}
        { (isEmpty(this.state.growingPlant)) && (
          <div className="chamberOptions">
            <div className="chamberImage">
              <ChamberFormGroup
                options={this.state.chamberOptions}
                onClick={this.handleChamberRadioClick}
              />
            </div>
            <h3 id="chamber" className="directions Futura-Lig">Select A Chamber</h3>
            // <a href='/directions' className="btn btn-default">Submit
            </a>
          </div>
        )}
        { (!isEmpty(this.state.growingPlant)) && (
          <PopUp
            modalTitle="Select Your Next Step"
            modalBody={(
              <div><h4>Pause</h4>
              <p>Pause your grow system to clean or change the water.</p>
              <Button
                className="pause" onClick={this.handlePauseClick}>Pause</Button>
              <h4>pH Balance</h4>
              <p>Balance the pH in your system.</p>
              <Button
                className="balanced"
                onClick={this.handleBalanceClick}>Balance</Button>
              </div>
            )}
            buttonText1="Submit Chamber"
            buttonText2="Close"
            displayModal={this.state.showInitialPopup}
            // handleClicke={this.handlePopupClick}
          />
        )}
        { (this.state.showPause === true)
          ?
          <Pause
            showPause={this.state.showPause} />
          :
          null
        }
        { (this.state.showBalance === true)
          ?
          <Directions
          newGrowPlant={this.state.newGrowPlant}
          climates={this.state.climates}
          handleClick={this.updatePhBalance}
          isBalanced={this.state.isBalanced}
          selectedChamber={this.state.selectedChamber}
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

export default ExistingGrow;
