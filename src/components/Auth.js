import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/Auth.css';

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let client_id = '1f1e04e745e8438484dbe761eb804ca8'; // Your client id
let redirect_uri = 'http://localhost:8888/'; // Your redirect uri
let scope = 'user-read-private%20user-read-email';
let response_type = 'code';
let state = makeid(16);

var params = {
  parameter1: client_id,
  parameter2: redirect_uri,
  parameter3: scope,
  parameter4: response_type,
  parameter5: state 
};

var esc = encodeURIComponent;
var query = Object.keys(params)
  .map(k => esc(k) + '=' + esc(params[k]))
  .join('&');

let OauthURL = 
  'https://accounts.spotify.com/authorize?' + 
  response_type +
  client_id +
  scope +
  redirect_uri +
  state;

  console.log(OauthURL);

//   async function getTokenFromAPI() {
//     try {
//         var params = {
//             client_id: '1f1e04e745e8438484dbe761eb804ca8',
//             response_type: 'code',
//             redirect_uri: 'https://www.google.com'
//         };

//         var esc = encodeURIComponent;
//         var query = Object.keys(params)
//             .map(k => `${esc(k)}=${esc(params[k])}`)
//             .join('&');

//         fetch('https://accounts.spotify.com/authorize?', query).then(function (response) {
//             console.log('response, ' + JSON.stringify(response));
//             return response;
//         })
//     } catch(error) {
//         console.error(error);
//     }
// }

class Auth extends Component {
  render() {
    return(
    <div className="container">
      <div className="buttonContainer">
        <Button
          variant="primary"
          className="loginButt"
          onClick={event =>  }>
          Login
        </Button>
      </div>
    </div>
    );
  }
}

export default Auth