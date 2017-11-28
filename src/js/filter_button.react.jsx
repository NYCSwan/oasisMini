import React from 'react';
import { PropTypes } from 'prop-types';
import { ButtonGroup, Button, Col, Row } from 'react-bootstrap';

const FilterButtonGroup = (props) => (
      <Row className="filter">
        <ButtonGroup justified
          type="radio"
          name="filterById"
          className="filterById"
          options={props.options}
          onChange={props.onChange}
        >
        { props.options.map(option => { // eslint-disable-line

          return ( // eslint-disable-line
          <Col className={`chamber${option}`}>
            <Button
              key={option.toString()}
              value={option}
              checked={props.chamberId === option}>Chamber {option}</Button>
          </Col>
        );
      })}
        </ButtonGroup>
      </Row>
    )

FilterButtonGroup.propTypes = {
  chamberId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired
}
export default FilterButtonGroup;
