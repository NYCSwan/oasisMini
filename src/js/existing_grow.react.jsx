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
    showInitialPopup: false
  }

  componentDidMount() {
    console.log('component did mount existing grow');
    // this.setChambers()
  }

  shouldComponentUpdate (newProps, newState) {
    console.log('shouldComponentUpdate existing grow');
    return this.state.filledChambers !== newState.filledChambers || this.state.selectedClimateId !== newState.selectedClimateId || this.state.showPause !== newState.showPause || this.state.showBalance !== newState.showBalance || this.state.showInitialPopup !== newState.showInitialPopup
  }

  componentDidUpdate() {
    console.log('componentDidUpdate existing grow');
    // this.updateFormWithChamberData();
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
    this.setState({
      selectedPlant: selectedPlantData[key].name,
      selectedClimateId: selectedPlantData[key].climate_id
    })
  }

  handlePopupToggle = () => {
    console.log('handle popup Click existingGrow');
    this.setState({ showInitialPopup: true }, () => console.log(this.state.showInitialPopup));
  }

  handleBalanceClick = (e) => {
    console.log('handle balance Click existingGrow');
    console.log(e);
    this.setState({ showBalance: true });
  }

  handlePauseClick = () => {
    console.log('handle pause Click existingGrow');
    this.setState({ showPause: !this.state.showPause });
  }

  // updateClimateId = () => {
  //   console.log('update climate id existing grow');
  //   // const tempFilledChambers
  // }

  // updateClimateSelection = () => {
  // // //
  //   console.log('handleClimateSelection existing grow');
  //   const { filledChambers } = this.props;
  //
  //   const climate = pickBy(filledChambers, (chamber) => chamber.name)
  //   const key = (climate);
    // if (value) {
    //   const tempPlant = value.target.labels[0].innerText;
    //   const idx = findIndex(plantTypes, (plant) => plant.name === tempPlant);
    //   const currentPlantType = pickBy(plantTypes, (plant) => plant.name === tempPlant );
    //   this.setState({ selectedClimateId: currentPlantType[idx].climate_id}, () => { console.log(this.state.selectedClimateId) });
    // } else {
    //   const tempPlant = this.state.selectedPlant;
    //   const idx = findIndex(plantTypes, (plant) => plant.name === tempPlant);
    //   const currentPlantType = pickBy(plantTypes, (plant) => plant.name === tempPlant );
    //   console.log(`else setstate: ${currentPlantType[idx].climate_id}`);
    //
    //   this.setState({ selectedClimateId: currentPlantType[idx].climate_id});
    // }
  // }

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
    this.setState({ directions: tempDirections });
  }

  handleChamberRadioClick = (e) => {
    console.log(`handleChamberRadio existingGrow: ${e.nativeEvent.which}`);
    this.setState({ selectedChamber: e.nativeEvent.which }, () => {
      this.handlePopupToggle();
      this.updateFormWithChamberData();
    });
  }

  render() {
    console.log('render existing grow');

    return (
      <div className="existingGrow container">
        <SiteHeader title="Existing Gardens" />

        <form className='existing_grow_form'>
        {/* chamber selection */}
          <div className="existing-grow chambers">
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
              <h3 id="chamber" className="chamber Futura-Lig">Select A Chamber</h3>
          </div>
        </form>
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
            plant={this.state.selectedPlant}
            directions={this.state.directions}
            handleClick={this.updatePhBalance}
          />
          :
          null
        }
        <PagerBack />
        <PagerFwd />
      </div>
    )
  }
}

export default ExistingGrow;
