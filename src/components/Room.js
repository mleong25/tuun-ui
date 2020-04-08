import React, { Component } from 'react';
import '../App.css';
import '../styles/Room.css';
import { Col, Row, Container, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { WebPlayer } from './WebPlayer';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';
import { domain } from '../Environment';
import Playlists from './Playlists';
const fetch = require('node-fetch');

class Room extends Component {
    constructor(props) {
        super();
        //console.log(props.data);
        this.state = {
            data: JSON.parse(props.data),
            user: props.user,
            connection: undefined,
            connected: false,
            generating: false,
            startPlayer: false,
            saving: false,
            loading: false,
            saveName: '',
        };

        this.hostGuard = this.hostGuard.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);
        this.upsertData = this.upsertData.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
        this.promote = this.promote.bind(this);
        this.getKicked = this.getKicked.bind(this);
        this.kick = this.kick.bind(this);
        this.generatePlaylist = this.generatePlaylist.bind(this);
        this.loadPlayist = this.loadPlayist.bind(this);
        this.startedPlayer = this.startedPlayer.bind(this);
        this.startPlayer = this.startPlayer.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.showSaveDialog = this.showSaveDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLoadClose = this.handleLoadClose.bind(this);
        this.handleSaveNameChange = this.handleSaveNameChange.bind(this);
    }

    handleSaveNameChange(e) {
        this.setState({ saveName: e.target.value });
    }

    handleClose() {
        this.setState({ saving: false, saveName: '' });
    }

    handleLoadClose() {
        this.setState({ loading: false });
    }

    showSaveDialog() {}

    startedPlayer() {
        this.setState({ startPlayer: false });
    }

    startPlayer() {
        this.setState({ startPlayer: true });
    }

    async promote(roomId, username) {
        await this.state.connection.invoke('Promote', roomId, username);
    }

    async leaveRoom() {
        await this.state.connection.invoke('LeaveRoom', parseInt(this.state.data.Id), this.state.user);
        this.props.leaveRoom();
    }

    hostGuard(func, ...params) {
        if (this.state.user.toLowerCase() === this.state.data.Host.toLowerCase()) {
            func(...params);
        } else {
            alert(`Only the host (${this.data.Host}) can perform this action.`);
        }
    }

    async kick(roomId, username) {
        await this.state.connection.invoke('Kick', roomId, username);
    }

    getKicked() {
        alert('You have been kicked from the room.');
        this.props.leaveRoom();
    }

    upsertData(data) {
        console.log(data);
        this.setState({ data: JSON.parse(data) });
        this.setState({ connected: true });
    }

    async generatePlaylist() {
        this.setState({ generating: true });
        await this.state.connection.invoke('Generate', parseInt(this.state.data.Id));
        this.setState({ generating: false });
    }

    async loadPlayist(songs) {
        await this.state.connection.invoke('LoadPlaylist', this.state.data.Id, songs);
    }

    async savePlaylist() {
        if (this.state.saveName === '') {
            alert("'Playlist Name' cannot be empty.");
            return;
        }
        await fetch(domain + 'db/playlists/' + this.state.user + '/save/' + this.state.saveName, {
            method: 'POST',
            body: JSON.stringify(this.state.data.Playlist),
            headers: { 'Content-Type': 'application/json' },
        });
        this.setState({ saving: false, saveName: '' });
    }

    componentDidMount() {
        this.setState({ connection: this.props.connection }, async () => {
            // define websocket reactions on frontend
            this.state.connection.on('SetState', this.upsertData);
            this.state.connection.on('GetKicked', this.getKicked);
            this.state.connection.on('StartPlayer', this.startPlayer);

            // start websocket connection
            await this.state.connection.start();
            console.log('connected');
            this.state.connection.invoke('AddUser', parseInt(this.state.data.Id), this.state.user, this.props.token);
        });
    }

    async componentWillUnmount() {
        await this.state.connection.stop();
    }

    render() {
        console.log(this.state.data);
        //console.log(this.props.token);
        // // Toggle chevrons for accordian
        // // function toggleChevron(e) {
        //   $(e.target)
        //   .prev('.panel-heading')
        //   .find("i.indicator")
        //   .toggleClass('glyphicon-chevron-down-custom glyphicon-chevron-up-custom');
        // }
        // $('#accordion').on('hidden.bs.collapse', toggleChevron);
        // $('#accordion').on('shown.bs.collapse', toggleChevron);
        return (
            <Container fluid>
                <Modal show={this.state.saving} onHide={this.handleClose}>
                    <Modal.Header className='save-modal' style={{ borderBottom: '2px solid #343a40' }} closeButton>
                        <Modal.Title style={{ color: 'white' }}>Save Playlist</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='save-modal'>
                        <Form>
                            <Form.Label style={{ color: 'white' }} className='col-form-label-sm'>
                                Playlist Name
                            </Form.Label>
                            <Form.Control style={{ color: 'white' }} as='input' placeholder='Name' value={this.state.saveName} onChange={this.handleSaveNameChange} />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{ borderTop: '2px solid #343a40' }} className='save-modal'>
                        <Button variant='secondary purple-btn' onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant='primary purple-btn' onClick={this.savePlaylist}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal size='lg' show={this.state.loading} onHide={this.handleLoadClose}>
                    <Modal.Header className='save-modal' style={{ borderBottom: '2px solid #343a40' }} closeButton>
                        <Modal.Title style={{ color: 'white' }}>Choose a playlist to load</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='save-modal'>
                        <Playlists handleClose={this.handleLoadClose} roomId={this.state.data.Id} loadPlaylist={this.loadPlayist} />
                    </Modal.Body>
                </Modal>
                {!this.state.connected ? (
                    <p>Loading...</p>
                ) : (
                    <Row>
                        <Col lg={10}>
                            <div className='text-left'>
                                <Button className='purple-btn m-2' onClick={this.leaveRoom}>
                                    Leave Room
                                </Button>
                                {this.state.data.Playlist.shared.length + this.state.data.Playlist.rest.length > 0 ? (
                                    <Button
                                        className='purple-btn m-2'
                                        onClick={() => {
                                            this.setState({ saving: true });
                                        }}>
                                        Save Playlist
                                    </Button>
                                ) : null}
                                {this.state.user === this.state.data.Host ? (
                                    // <Link to='/Playlists'>
                                    //     <Button renderAs='button' className='purple-btn'>
                                    //         Load Playlist
                                    //     </Button>
                                    // </Link>
                                    <Button
                                        className='purple-btn m-2'
                                        onClick={() => {
                                            this.setState({ loading: true });
                                        }}>
                                        Load Playlist
                                    </Button>
                                ) : null}
                                {this.state.user === this.state.data.Host && !this.state.generating ? (
                                    <Button className='purple-btn m-2' onClick={this.generatePlaylist}>
                                        Generate Playlist
                                    </Button>
                                ) : null}
                                {this.state.user === this.state.data.Host && this.state.generating ? (
                                    <Button className='purple-btn m-2' disabled>
                                        Generating...
                                    </Button>
                                ) : null}
                                <h1>
                                    Room
                                    <span style={{ color: '#6C2EB9' }}> #</span>
                                    <span className='bold'>{this.state.data.Id}</span>
                                </h1>
                            </div>
                            <WebPlayer StartNewPlayer={this.state.startPlayer} startedPlayer={this.startedPlayer} songIDs={this.state.data.Playlist} token={this.props.token}></WebPlayer>
                        </Col>
                        <Col>
                            <h3 className='bold'>Users</h3>
                            <p className='hint'>List of users currently in the room</p>
                            <table className='table table-clear'>
                                <tbody>
                                    {Object.values(this.state.data.Users).map((user) => (
                                        <tr key={user.Username}>
                                            <td key={user.Username} className='table-column d-flex'>
                                                {this.state.data.Host === this.state.user && user.Username !== this.state.data.Host ? (
                                                    <>
                                                        {user.Username === this.state.user ? (
                                                            <a key={user.Username} className='w-100 d-block font-weight-bold users-item' style={{ color: 'white' }} href={`https://open.spotify.com/user/${user.Username}`} rel='noopener noreferrer' target='_blank'>
                                                                {user.Username === this.state.data.Host ? (
                                                                    <>
                                                                        {user.Username} <span className='font-italic'> - Host</span>
                                                                    </>
                                                                ) : (
                                                                    user.Username
                                                                )}
                                                            </a>
                                                        ) : (
                                                            <a key={user.Username} className='w-100 d-block font-weight-bold users-item' style={{ color: '#6C2EB9' }} href={`https://open.spotify.com/user/${user.Username}`} rel='noopener noreferrer' target='_blank'>
                                                                {user.Username === this.state.data.Host ? (
                                                                    <>
                                                                        {user.Username} <span className='font-italic'> - Host</span>
                                                                    </>
                                                                ) : (
                                                                    user.Username
                                                                )}
                                                            </a>
                                                        )}
                                                        <Button className='purple-btn btn-sm float-right m-1' onClick={() => this.promote(this.state.data.Id, user.Username)}>
                                                            Promote
                                                        </Button>
                                                        <Button className='purple-btn btn-sm float-right m-1' onClick={() => this.kick(this.state.data.Id, user.Username)}>
                                                            Kick
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {user.Username === this.state.user ? (
                                                            <a key={user.Username} className='w-100 d-block font-weight-bold' style={{ color: 'white' }} href={`https://open.spotify.com/user/${user.Username}`} rel='noopener noreferrer' target='_blank'>
                                                                {user.Username === this.state.data.Host ? (
                                                                    <>
                                                                        {user.Username} <span className='font-italic'> - Host</span>
                                                                    </>
                                                                ) : (
                                                                    user.Username
                                                                )}
                                                            </a>
                                                        ) : (
                                                            <a key={user.Username} className='w-100 d-block font-weight-bold' style={{ color: '#6C2EB9' }} href={`https://open.spotify.com/user/${user.Username}`} rel='noopener noreferrer' target='_blank'>
                                                                {user.Username === this.state.data.Host ? (
                                                                    <>
                                                                        {user.Username} <span className='font-italic'> - Host</span>
                                                                    </>
                                                                ) : (
                                                                    user.Username
                                                                )}
                                                            </a>
                                                        )}
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                )}
            </Container>
        );
    }
}

export default Room;
