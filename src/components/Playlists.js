import React, { Component } from 'react';
import '../App.css';
import '../styles/Playlists.css';
import '../styles/Room.css';
import { domain } from '../Environment';

let spotify = require('spotify-web-api-js');
let spotifyApi = new spotify();

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = { playlist: [] };
    }

    componentDidMount() {
        this.setState({ playlist: this.props.playlist });
    }

    render() {
        return <div>{this.state.playlist.toString()}</div>;
    }
}

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = { playlists: [] };
    }

    componentDidMount() {
        let token = window.localStorage.getItem('token');
        spotifyApi.setAccessToken(token);
        spotifyApi.getMe().then(data => {
            fetch(domain + 'db/playlists/' + data.id)
                .then(res => res.text())
                .then(text => {
                    console.log(typeof text);
                    console.log(text);
                    console.log(Object.keys(JSON.parse(text)[0].playlist));
                    let jsonList = JSON.parse(text);
                    let playlists = [];
                    for (let obj of jsonList) {
                        let songs = [];
                        for (let key of Object.keys(obj.playlist)) {
                            songs.push(obj.playlist[key]);
                        }
                        playlists.push(songs);
                    }
                    console.log(playlists);
                    this.setState({ playlists: playlists });
                });
        });
    }

    componentDidUpdate() {}

    render() {
        let i = 0;
        let listPlaylists = this.state.playlists.map(playlist => <Playlist key={i++} playlist={playlist} />);
        return (
            <>
                <div className='room-container'>
                    <h1 className='bold'>Your Playlists</h1>
                    <ul>{listPlaylists}</ul>
                </div>
            </>
        );
    }
}

export default Playlists;
