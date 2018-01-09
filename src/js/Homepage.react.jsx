import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Homepage = (props) => (
      <div>
        {props.auth.isAuthenticated() && (
          <div>
            <p> Notifications would appear here. </p>
            <div className="monitorOrGrow container">
              <Button
                bsStyle="primary"
                className="homepage link Futura-Lig"
                href="/monitor">
                Monitor Your Garden
              </Button>
              <Button
                bsStyle="primary"
                className="homepage link Futura-Lig" href="/controls">
                Grow Something
              </Button>
            </div>
          </div>
        )}
      </div>
    )

Homepage.propTypes = {
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func,
      auth0: PropTypes.object
    }).isRequired
}

export default Homepage;
