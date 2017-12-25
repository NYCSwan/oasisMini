import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { form, FormGroup, Radio, Button } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';
import pickBy from 'lodash/pickBy';
import findKey from 'lodash/findKey';

import SiteHeader from './Header.react';
import Directions from './directions.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
import Pause from './pause.react';
import PopUp from './popup.react';

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
    directions: [],
    showBalance: false,
    showPause: false,
    showInitialPopup: false,
    showChambers: true,
    showButton: false,
    isBalanced: false,
  }

  componentDidMount() {
    console.log('component did mount existing grow');
    // this.setChambers()
  }

  shouldComponentUpdate (newState) {
    console.log('shouldComponentUpdate existing grow');
    return this.state.filledChambers !== newState.filledChambers || this.state.selectedClimateId !== newState.selectedClimateId || this.state.showPause !== newState.showPause || this.state.showBalance !== newState.showBalance || this.state.showInitialPopup !== newState.showInitialPopup || this.state.showChambers !== newState.showChambers || this.state.showGrowDirections !== newState.showGrowDirections
  }

  componentDidUpdate() {
    console.log('componentDidUpdate existing grow');
    if (this.state.selectedPlant !== "" && this.state.directions.length === 0) {
      this.updateSettings();
      this.updateDirections();
    }
  }

  updatePhBalance = (e) => {
    console.log('timeout 0');
    setTimeout(200000);
    console.log('timeout 20000');
    console.log(e);
    this.setState({ isBalanced: true });
  }

  updateFormWithChamberData = () => {
    console.log('update form with chamber data');
    if (this.state.selectedChamber !== "" && this.state.selectedPlant === "") {
      console.log('update plant');
      this.updatePlantSelection();
    }
    if (this.state.selectedPlant !== "") {
      this.updateSettings();
      this.updateDirections();
    }
  }

  updatePlantSelection = () => {
    console.log('update Plant selection');
    const tempFilledChambers = this.state.filledChambers;
    const currentChamber = this.state.selectedChamber;
    const selectedPlantData = pickBy(tempFilledChambers, (plant) => plant.chamber_id === currentChamber.toString() );
    const key = findKey(selectedPlantData);
    this.setState({
      selectedPlant: selectedPlantData[key].name,
      selectedClimateId: selectedPlantData[key].climate_id
    })
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

  updateSettings = () => {
    console.log('update settings existing grow');
    // update state.settings with plantTypes info
    const { plantTypes, climates } = this.props;

    const chamber = this.state.selectedChamber;
    const currentPlantState = upperFirst(this.state.selectedPlant);
    const currentClimateId = this.state.selectedClimateId;
    const currentPlantType = pickBy(plantTypes, (plant) => plant.name === currentPlantState );
    const currentClimate = pickBy(climates, (climate) => climate.id === currentClimateId )
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
    tempDirections.push(currentPlantType[key].planting_directions);
    this.setState({ directions: tempDirections });
  }

  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio existingGrow: ${e.nativeEvent.which}`);
    this.setState({
      selectedChamber: e.nativeEvent.which,
      showButton: true
     }, () => {
      this.updateFormWithChamberData();
    });
  }

  showGrowDirections = () => {
    console.log('show grow directions existing grow');
    this.setState({ showGrowDirections: true, showBalance: false });
  }

  submitGrowChange = () => {
    console.log('submit grow changes');
  }

  render() {
    console.log('render existing grow');

    return (
      <div className="existingGrow container">
        <SiteHeader title="Existing Gardens" />

        {/* chamber selection */}
        { (this.state.showChambers === true)
          ?
          <div className="existing-grow chambers">
          <form className='existing_grow_form'>
              <FormGroup
                label="garden">
              {this.props.currentGrows.map(plant => { // eslint-disable-line
                return <Radio
                  name={`radioGroup${plant.id}`}
                  className={`Chamber${plant.chamber_id}`}
                  key={plant.id}
                  onChange={this.handleChamberRadioClick}>
                  {`Chamber${plant.chamber_id}`}
                </Radio>
              })}
              </FormGroup>
              </form>
              <h3 id="chamber" className="chamber Futura-Lig">Select A Chamber</h3>
            </div>
        :
          null
        }
        { (this.state.showButton === true)
          ?
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
            buttonText1="187 Submit Chamber"
            buttonText2="Close"
            displayModal={this.state.showInitialPopup}
            // handleClicke={this.handlePopupClick}
          />
        :
          null
        }
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
            settings={this.state.settings}
            directions={this.state.directions}
            isBalanced={this.state.isBalanced}
            plant={this.state.selectedPlant}
            handleClick={this.updatePhBalance}
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
