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
              key={option.id}
              value={option.id}
              className={`chamber-${option.id}`}
              checked={props.chamberId === option.id}
              onClick={props.onChange}
              disabled={!option.filled}
            >
                Chamber {option.id}
            </Button>
        );
      })}
        </ButtonGroup>
    )

FilterButtonGroup.propTypes = {
  chamberId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  // filledChambers: PropTypes.arrayOf(PropTypes.object).isRequired

}
export default FilterButtonGroup;
