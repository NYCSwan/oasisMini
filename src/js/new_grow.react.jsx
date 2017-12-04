import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup, Radio } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';

import SiteHeader from './Header.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';

class NewGrow extends Component {
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
    selectedChamber: '',
    selectedPlant:'',
    selectedPreset:''
  }

  handlePlantRadio = (e) => {
    e.preventDefault();

    this.setState({ selectedPlant: e.target.nextSibling.data })
    console.log(`handlePlantRadio: ${e.target.nextSibling}`);
  }

  handlePresetRadio = (e) => {
    e.preventDefault();
    // debugger
    this.setState({ selectedPreset: e.target.nextSibling.data })
    console.log(`handlePresetRadio: ${e.target.nextSibling.data}`);
  }

  handleChamberRadio = (e) => {
    e.preventDefault();
    // debugger
    this.setState({ selectedChamber: e.target.nextSibling.data });
    console.log(`handleChamberRadio: ${e.target.nextSibling.data}`);
  }

  render() {
    const plantOptions = this.state.plantTypes.map(plant => {
      return (
        <Radio name="radioGroup1" key={plant} className={plant} onChange={this.handlePlantRadio} inline>
          { upperFirst(plant) }
        </Radio>
      )
    });

    const presetOptions = this.state.presets.map(setting => {
      return (
        <Radio name='radioGroup2' key={setting} className={`${setting} link`} onChange={this.handlePresetRadio} inline>
          { upperFirst(setting)}
        </Radio>
      )
    });
    const chamberOptions = this.state.chamberOptions.map(chamber => {
      return (
        <Radio name='radioGroup3' key={chamber} className={`${chamber} link`} onChange={this.handleChamberRadio} inline-block>
          {chamber}
        </Radio>
      )
    });

    return (
      <div className="newGrow container">
        <SiteHeader title="New Grow" />
        <Form>
          <FormGroup>
            {plantOptions}
          </FormGroup>
          <div className="text Futura-Lig center">
            <h3>Select A Plant</h3>
            <h3>&</h3>
            <h3>Choose A Preset</h3>
          </div>
          <FormGroup>
            {presetOptions}
          </FormGroup>
          <div className={`${this.state.selectedPreset} controls`}>
            
          </div>
          <FormGroup>
            {chamberOptions}
          </FormGroup>
        </Form>

        <PagerBack />
        <PagerFwd />
      </div>
    )
  }
}

export default NewGrow;


// plant PropTypes
// chamber
// const yourPick = this.state.yourPick
    // const options = this.state.coffeeTypes.map((loan, key) => {
    //   const isCurrent = this.state.yourPick === loan
    //   return (
    //
    //     <div
    //       key={key}
    //       className="radioPad"
    //     >
    //       <div>
    //         <label
    //           className={
    //             isCurrent ?
    //               'radioPad__wrapper radioPad__wrapper--selected' :
    //               'radioPad__wrapper'
    //             }
    //         >
    //           <input
    //             className="radioPad__radio"
    //             type="radio"
    //             name="coffeeTypes"
    //             id={loan}
    //             value={loan}
    //             onChange={this.handleRadio.bind(this)}
    //           />
    //           {loan}
    //         </label>
    //       </div>
    //     </div>
    //   )
    // })
    // return (
    //   <div className="container text-center">
    //     <div className="row">
    //       <p className="lead">
    //         <strong>{yourPick}</strong>
    //         {yourPick ?
    //           ', nice pick!' : 'Tap away, friend.'
    //         }
    //       </p>
    //       <hr />
    //       {options}
    //     </div>
    //   </div>
    // )
