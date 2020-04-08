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

const OauthURL = `https://accounts.spotify.com/authorize?${params}`;

class Auth extends Component {
    componentDidMount() {
        // ~~that new new auth code type shit~~
        //QUERY RESPONSE GIVES BACK A CODE AND A STATE if user accepts login
        //CODE CAN BE EXCHANGED FOR A TOKEN
        // TODO: !! handle user errors here, verify state value is consistent (??)
        // const params = new URLSearchParams(window.location.hash.replace('#', '')); //this is fucked up?

        // TODO: testing out how to ensure we get a proper token everytime, i.e. not using an old expired one.


        if(window.location.search !== "") {
          //we have a response
          if(window.location.search[1] === "c"){
            //proper response, now parse
            const auth_code = window.location.search.split("=")[1].split("&")[0];
            console.log("auth code:", auth_code);
            //exchanging the auth_code for an access_token
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("grant_type", "authorization_code");
            urlencoded.append("code", auth_code);
            urlencoded.append("redirect_uri", "http://localhost:3000/create");
            urlencoded.append("client_id", clientID);
            urlencoded.append("client_secret", clientSecret);
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            };

            fetch("https://accounts.spotify.com/api/token", requestOptions)
              .then(response => response.text())
              .then(result => {
                let x = JSON.parse(result);
                console.log("Writing values to local storage... ");
                console.log(x.access_token, x.refresh_token);
                window.localStorage.setItem('token', x.access_token);
                window.localStorage.setItem('refresh_token', x.refresh_token);
              })
              .catch(error => console.log('error', error));
          }
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
