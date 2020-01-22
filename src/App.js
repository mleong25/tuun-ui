import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Menu from './components/Menu';
import { Call } from './components/ApiCall';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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
          <Route path="/apiCall" component={Call} />
          <Link to="/apiCall">Test Connection to API</Link>
        </Router>
      </div>
    </div>
  );
}

export default App
