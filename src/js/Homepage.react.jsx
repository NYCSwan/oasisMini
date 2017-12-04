import React from 'react';
import { Button } from 'react-bootstrap';

import SiteHeader from './Header.react';

const Homepage = () => (
  <div>
    <SiteHeader title="Homepage"/>
    <div className="homepage links container">
      <Button bsStyle="primary" className="homepage link Futura-Lig" href="/NewGrow">
        New Grow
      </Button>
      <Button bsStyle="primary" className="homepage link Futura-Lig" href="/ExistingGrow">
        Existing Grow
      </Button>
      <Button bsStyle="primary" className="homepage link Futura-Lig" href="/Tutorials">
        Tutorials
      </Button>
    </div>
  </div>
);

export default Homepage;
