import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PagerBack from './pagerBack.react';

class SiteHeader extends Component {

  handleSelect = (event, eventKey) => {
    event.preventDefault();
    console.log(`selected ${eventKey}`);
  }

  render() {
    const headerTitle = this.props.title;

    return (
      <Navbar inverse collapseOnSelect fluid className="container-fluid">
        <Navbar.Header>
              <Navbar.Brand className="brandLogo" id="navbarbrand">
                <Link to="/" href="/" className="logo img-responsive center-block" />
                <PagerBack />
              </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="bs-navbar-collapse">
          <Nav bsStyle="pills" pullRight onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="#"><img src="../public/img/My_Account_Button.png" className="headerLinks img-responsive" alt="My Account" /></NavItem>
            <NavItem eventKey={2} href="#"><img src="../public/img/Support_button.png" className="headerLinks img-responsive" alt="Support" /></NavItem>
          </Nav>
        </Navbar.Collapse>
        <h1 className="title Futura-Lig">{headerTitle}</h1>
      </Navbar>
    )
  }
};

SiteHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default SiteHeader;
