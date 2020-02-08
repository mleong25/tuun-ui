import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';
import Menu from './components/Menu';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Create from './components/Create';
import Playlists from './components/Playlists';
import Connect from './components/Connect';
import Landing from './components/Landing';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Auth from './components/Auth';


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

function isAccessible() {
  const token = window.localStorage.getItem('token');

  if(token){
    return (
      <div className="App">
          <div className="App-foreground">
            <Menu/>
            <Router>
              <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/create" component={Create}/>
                <Route path="/playlists" component={Playlists}/>
                <Route path="/connect" component={Connect}/>
              </Switch>
            </Router>
  
            {/* <Router>
              <div>
                <AuthButton/>
              </div>
              <Link to="/public">Public Content</Link>
              <Link to="/protected">Protected Content</Link>
              <Route path="/public" component={Public}/>
              <Route path="/login" component={withRouter(Login)}/>
              <ProtectedRoute path='/protected' component={Protected} />
            </Router> */}
          </div>
        </div>
    )
  }
  else {
    return(
      <>
        <Auth/>
      </>
    )}
}

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
          <div className="container">
            <Button variant="primary" className="App-link" onClick={window.location.replace("http://www.w3schools.com")}>
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

    return (
      <Login/>
    )
  }
}


class App extends Component {
  render() {
    
    return(
      <>
        {isAccessible()}
      </>
    );
  }
}

export default App
