import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SiteHeader = ( props ) => (
  <div>
    <Navbar inverse className="fixed-top">
      <Navbar.Header>
        <Navbar.Brand>
          <NavItem href="/">
            <img src="./public/img/logo.png" className="logo img-responsive center-block" alt="logo" />
          </NavItem>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
    <h1>{props.title}</h1>
    <Nav bsStyle="tabs" activeKey={1} className="header" >
      <NavItem eventKey={1} width={64} height={64} href="#">
        <img
          src="./public/img/Support_Button.png"
          className="img-responsive responsive"
          alt="support for your garden"
        />
      </NavItem>
      <NavItem eventKey={2} width={64} height={64} href="#">
        <img
          src="./public/img/My_Account_Button.png"
          className="img-responsive responsive"
          alt="my account information"
        />
      </NavItem>
    </Nav>
  </div>
);

SiteHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default SiteHeader;
