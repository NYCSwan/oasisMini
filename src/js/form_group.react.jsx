import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Radio } from 'react-bootstrap';
import upperFirst from 'lodash/upperFirst';

class FormGrouping extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  }

  componentWillReceiveProps({onClick}) {
    console.log('componentWillReceiveProps form group');
    if (onClick !== this.props.onClick) {
      this.handleClick();
    }
  }

  handleClick = (e) => {
    console.log('handle click form group');
    this.props.onClick(e);
  }

  render() {
    console.log('render form_group');
    // debugger
    const radioBtns = this.props.options.map(value => {  // eslint-disable-line
       return <Radio
         name={`radioGroup${this.props.id}`}
         key={value}
         className={`link ${value}`}
         onChange={this.handleClick}
         >
         { upperFirst(value) }
       </Radio>
     })

    return (
      <FormGroup>
       { radioBtns }
      </FormGroup>
    )
  }
}

export default FormGrouping;
