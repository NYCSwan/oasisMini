import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const GrowContainer = (props) => (
<div className="grow links container">
  <Button bsStyle="primary" bsSize="large" className="homepage link Futura-Lig" href={`${props.match.path}/NewGrow`}>
    New Grow
  </Button>
  <Button bsStyle="primary" bsSize="large" className="homepage link Futura-Lig" href={`${props.match.path}/ExistingGrow`}>
    Existing Grow
  </Button>
  <Button bsStyle="primary" bsSize="large" className="homepage link Futura-Lig" href="/Tutorials">
    Tutorials
  </Button>
</div>
)

GrowContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string}).isRequired
  }

export default GrowContainer;
