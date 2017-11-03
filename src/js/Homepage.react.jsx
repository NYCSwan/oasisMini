import React from 'react';
import Header from './Header.react';
import NewGrow from './new_grow.react';

const Homepage = () => (
  <div>
    <Header />
    <h1>Homepage</h1>
    {/* <Link to={NewGrow}>New Grow</Link> */}
    <a href={NewGrow}>NewGrow</a>
    <div>Existing Grow</div>
    <div>tutorials</div>
  </div>
);

export default Homepage;
