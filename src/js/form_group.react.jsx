import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Radio } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';

const FormGrouping = (props) => (
  <FormGroup>
   { props.options.map(value => {  // eslint-disable-line
      <Radio
        name='radioGroup'
        key={value}
        className={`${value} link`}
        onChange={props.handleChange}
        inline>
        { upperFirst(value)}
      </Radio>
    })};
  </FormGroup>
)

FormGrouping.propTypes = {
  options: PropTypes.arrayOf(PropTypes.sttring).isRequired,
  handleChange: PropTypes.func.isRequired
}
export default FormGrouping;
