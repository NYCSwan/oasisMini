import React from 'react';
import { Navbar, Nav, NavItem, Link, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const SiteHeader = () => (
 <div> 
   <Navbar inverse staticTop className="fixed-top">
    <Navbar.Header >
      <Navbar.Brand>
        <LinkContainer to="/home">
          <img src='./public/img/logo.png' className='logo' responsive className="img-responsive center-block" alt="logo" />
        </LinkContainer>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar>
      <Nav pullRight
        bsStyle="tabs"
        activeKey="1"
        className="header">
        <LinkContainer to="#">
          <NavItem eventKey='1'width={64} height={64} className="img-responsive">
            <Image src='./public/img/Support_Button.png' responsive className="img-responsive" />
          </NavItem>
        </LinkContainer>
        <LinkContainer to="#">
          <NavItem eventKey='2' width={64} height={64}>
            <Image src='./public/img/My_Account_Button.png' responsive className="img-responsive" />
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  </Navbar>
  </div>
);

export default SiteHeader;
