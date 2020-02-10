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
    <div className="landing-page-container">
      <h1 className="App-header">
      Welcome to T<span style={{ color: "#6C2EB9" }}>u</span>un
      </h1>
      <Button
      variant="primary"
      className="App-link white btn-lg"
      onClick={() => {
        window.location.href = OauthURL
      }}>
      <img
      src="spotifylogo.jpg" //can't figure out how to access the image from public/favicon.ico... in same dir for right now.
      width="50"
      height="50"
      alt="tuun logo"
      />
      Login with Spotify
      </Button>
    </div>
    );
  }
}

export default Auth
