import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Landing from './components/Landing';
import Auth from './components/Auth';
import { Navbar } from 'react-bootstrap';
import { domain } from './Environment';
import * as signalR from '@microsoft/signalr';

class IsAccessible extends Component {
    constructor(props) {
        super();

        const newConnection = new signalR.HubConnectionBuilder().withUrl(domain + 'roomsHub').build();

        this.state = {
            connection: newConnection,
            token: '',
        };
        this.gotToken = this.gotToken.bind(this);
    }

    gotToken(token) {
        this.setState({ token: token });
    }

    render() {
        if (this.state.token) {
            return (
                <div className='App'>
                    <div className='App-foreground'>
                        <link href='https://fonts.googleapis.com/css?family=Poppins|Raleway|Montserrat&display=swap' rel='stylesheet'></link>
                        <div className='Menu'>
                            <Navbar fixed='top' bg='dark' expand='lg'>
                                <Navbar.Brand className='brand' href='/'>
                                    <img
                                        src='ToffWhite.jpg' //can't figure out how to access the image from public/favicon.ico... in same dir for right now.
                                        width='60'
                                        height='60'
                                        alt='tuun logo'
                                    />
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                                <Navbar.Collapse id='basic-navbar-nav'>{/* <Nav className='mr-auto'>
                                            <Link to='/' className='NavTab'>
                                                Home
                                            </Link>
                                            <Link to='/playlists' className='NavTab'>
                                                Playlists
                                            </Link>
                                            <NavDropdown.Divider />
                                            <Nav.Item>
                                                <Link className='NavTab' to='/webPlayer'>
                                                    WebPlayer
                                                </Link>
                                            </Nav.Item>
                                        </Nav> */}</Navbar.Collapse>
                            </Navbar>
                        </div>
                        <Landing connection={this.state.connection} showTitle={this.props.showTitle} toggleTitle={this.props.toggleTitle} toggleJoined={this.props.toggleJoined} joined={this.props.joined} roomData={this.props.roomData} setRoomData={this.props.setRoomData} setUsername={this.props.setUsername} username={this.props.username} leaveRoom={this.props.leaveRoom} token={this.state.token} />
                    </div>
                </div>
            );
        } else {
            return (
                <>
                    <Auth callBack={this.gotToken} />
                    {/* <WebPlayer /> */}
                </>
            );
        }
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            joined: false,
            roomData: null,
            showTitle: true,
            username: null,
        };

        this.toggleJoined = this.toggleJoined.bind(this);
        this.toggleTitle = this.toggleTitle.bind(this);
        this.setRoomData = this.setRoomData.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
    }

    toggleTitle() {
        this.setState({ showTitle: !this.state.showTitle });
    }

    leaveRoom() {
        this.setState({ joined: false, showTitle: true });
    }

    toggleJoined() {
        this.setState({ joined: !this.state.joined });
    }

    setRoomData(jsonStr) {
        this.setState({ roomData: jsonStr });
    }

    setUsername(username) {
        this.setState({ username: username });
    }

    render() {
        return <>{<IsAccessible roomData={this.state.roomData} setRoomData={this.setRoomData} showTitle={this.state.showTitle} toggleTitle={this.toggleTitle} toggleJoined={this.toggleJoined} joined={this.state.joined} setUsername={this.setUsername} username={this.state.username} leaveRoom={this.leaveRoom} />}</>;
    }
}

export default App;
