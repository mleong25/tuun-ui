import React, { Component } from 'react';
import '../styles/Menu.css';
import { Navbar, Nav,  } from 'react-bootstrap';
import MenuIcon from "@material-ui/icons/Menu";

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <Navbar fixed="top" bg="dark" variant="dark">
          <Navbar.Brand className="brand" href="/">
            Tuun <MenuIcon></MenuIcon>
          </Navbar.Brand>
          <Nav className="justify-content-center navs" fill>
            <Nav.Item><Nav.Link href="/create">Create</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/playlists">Playlists</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/connect">Connect</Nav.Link></Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Menu