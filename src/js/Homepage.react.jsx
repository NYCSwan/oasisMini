import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from './Header.react';
import NewGrow from './new_grow.react';
import ExistingGrow from './existing_grow.react';
import Tutorials from './tutorials.react';


const Homepage = () => (
  <div>
    <SiteHeader />
    <div className="links">
      <Link to='/NewGrow'>New Grow</Link>
      <Link to='/ExistingGrow'>Existing Grow</Link>
      <Link to='/Tutorials'>Tutorials</Link>
    </div>
  </div>
);

export default Homepage;
