import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/Auth.css';
import uuid from 'uuid';

const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;

//TODO: Might have to show dialog to true/false to see what that does?
//https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
const params = new URLSearchParams({
    client_id: clientID, // Your client id
    response_type: 'code',
    redirect_uri: 'http://localhost:3000/create', // Your redirect uri
    state: uuid(),
    scope: 'streaming%20user-read-email%20user-modify-playback-state%20user-read-private%20user-read-playback-state%20user-read-currently-playing%20app-remote-control%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private%20user-library-modify%20user-library-read%20user-top-read%20user-read-recently-played',
});

let my_toke = 'null';

const OauthURL = `https://accounts.spotify.com/authorize?${params}`;

class Auth extends Component {
    componentDidMount() {
        // TODO: handle user errors here
        const params = new URLSearchParams(window.location.hash.replace('#', ''));

        const token = params.get('access_token');
        console.log(params.toString());

        if (token) {
            console.log('hi', params.toString());
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
