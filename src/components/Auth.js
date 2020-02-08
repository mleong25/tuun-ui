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
        onClick={event =>  window.location.href='https://www.w3schools.com/howto/howto_js_redirect_webpage.asp'}>
      </Button>
    </>
    );
  }
}

export default Auth