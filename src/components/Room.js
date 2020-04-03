import React, { Component } from 'react';
import '../App.css';
import '../styles/Room.css';
import { Col, Row, Container, Button } from 'react-bootstrap';
import WebPlayer from './WebPlayer';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';

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
            startPlayer: false
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
        this.startedPlayer = this.startedPlayer.bind(this);
        this.startPlayer = this.startPlayer.bind(this);
    }

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
                <>
                    {/* <Col className="text-left lg">
            <h1>
              Room
              <span style={{ color: "#6C2EB9" }}> #</span>
              <span className="bold">4434</span>
            </h1>
            <hr className="hr-line"></hr>
            <div className="row">
                <h3 className="bold">Users</h3>
                <p className="hint">
                  List of users currently in the room
                      </p>
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td className="table-column">Cbeeb121</td>
                      <td className="table-column">(This can be a different data point)</td>
                    </tr>
                    <tr>
                      <td className="table-column">Awallace</td>
                      <td className="table-column">12 followers</td>
                    </tr>
                    <tr>
                      <td className="table-column">zBath</td>
                      <td className="table-column">35 followers</td>
                    </tr>
                    <tr>
                      <td className="table-column">Mleong25</td>
                      <td className="table-column">25 followers</td>
                    </tr>
                    <tr>
                      <td className="table-column">AWittywitt</td>
                      <td className="table-column">46 followers</td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div className="row">
                <h3 className="bold">Preferences</h3>
                <p className="hint">
                  select preferences you'd like the playlist generator to prioritize
                </p>
                <Accordion className="accordion" defaultActiveKey="0">
                  <Card className="card">
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Setting
                              </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body className="cardBody">
                        <p className="hint">
                          Pick from the setting selection below:
                                  </p>
                        <div className="selectionContainer">
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Hangout</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Party</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Dinner</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Ambient</Card.Title>
                            </Card.Body>
                          </Card>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Genre
                              </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body className="cardBody">
                        <p className="hint">
                          Pick from the genre selection below:
                                  </p>
                        <div className="selectionContainer">
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Pop</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Rock</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Hip-Hop</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Jazz</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Classical</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Workout</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Study</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Country</Card.Title>
                            </Card.Body>
                          </Card>
                          <Card className="selection">
                            <Card.Body>
                              <Card.Title>Gaming</Card.Title>
                            </Card.Body>
                          </Card>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
            </div>
            <div className="row">
                <button type="button" className="btn App-link">
                  Generate
                </button>
            </div>
          </Col> */}
                </>
                {!this.state.connected ? (
                    <p>Loading...</p>
                ) : (
                    <Row>
                        <Col lg={10}>
                            <div className='text-left'>
                                <Button className='purple-btn m-2' onClick={this.leaveRoom}>
                                    Leave Room
                                </Button>
                                <Button className='purple-btn' onClick={() => {}}>
                                    Save Playlist
                                </Button>
                                <Link to='/Playlists'>
                                    <Button renderAs='button' className='purple-btn'>
                                        Load Playlist
                                    </Button>
                                </Link>
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
                                    {Object.values(this.state.data.Users).map(user => (
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
