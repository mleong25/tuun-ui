import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Menu.css';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
//import MenuIcon from "@material-ui/icons/Menu";

class Menu extends Component {
  render() {
    return (
      <>
        <div className='Menu'>
          <Navbar fixed='top' bg='dark' expand='lg'>
            <Navbar.Brand className='brand' href='/'>
              <img
                src='ToffWhite.jpg' //can't figure out how to access the image from public/favicon.ico... in same dir for right now.
                width='60'
                height='60'
                alt='tuun logo'
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='/' className='NavTab'>
                  Home
                </Nav.Link>
                <Nav.Link href='/playlists' className='NavTab'>
                  Playlists
                </Nav.Link>
                <NavDropdown.Divider />
                <Nav.Item>
                  <Nav.Link className='NavTab' href='/webPlayer'>
                    WebPlayer
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}

export default Menu;
