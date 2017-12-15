import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ListGroupContainer = (props) => (
  <ListGroup>
    { props.items.map(item => {
       return <ListGroupItem>{item}</ListGroupItem>
    })}
   </ListGroup>
);

ListGroupContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ListGroup;
