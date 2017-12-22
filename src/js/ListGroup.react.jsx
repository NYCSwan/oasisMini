import React from 'react';
import PropTypes from 'prop-types';

const ListGroupContainer = (props) => (
  <ul>
    { props.items.map(item => { // eslint-disable-line
       return <li className="Futura-Lig">{item}</li>
    })}
   </ul>
)

ListGroupContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ListGroupContainer;
