import React from 'react';
import { Button } from 'react-bootstrap';

import SiteHeader from './Header.react';

const Homepage = () => (
  <div>
    <SiteHeader />
    <div className="links">
      <Button bsStyle="primary" href="/NewGrow">
        New Grow
      </Button>
      <Button bsStyle="primary" href="/ExistingGrow">
        Existing Grow
      </Button>
      <Button bsStyle="primary" href="/Tutorials">
        Tutorials
      </Button>
    </div>
  </div>
);

export default Homepage;
