import React from 'react';
import '../App.css';
import '../styles/WebPlayer.css';

let spotify = require('spotify-web-api-js');
let spotifyApi = new spotify();
// spotifyApi.setAccessToken('BQCTrTPt7Qz4oMPxhP3LPRpM2KhtAw-eY3R3wrGcsSpwbEh1yE_Zw-5h-AvdTZKzul2I3dsqRKT6C6uMw4vmCEgdqb6OMcs2aqcqdK8ueqi3jc1PUA33WK0Am3HZ8UkRNBhdVanc563YUfBXl6tzPqULZGCBSFUrJgeyfO3aTPbhRkPpcYcO1pBS0rWu5jGp0GBVoO6VM5bYBAPfboCYv2W1RBbHGZ9ssZ3eJLoqcccarTjRdH-criDTzeEWJ9gSEGVbQvADTao');

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
            <div>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary">
                  <Previous togglePlay={this.Play} />
                </button>
                <button type="button" class="btn btn-secondary">
                  <PlayPause ref={this.PlayPause} />
                </button>
                <button type="button" class="btn btn-secondary">
                  <Next togglePlay={this.Play} />
                </button>
              </div>
              <div>
                <Progress songLengthMS={this.state.songLengthMS} songCurrentMS={this.state.songCurrentMS} seek={this.Seek} stopInterval={this.StopInterval} visualSeek={this.VisualSeek} /><Volume />
                <CurrentSong songTitle={this.state.songTitle} songArtist={this.state.songArtist} songImageURL={this.state.songImageURL} />
             </div>
           </div>
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
              <img src={this.state.songImageURL} height={100} alt='Current Song'></img>
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
                    <button  class="btn btn-primary"onClick={this.playPause}> Pause</button>
                </div>
            );
        } else {
            return (
                <div>
                    <button  class="btn btn-primary" onClick={this.playPause}> Play</button>
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
                <button class="btn btn-primary" onClick={this.previous}> Back </button>
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
                <button class="btn btn-primary" onClick={this.next}> Next</button>
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
            <div class="webplayer-progressbar">
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
              <img
                src="logo192.png" //can't figure out how to access the image from public/favicon.ico... in same dir for right now.
                width="30"
                height="30"
                alt="tuun logo"
              />
              <input type='range' min='0' max='100' value={this.state.volume} onChange={this.setVolume} step='1' />
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
            <div class="webplayer-container">
              <table class="table table-dark webplayer-table">
                  <tbody>
                      <tr>
                          <th></th>
                          <th>TITLE</th>
                          <th>ARTIST</th>
                      </tr>
                      {Songs}
                  </tbody>
              </table>
            </div>
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
                    <img src={this.state.imageURL} height={30} alt='Album Cover'></img>
                </td>
                <td>{this.state.name}</td>
                <td>{this.state.artists}</td>
                <td>[~ song length ~]</td>
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
