import React, { Component } from 'react';
import '../App.css';
import { Button, Form } from 'react-bootstrap';
import { domain } from '../Environment';

class RoomCreate extends Component {
    constructor(props) {
        super();

        this.state = {
            username: props.username,
            genres: [],
            loading: false,
            responded: false,
            roomId: null,
            error: false,
        };

        this.createRoom = this.createRoom.bind(this);
        this.onCreateClick = this.onCreateClick.bind(this);
        this.getRoom = this.getRoom.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleGenreClick = this.handleGenreClick.bind(this);
    }

    async createRoom() {
        const user = {
            username: this.state.username,
        };
        const options = {
            Genres: this.state.genres,
        };

        let code = await fetch(domain + 'room/genCode');
        code = await code.text();
        this.setState({ roomId: code });

        try {
            await fetch(domain + `room/create/${this.state.roomId}/${user.username}`, {
                method: 'POST',
                body: JSON.stringify(options),
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (err) {
            this.setState({ error: true });
            throw err;
        }

        try {
            let data = await this.getRoom();
            this.props.setRoomData(data);
        } catch (err) {
            this.setState({ error: true });
            throw err;
        }
    }

    async getRoom() {
        let data = await fetch(domain + `room/get/${this.state.roomId}`);
        data = await data.text();
        return JSON.stringify(JSON.parse(data), null, '\t');
    }

    onCreateClick() {
        if (this.state.username === '' || this.state.genres.length < 1) {
            alert('Please enter username and select at least one genre.');
            return;
        }
        this.setState({ error: false, loading: true });
        this.createRoom()
            .then(() => {
                this.props.setUsername(this.state.username);
                this.props.toggleJoined();
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                alert(err);
            });
    }

    handleUserChange(event) {
        this.setState({ username: event.target.value });
    }

    handleGenreClick(event) {
        if (event.target.checked) {
            const genres = this.state.genres;
            genres.push(event.target.parentNode.innerText.toLowerCase());
            this.setState({ genres: genres });
            //console.log(this.state.genres);
        } else {
            const genres = this.state.genres;
            genres.splice(genres.indexOf(event.target.parentNode.innerText.toLowerCase()), 1);
            this.setState({ genres: genres });
            //console.log(this.state.genres);
        }
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        const genres = [
            'acoustic',
            'afrobeat',
            'alt-rock',
            'alternative',
            'ambient',
            'anime',
            'black-metal',
            'bluegrass',
            'blues',
            'bossanova',
            'brazil',
            'breakbeat',
            'british',
            'cantopop',
            'chicago-house',
            'children',
            'chill',
            'classical',
            'club',
            'comedy',
            'country',
            'dance',
            'dancehall',
            'death-metal',
            'deep-house',
            'detroit-techno',
            'disco',
            'disney',
            'drum-and-bass',
            'dub',
            'dubstep',
            'edm',
            'electro',
            'electronic',
            'emo',
            'folk',
            'forro',
            'french',
            'funk',
            'garage',
            'german',
            'gospel',
            'goth',
            'grindcore',
            'groove',
            'grunge',
            'guitar',
            'happy',
            'hard-rock',
            'hardcore',
            'hardstyle',
            'heavy-metal',
            'hip-hop',
            'holidays',
            'honky-tonk',
            'house',
            'idm',
            'indian',
            'indie',
            'indie-pop',
            'industrial',
            'iranian',
            'j-dance',
            'j-idol',
            'j-pop',
            'j-rock',
            'jazz',
            'k-pop',
            'kids',
            'latin',
            'latino',
            'malay',
            'mandopop',
            'metal',
            'metal-misc',
            'metalcore',
            'minimal-techno',
            'movies',
            'mpb',
            'new-age',
            'new-release',
            'opera',
            'pagode',
            'party',
            'philippines-opm',
            'piano',
            'pop',
            'pop-film',
            'post-dubstep',
            'power-pop',
            'progressive-house',
            'psych-rock',
            'punk',
            'punk-rock',
            'r-n-b',
            'rainy-day',
            'reggae',
            'reggaeton',
            'road-trip',
            'rock',
            'rock-n-roll',
            'rockabilly',
            'romance',
            'sad',
            'salsa',
            'samba',
            'sertanejo',
            'show-tunes',
            'singer-songwriter',
            'ska',
            'sleep',
            'songwriter',
            'soul',
            'soundtracks',
            'spanish',
            'study',
            'summer',
            'swedish',
            'synth-pop',
            'tango',
            'techno',
            'trance',
            'trip-hop',
            'turkish',
            'work-out',
            'world-music',
        ];
        return (
            <div className='col-sm-4 offset-sm-4'>
                <div className='d-flex flex-column text-left'>
                    <h1 className='mb-5'>Create a Room</h1>
                    <Form>
                        <Form.Label className='col-form-label-sm'>Spotify User</Form.Label>
                        <Form.Control as='input' disabled={false} placeholder='Username' onChange={this.handleUserChange} />
                        <Form.Label className='col-form-label-sm'>Genres</Form.Label>
                        {genres.map((genre) => (
                            <Form.Check label={genre} key={genre} onClick={this.handleGenreClick}></Form.Check>
                        ))}
                    </Form>
                    <br></br>
                    <Button className='m-1 purple-btn' onClick={this.onCreateClick}>
                        Create
                    </Button>
                    {this.state.error ? <p className='hint'>Room creation failed.</p> : null}
                    <Button className='m-1 purple-btn' onClick={this.props.onBackClick}>
                        Back
                    </Button>
                </div>
            </div>
        );
    }
}

export default RoomCreate;
