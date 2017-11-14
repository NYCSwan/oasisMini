import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const SiteHeader = () => (
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

export default SiteHeader;
