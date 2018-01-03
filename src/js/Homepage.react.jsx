import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import SiteHeader from './Header.react';

const Homepage = (props) => (

  <div>
    <SiteHeader title="Homepage" match={props.match} />

      <div>
        <p> Notifications would appear here. </p>
        <div
        className="monitorOrGrow container"
        >
          <Button
            bsStyle="primary"
            className="homepage link Futura-Lig"
            href="/monitor">
          Monitor Your Garden
          </Button>
          <Button
            bsStyle="primary"
            className="homepage link Futura-Lig" href="/monitor"
          >
          Grow Something
          </Button>
        </div>
      </div>
  </div>
)

Homepage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
}

export default Homepage;
