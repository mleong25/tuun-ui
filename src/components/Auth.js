import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/Auth.css';
import uuid from 'uuid';
// import { clientID, clientSecret } from '../Secrets';

const clientID = process.env.REACT_APP_clientID;
const clientSecret = process.env.REACT_APP_clientSecret;

const params = new URLSearchParams({
    client_id: clientID, // Your client id
    redirect_uri: 'http://localhost:3000/create', // Your redirect uri
    scope: 'streaming%20user-read-email%20user-modify-playback-state%20user-read-private%20user-read-playback-state%20user-read-currently-playing%20app-remote-control%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private%20user-library-modify%20user-library-read%20user-top-read%20user-read-recently-played',
    response_type: 'token',
    state: uuid(),
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
            <div className='align-center landing-page'>
                <Button
                    variant='primary'
                    className='white btn-lg login-spotify-btn'
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
            </div>
        );
    }
}

export default Auth;
