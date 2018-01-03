import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PagerBack from './pagerBack.react';

class SiteHeader extends Component {

  handleSelect = (event, eventKey) => {
    console.log(`selected ${eventKey}`);
  }

  render() {
    const { title, match } = this.props;
    return (
      <Navbar inverse collapseOnSelect fluid className="container-fluid">
        <Navbar.Header>
              <Navbar.Brand className={`brandLogo ${match.path}`} id="navbarbrand">
                <Link to="/" href="/" className="logo img-responsive center-block" />
                 <div className='backImage'>
                   <PagerBack
                     className="header"/>
                 </div>
              </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="bs-navbar-collapse">
          <Nav bsStyle="pills" pullRight onSelect={this.handleSelect}>
            <NavItem className="navItem" EventKey={3} href="/monitor">Monitor</NavItem>
            <NavItem className="navItem" eventKey={4} href="/controls">Controls</NavItem>
            <NavItem className="navItem" eventKey={1} href="#">My Account</NavItem>
            <NavItem className="navItem" eventKey={2} href="#">Support</NavItem>
          </Nav>
        </Navbar.Collapse>
        <h1 className="title Futura-Lig">{title}</h1>
      </Navbar>
    )
  }
};

SiteHeader.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
    path: PropTypes.string
  }).isRequired
}

export default SiteHeader;
