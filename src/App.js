import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WebPlayer from './components/WebPlayer';
import Playlists from './components/Playlists';
import Landing from './components/Landing';
import Button from 'react-bootstrap/Button';
import Auth from './components/Auth';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { domain } from './Environment';
import * as signalR from '@microsoft/signalr';

const fakeAuthCentralState = {
    isAuthenticated: false,
    authenticate(callback) {
        this.isAuthenticated = true;
        setTimeout(callback, 300);
    },
    signout(callback) {
        this.isAuthenticated = false;
        setTimeout(callback, 300);
    },
};

const Public = () => <h3>You have clicked on a public content button that has displayed this content.</h3>;
const Protected = () => <h3>This is the protected contact that was locked behind a component.</h3>;

//this is a special component that is only able to load if you are logged in...
//as in "fakeAuthCentralState.isAuthenticated == true" .. once that happens it runs a turnary operator .. and if good will redirect to the /login
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
      {...rest}
      render={props =>
          fakeAuthCentralState.isAuthenticated === true ? (
              <Component {...props} />
          ) : (
              <Redirect
                  to={{
                      pathname: '/login',
                      state: { from: props.location }
                  }}
              />
          )
      }
  />
);

const AuthButton = withRouter(({ history }) =>
    fakeAuthCentralState.isAuthenticated ? (
        <p>
            Welcome to this amazing content!
            <button
                className='App-link btn btn-primary'
                onClick={() => {
                    fakeAuthCentralState.signout(() => history.push('/'));
                }}>
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
);

class IsAccessible extends Component {
    constructor(props) {
        super();

        const newConnection = new signalR.HubConnectionBuilder().withUrl(domain + 'roomsHub').build();

        this.state = {
            connection: newConnection,
        };
    }

    render() {
        const token = window.localStorage.getItem('token');
        if (token) {
            return (
                <div className='App'>
                    <div className='App-foreground'>
                        <link href='https://fonts.googleapis.com/css?family=Poppins|Raleway|Montserrat&display=swap' rel='stylesheet'></link>
                        <Router>
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
                                                    Web Player
                                                </Link>
                                            </Nav.Item>
                                        </Nav> */}</Navbar.Collapse>
                                </Navbar>
                            </div>
                            <Switch>
                                <Route exact path='/' render={() => <Landing connection={this.state.connection} showTitle={this.props.showTitle} toggleTitle={this.props.toggleTitle} toggleJoined={this.props.toggleJoined} joined={this.props.joined} roomData={this.props.roomData} setRoomData={this.props.setRoomData} setUsername={this.props.setUsername} username={this.props.username} leaveRoom={this.props.leaveRoom} token={token} />} />
                                <Route path='/playlists' component={() => <Playlists />} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            );
        } else {
            return (
                <>
                    <Auth />
                </>
            );
        }
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false,
        };
    }

    login = () => {
        fakeAuthCentralState.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true,
            }));
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            this.props.history.push(from.pathname);
        }

        function Login() {
            const [show, setShow] = React.useState(false);

            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);

            return (
                <>
                    <div className='container'>
                        <Button variant='primary' className='App-link btn-lg' onClick={window.location.replace('http://www.w3schools.com')}>
                            Connect
                        </Button>
                    </div>

                    {/* <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please login to Spotify to view content</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Login
              </Button>
            </Modal.Footer>
          </Modal> */}
                </>
            );
        }

        return <Login />;
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
