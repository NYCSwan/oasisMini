import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class FilterButtonGroup extends Component {
  handleSelect = (value) => {
    console.log(value);
  }
  render() {
    return (
      <div className="filter">
        <ToggleButtonGroup justified
          type="radio"
          name="filterById"
          value={this.props.chamberId}
          onChange={this.handleSelect}>
          <ToggleButton value={1}>Chamber 1</ToggleButton>
          <ToggleButton value={2}>Chamber 2</ToggleButton>
          <ToggleButton value={3}>Chamber 3</ToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  }
}
FilterButtonGroup.propTypes = {
  chamberId: PropTypes.string.isRequired
}
export default FilterButtonGroup;
