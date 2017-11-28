import React from 'react';
import { PropTypes } from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';

const FilterButtonGroup = (props) => (
        <ButtonGroup justified
          type="radio"
          name="filterById"
          className="filterById filter flex-row row"
          options={props.options}
          onChange={props.onChange}
          sm={12} md={12} lg={12}
        >
        { props.options.map(option => { // eslint-disable-line

          return ( // eslint-disable-line
            <Button
              key={option.toString()}
              value={option}
              className={`chamber-${option}`}
              checked={props.chamberId === option}
            >
                Chamber {option}
            </Button>
        );
      })}
        </ButtonGroup>
    )

FilterButtonGroup.propTypes = {
  chamberId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired
}
export default FilterButtonGroup;
