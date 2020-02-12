import React from 'react';

let spotify = require('spotify-web-api-js');
let spotifyApi = new spotify();
// spotifyApi.setAccessToken('BQCcHMuvp15kNowRmaO9Kms9-9nWeX9ZFxEeZ1_BhbXRisx8jZFfYYwL9YAdO4ORERhAU5FLe93xy8NeUP8nKRekCBXt6rDcsQMcQbjn_rNJ8kueCOycS8aG3L7P_o6num8K-DQ-uahTePBBI2wDbtWaQ26CFu0OYejgTviPsY3vhRgEBwkftAEV1v3h7pkT7WXhYOwFni8BpvSXLUnrrrNsyyKPBgYXLUm1_1mEaAxpE1_W8dNuPYT5JaQKEglWS3XOKA');

let songIDs = ['1WnqWQcWcuQbVzgE7ecfCY', '39JRmdKFka1Oe09FoOCPI4', '2QpGZOhTCHHiKmpSO9FW4h', '3JWiDGQX2eTlFvKj3Yssj3', '2SasoXZyv82yYgHiVOvxQn', '24bnCCysWnbNRNUT4LpHcP', '454Epa1vrCGFddHXKyC1kb', '6xRWoYwfwIKnT8bQGzKbxR', '7r6aR2f57resC5r93LwMfK', '0oPOuDmmkVp3h6puekhs6P', '7sBgFMWqDWQgrsNSpIBoe8'];

class PlayerController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songID: '',
            songTitle: '',
            songArtist: '',
            songImageURL: '',
            songLengthMS: 100000,
            songCurrentMS: 0,
            interval: null,
            songIDs: props.songIDs
        };
        this.PlayPause = React.createRef();
        this.StartPlayer = this.StartPlayer.bind(this);
        this.StartInterval = this.StartInterval.bind(this);
        this.StopInterval = this.StopInterval.bind(this);
        this.VisualSeek = this.VisualSeek.bind(this);
        this.Update = this.Update.bind(this);
        this.Seek = this.Seek.bind(this);
        this.Play = this.Play.bind(this);
        this.StartPlayer();
        this.Update();
    }

    componentDidMount() {
        this.StartInterval();
        this.Play();
    }

    StartPlayer() {
        spotifyApi.setVolume(100);
        let uris = [];
        for (let songID of this.state.songIDs) {
            uris.push('spotify:track:' + songID);
        }
        spotifyApi.play({ uris: uris });
    }

    StartInterval() {
        let interval = setInterval(() => {
            this.Update();
        }, 500);
        this.setState({ interval: interval });
    }

    Update() {
        spotifyApi.getMyCurrentPlayingTrack().then(data => {
            let songID = data['item']['id'];
            let songTitle = data['item']['name'];
            let songArtist = '';
            for (let i = 0; i < data['item']['artists'].length; i++) {
                songArtist += data['item']['artists'][i]['name'] + ', ';
            }
            songArtist = songArtist.slice(0, songArtist.length - 2);
            let songImageURL = data['item']['album']['images'][0]['url'];
            let songLengthMS = data['item']['duration_ms'];
            let songCurrentMS = data['progress_ms'];
            this.setState({
                songID: songID,
                songTitle: songTitle,
                songArtist: songArtist,
                songImageURL: songImageURL,
                songLengthMS: songLengthMS,
                songCurrentMS: songCurrentMS
            });
        });
    }

    Seek(seekPos) {
        spotifyApi.seek(seekPos);
        this.StartInterval();
    }

    StopInterval() {
        clearInterval(this.state.interval);
    }

    VisualSeek(seekPos) {
        this.setState({ songCurrentMS: seekPos });
    }

    Play() {
        this.PlayPause.current.setState({ isPlaying: true });
    }

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Previous togglePlay={this.Play} />
                        </td>
                        <td>
                            <PlayPause ref={this.PlayPause} />
                        </td>
                        <td>
                            <Next togglePlay={this.Play} />
                        </td>
                        <td>
                            <Volume />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <CurrentSong songTitle={this.state.songTitle} songArtist={this.state.songArtist} songImageURL={this.state.songImageURL} />
                        </td>
                        <td>
                            <Progress songLengthMS={this.state.songLengthMS} songCurrentMS={this.state.songCurrentMS} seek={this.Seek} stopInterval={this.StopInterval} visualSeek={this.VisualSeek} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

class CurrentSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songTitle: '',
            songArtist: '',
            songImageURL: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps;
    }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.songImageURL !== prevState.songImageURL || nextProps.songTitle !== prevState.songTitle || nextProps.songArtist !== prevState.songArtist) {
            this.setState(nextProps);
        }
    }

    render() {
        return (
            <div>
                <img src={this.state.songImageURL} height={150} alt='Current Song'></img>
                <div>{this.state.songTitle}</div>
                <div>{this.state.songArtist}</div>
            </div>
        );
    }
}

class PlayPause extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        };
        this.playPause = this.playPause.bind(this);
    }

    playPause() {
        if (this.state.isPlaying) {
            spotifyApi.pause();
        } else {
            spotifyApi.play();
        }
        this.setState({
            isPlaying: !this.state.isPlaying
        });
    }

    render() {
        if (this.state.isPlaying) {
            return (
                <div>
                    <button onClick={this.playPause}> Pause</button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={this.playPause}> Play</button>
                </div>
            );
        }
    }
}

class Previous extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            togglePlay: props.togglePlay
        };
        this.previous = this.previous.bind(this);
    }

    previous() {
        spotifyApi.skipToPrevious();
        this.state.togglePlay();
    }

    render() {
        return (
            <div>
                <button onClick={this.previous}> Previous</button>
            </div>
        );
    }
}

class Next extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            togglePlay: props.togglePlay
        };
        this.next = this.next.bind(this);
    }

    next() {
        spotifyApi.skipToNext();
        this.state.togglePlay();
    }

    render() {
        return (
            <div>
                <button onClick={this.next}> Next</button>
            </div>
        );
    }
}

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songCurrentMS: 0,
            songLengthMS: 99999,
            seek: () => {},
            stopInterval: () => {},
            visualSeek: () => {}
        };
        this.seek = this.seek.bind(this);
        this.stopInterval = this.stopInterval.bind(this);
        this.visualSeek = this.visualSeek.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.songCurrentMS !== prevState.songCurrentMS || nextProps.songLengthMS !== prevState.songLengthMS) {
            return nextProps;
        } else return null;
    }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.songLengthMS !== prevState.songLengthMS || nextProps.songCurrentMS !== prevState.songCurrentMS) {
            this.setState(nextProps);
        }
    }

    seek(event) {
        this.props.seek(event.target.value);
    }

    stopInterval(event) {
        this.props.stopInterval();
    }

    visualSeek(event) {
        this.props.visualSeek(event.target.value);
    }

    convertMsToMMSS(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    render() {
        return (
            <div>
                {this.convertMsToMMSS(this.state.songCurrentMS)}
                <input type='range' min='0' max={this.state.songLengthMS} value={this.state.songCurrentMS} onTouchStart={this.stopInterval} onMouseDown={this.stopInterval} onTouchEnd={this.seek} onMouseUp={this.seek} onChange={this.visualSeek} step='1' />
                {this.convertMsToMMSS(this.state.songLengthMS)}
            </div>
        );
    }
}

class Volume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 100
        };
        this.setVolume = this.setVolume.bind(this);
    }

    setVolume(event) {
        this.setState({
            volume: event.target.value
        });
        spotifyApi.setVolume(this.state.volume, function(err, data) {
            if (err) console.error(err);
            else console.log(data);
        });
    }

    render() {
        return (
            <div>
                Volume <input type='range' min='0' max='100' value={this.state.volume} onChange={this.setVolume} step='1' />
            </div>
        );
    }
}

class SongQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: props.songs
        };
    }

    render() {
        let Songs = [];
        for (let i = 0; i < songIDs.length; i++) {
            Songs.push(<Song id={this.state.songs[i]} key={i} />);
        }
        return (
            <table>
                <tbody>
                    <tr>
                        <td>Album</td>
                        <td>Title</td>
                        <td>Artists</td>
                    </tr>
                    {Songs}
                </tbody>
            </table>
        );
    }
}

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: '',
            artists: '',
            imageURL: ''
        };
        this.GetTrackInfo();
    }

    GetTrackInfo() {
        spotifyApi.getTrack(this.props.id).then(data => {
            let artists = '';
            for (let i = 0; i < data['artists'].length; i++) {
                artists += data['artists'][i]['name'] + ', ';
            }
            artists = artists.slice(0, artists.length - 2);
            this.setState({
                name: data['name'],
                artists: artists,
                imageURL: data['album']['images'][0]['url']
            });
        });
    }

    render() {
        return (
            <tr>
                <td>
                    <img src={this.state.imageURL} height={50} alt='Album Cover'></img>
                </td>
                <td>{this.state.name}</td>
                <td>{this.state.artists}</td>
            </tr>
        );
    }
}

class WebPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevSong: null,
            currentSong: songIDs[0],
            nextSong: songIDs[1],
            player: window.player,
            songs: []
        };
        spotifyApi.setAccessToken(props.token);
    }

    render() {
        // fetch("https://localhost:44382/Tuun/Template")
        // .then(res => res.json())
        // .then(result => this.setState({ songs: result["playlist"] }));
        return (
            <div>
                <SongQueue songs={songIDs} />
                <PlayerController songIDs={songIDs} />
            </div>
        );
    }
}

export default WebPlayer;
