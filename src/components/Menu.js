import React, { Component } from 'react';
import '../styles/Menu.css';
import { Navbar, Nav,  } from 'react-bootstrap';
//import MenuIcon from "@material-ui/icons/Menu";

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <Navbar fixed="top" bg="dark" variant="dark">
          <Navbar.Brand className="brand" href="/">
            <img
              src="favicon.ico" //can't figure out how to access the image from public/favicon.ico... in same dir for right now.
              width="25"
              height="25"
              alt="tuun logo"
            />
            &nbsp;&nbsp;
            Tuun
          </Navbar.Brand>
          <Nav className="justify-content-center navs" fill>
            <Nav.Item><Nav.Link href="/create">Create</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/playlists">Playlists</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/connect">Connect</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link className="login" href="/login">Login</Nav.Link></Nav.Item> 
              {/*broken href... cant shift login over to right in menu.css */}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Menu