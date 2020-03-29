import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/Auth.css';
import uuid from 'uuid';

const params = new URLSearchParams({
    client_id: '1db68b4b02f148b39f419f3b942452ed', // Your client id
    redirect_uri: 'http://localhost:3000/create', // Your redirect uri
    scope: 'streaming%20user-read-email%20user-modify-playback-state%20user-read-private%20user-read-playback-state%20user-read-currently-playing%20app-remote-control%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private%20user-library-modify%20user-library-read%20user-top-read%20user-read-recently-played',
    response_type: 'token',
    state: uuid()
});

const OauthURL = `https://accounts.spotify.com/authorize?${params}`;

class Auth extends Component {
    componentDidMount() {
        // TODO: handle user errors here
        const params = new URLSearchParams(window.location.hash.replace('#', ''));

        const token = params.get('access_token');
        console.log(params.toString())

        if (token) {
            console.log("hi", params.toString())
            window.localStorage.setItem('token', token);

            window.location.pathname = '/';
        }
    }

    render() {
        return (
          <Button
              variant='primary'
              className='App-link white btn-lg'
              onClick={() => {
                  window.location.href = OauthURL;
              }}>
              <img
                  src='spotifylogo.jpg' //can't figure out how to access the image from public/favicon.ico... in same dir for right now.
                  width='50'
                  height='50'
                  alt='tuun logo'
              />
              Login with Spotify
          </Button>
        );
    }
}

export default Auth;
