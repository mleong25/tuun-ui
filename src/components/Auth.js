import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/Auth.css';

class Auth extends Component {
  render() {
    return(
    <>
      <Button
        variant="primary"
        className="loginButt"
        onClick={window.location.href("http://www.w3schools.com")}>
        checked="false"
      </Button>
    </>
    );
  }
}

export default Auth