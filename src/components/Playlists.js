import React, { Component } from 'react';
import '../App.css';
import '../styles/Playlists.css';
import { domain } from '../Environment';
import { Container } from 'react-bootstrap';

let spotify = require('spotify-web-api-js');
let spotifyApi = new spotify();

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = { playlist: [], name: '', loadPlaylist: props.loadPlaylist, artists: '' };
        this.callLoad = this.callLoad.bind(this);
    }

    componentDidMount() {
        this.setState({ playlist: this.props.playlist, name: this.props.name });
    }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.playlist.length > 0 && nextProps.playlist.length !== prevState.playlist.length) {
            let numArtists = this.state.playlist.length < 5 ? this.state.playlist.length : 5;
            let artists = '';
            spotifyApi.getTracks(this.state.playlist.slice(0, numArtists)).then((data) => {
                for (let i = 0; i < numArtists; i++) {
                    artists = artists.concat(data.tracks[i].album.artists[0].name);
                    if (i < numArtists - 1) {
                        artists = artists.concat(', ');
                    }
                }
                this.setState({ artists: artists });
            });
        }
    }

    callLoad() {
        this.state.loadPlaylist(this.state.playlist);
        this.props.closeModal();
    }

    render() {
        return (
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.artists}</td>
                <td type='button' className='btn btn-secondary'>
                    <button className='btn btn-primary purple-btn' onClick={this.callLoad}>
                        Load Playlist
                    </button>
                </td>
            </tr>
        );
    }
}

class Playlists extends Component {
    constructor(props) {
        super(props);
        console.log(props.loadPlaylist);
        this.state = { playlists: [], loadPlaylist: props.loadPlaylist };
    }

    componentDidMount() {
        let token = window.localStorage.getItem('token');
        let playlists = [];
        spotifyApi.setAccessToken(token);
        spotifyApi.getMe().then((data) => {
            fetch(domain + 'db/playlists/' + data.id)
                .then((res) => res.text())
                .then((text) => {
                    let response = JSON.parse(text);
                    console.log(response);
                    for (let playlistIndex in response) {
                        console.log('responseList', playlistIndex);
                        let playlist = response[playlistIndex].playlist;
                        let name = response[playlistIndex].name;
                        playlists.push({
                            playlist: playlist.shared.concat(playlist.rest),
                            name: name,
                        });
                    }

                    this.setState({ playlists: playlists });
                });
        });
    }

    componentDidUpdate() {}

    render() {
        let i = 0;
        let listPlaylists = this.state.playlists.map((playlist) => <Playlist key={i++} name={playlist.name} playlist={playlist.playlist} loadPlaylist={this.props.loadPlaylist} closeModal={this.props.handleClose} />);
        return (
            <>
                <Container className='playlists-container'>
                    <table style={{ color: 'white' }} className='table'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Artists</th>
                                <th></th>
                            </tr>
                            {listPlaylists}
                        </tbody>
                    </table>
                </Container>
            </>
        );
    }
}

export default Playlists;
