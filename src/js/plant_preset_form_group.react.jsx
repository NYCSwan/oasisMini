import React from 'react';
import PropTypes from 'prop-types';

import FormGrouping from './form_group.react';

// const plantOptions = (props) => (
//   props.plantTypes.map(plant => { // eslint-disable-line
//     return (
//       <Radio name="radioGroup1" key={plant} className={plant} onChange={props.handlePlantRadio} inline>
//       { upperFirst(plant) }
//       </Radio>
//     )
//   })
// )
//
// const presetOptions = (props) => (
//   props.presetOptions.map(setting => { // eslint-disable-line
//     return (
//       <Radio name='radioGroup2' key={setting} className={`${setting} link`} onChange={props.handlePresetRadio} inline>
//       { upperFirst(setting)}
//       </Radio>
//     )
//   })
// )

const PlantPresetFormGroup = (props) => (
  <div>
    <FormGrouping options={props.plantTypes} onChange={props.handleChange} />
    <div className="text Futura-Lig center">
      <h3>Select A Plant</h3>
      <h3>&</h3>
      <h3>Choose A Preset</h3>
    </div>
    <FormGrouping options={props.presetOptions} onChange={props.handleChange} />
  </div>
)


PlantPresetFormGroup.propTypes = {
  plantTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  presetOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired
}

export default PlantPresetFormGroup;
