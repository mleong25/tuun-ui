import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Menu from './components/Menu';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const fakeAuthCentralState = {
  isAuthenticated: false,
  authenticate(callback) {
    this.isAuthenticated = true;
    setTimeout(callback, 300);
  },
  signout(callback) {
    this.isAuthenticated = false;
    setTimeout(callback, 300);
  }
};

const Public = () => <h3>You have clicked on a public content button that has displayed this content.</h3>;
const Protected = () => <h3>This is the protected contact that was locked behind a component.</h3>;

//this is a special component that is only able to load if you are logged in... 
//as in "fakeAuthCentralState.isAuthenticated == true" .. once that happens it runs a turnary operator .. and if good will redirect to the /login
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuthCentralState.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

const AuthButton = withRouter(({ history }) => (
  fakeAuthCentralState.isAuthenticated ? (
    <p>
      Welcome to this amazing content!
      <button 
      className="App-link btn btn-primary"
      onClick={() => {
        fakeAuthCentralState.signout(() => history.push('/'))
      }}>
      Sign out
      </button>
    </p>
    ) : (
    <p>You are not logged in.</p>
  )
));

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    };
  }
  
  login = () => {
    fakeAuthCentralState.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  }

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
        <Button variant="primary" onClick={handleShow}>
          Connect
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
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
        </Modal>
      </>
    );
  }

    return (
      <Login/>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-foreground">
          <Menu/>
          <span className="Title">
            <h1 className="App-header">
              T<span style={{ color: "#6C2EB9" }}>u</span>un
            </h1>
            <p>A better way to connect with music</p>
          </span>
          <div className="container">
            <a
              className="App-link btn btn-primary"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect
            </a>
          </div>
          <Router>
            <div>
              <AuthButton/>
            </div>
            <Link to="/public">Public Content</Link>
            <Link to="/protected">Protected Content</Link>
            <Route path="/public" component={Public}/>
            <Route path="/login" component={withRouter(Login)}/>
            <ProtectedRoute path='/protected' component={Protected} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App
