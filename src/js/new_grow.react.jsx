import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SiteHeader from './Header.react';
import PagerBack from './pagerBack.react';
import PagerFwd from './pagerFwd.react';
import FormContainer from './form_container.react';

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
    ]
  }

  render() {

    return (
      <div className="newGrow container">
        <SiteHeader title="New Grow" />
        <FormContainer
          plantTypes={this.state.plantTypes}
          presetOptions={this.state.presets}
          chamberOptions={this.state.chamberOptions}
          chamberData={this.props.chambers}
          presetData={this.props.presets}
          climates={this.props.climates}
        />

        <PagerBack />
        <PagerFwd />
      </div>
    )
  }
}

NewGrow.propTypes = {
  presets: PropTypes.arrayOf(PropTypes.object).isRequired,
  chambers: PropTypes.arrayOf(PropTypes.object).isRequired,
  climates: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default NewGrow;
