import React, { Component } from 'react';
import '../App.css';
import '../styles/Playlists.css';
import { domain } from '../Environment';
import { Container, Row } from 'react-bootstrap'

let spotify = require('spotify-web-api-js');
let spotifyApi = new spotify();

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = { playlist: [], name: "" };
  }

  componentDidMount() {
    this.setState({ playlist: this.props.playlist, name: this.props.name });
  }

  renderList(idList) {
    let count = 0;
    return (
      idList.map(id => <p className="font-smaller">{++count + '. ' + id.toString()}</p>)
    );
  }

  render() {
    return (
      <div className="playlist-container col-sm rounded">
        <h3>{this.state.name}</h3>
        {this.renderList(this.state.playlist)}
      </div>
    );
  }
}

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = { playlists: [] };
  }

  componentDidMount() {
    let token = window.localStorage.getItem('token');
    let playlists = [];
    spotifyApi.setAccessToken(token);
    spotifyApi.getMe().then(data => {
      fetch(domain + 'db/playlists/' + data.id)
        .then(res => res.text())
        .then(text => {
          let response = JSON.parse(text);
          console.log(response);
          for (let playlistIndex in response) {
            console.log("responseList", playlistIndex)
            let playlist = response[playlistIndex].playlist;
            let name = response[playlistIndex].name;
            playlists.push({
              playlist: playlist.shared.concat(playlist.rest),
              name: name
            });
          }

          this.setState({ playlists: playlists });
        });
    });
  }

  componentDidUpdate() { }

  render() {
    let i = 0;
    let listPlaylists = this.state.playlists.map(playlist => <Playlist key={i++} name={playlist.name} playlist={playlist.playlist} />);
    return (
      <>
        <Container className='playlists-container'>
          <h1 className='bold mb-5'>Your Playlists</h1>
          <Row>
            <ul>{listPlaylists}</ul>
          </Row>
        </Container>
      </>
    );
  }
}

export default Playlists;
