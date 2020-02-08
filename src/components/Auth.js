import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/Auth.css';
import uuid from 'uuid'

const params = new URLSearchParams({
  client_id: '1db68b4b02f148b39f419f3b942452ed', // Your client id
  redirect_uri: 'http://localhost:3000/create', // Your redirect uri
  scope: 'user-read-private%20user-read-email',
  response_type: 'token',
  state: uuid()
});

const OauthURL = `https://accounts.spotify.com/authorize?${params}`;

class Auth extends Component {
  componentDidMount() {
    // TODO: handle user errors here
    const params = new URLSearchParams(window.location.hash.replace('#', ''))

    const token = params.get('access_token')

    if(token) {
      window.localStorage.setItem('token', token)

      window.location.pathname = '/'
    }
  }

  render() {
    return(
    <div className="container">
      <div className="buttonContainer">
        <Button
          variant="primary"
          className="loginButt"
          onClick={() => {
            window.location.href = OauthURL
          }}>
          Login
        </Button>
      </div>
    </div>
    );
  }
}

export default Auth
